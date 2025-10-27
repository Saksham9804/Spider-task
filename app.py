import os
import glob
import threading
from typing import List, Optional, Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from pypdf import PdfReader
from rank_bm25 import BM25Okapi

PDF_FILES: List[str] = [
    "Attention is all you need.pdf",
    "BERT Pre training of Deep Bidirectional Transformers for.pdf",
    "Contrastive Language-Image Pre-Training with.pdf",
    "Language Models are Few-Shot Learners.pdf",
    "LLaMA Open and Efficient Foundation Language Models.pdf",
]

app = FastAPI(title="PDF RAG QA (BM25)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_index_lock = threading.Lock()
_chunks: List[Dict[str, Any]] = []
_bm25: Optional[BM25Okapi] = None
_index_info: dict = {"num_chunks": 0, "sources": []}


def _discover_pdfs() -> List[str]:
    present = [f for f in PDF_FILES if os.path.isfile(f)]
    if present:
        return present
    return sorted([p for p in glob.glob("*.pdf") if os.path.isfile(p)])


def _split_text(text: str, chunk_size: int = 1000, chunk_overlap: int = 150) -> List[str]:
    if not text:
        return []
    chunks = []
    start = 0
    n = len(text)
    while start < n:
        end = min(n, start + chunk_size)
        chunk = text[start:end]
        chunks.append(chunk)
        if end == n:
            break
        start = max(start + chunk_size - chunk_overlap, end)
    return chunks


def _tokenize(text: str) -> List[str]:
    # simple whitespace/punctuation split
    import re
    return [t for t in re.findall(r"[\w\-]+", text.lower()) if t]


def build_index() -> None:
    global _chunks, _bm25, _index_info
    pdfs = _discover_pdfs()
    if not pdfs:
        _chunks = []
        _bm25 = None
        _index_info = {"num_chunks": 0, "sources": []}
        raise RuntimeError("No PDFs found in working directory.")

    chunks: List[Dict[str, Any]] = []
    sources = []

    for pdf_path in pdfs:
        try:
            reader = PdfReader(pdf_path)
            for page_index, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                for chunk in _split_text(text):
                    chunks.append({
                        "text": chunk,
                        "metadata": {"source": pdf_path, "page": page_index},
                    })
            sources.append(pdf_path)
        except Exception:
            continue

    if not chunks:
        _chunks = []
        _bm25 = None
        _index_info = {"num_chunks": 0, "sources": []}
        raise RuntimeError("Could not extract text from PDFs.")

    tokenized_corpus = [_tokenize(c["text"]) for c in chunks]
    _bm25 = BM25Okapi(tokenized_corpus)
    _chunks = chunks
    _index_info = {"num_chunks": len(chunks), "sources": sources}


def retrieve(query: str, k: int = 5) -> List[Dict[str, Any]]:
    assert _bm25 is not None
    tokens = _tokenize(query)
    scores = _bm25.get_scores(tokens)
    # Get top-k indexes
    import numpy as np
    top_idx = np.argsort(scores)[-k:][::-1]
    results: List[Dict[str, Any]] = []
    for idx in top_idx:
        c = _chunks[int(idx)]
        results.append({
            "text": c["text"],
            "metadata": c["metadata"],
            "score": float(scores[int(idx)]),
        })
    return results


def answer_question(query: str) -> Dict[str, Any]:
    # Simple extractive heuristic: return the best chunk text as the answer
    retrieved = retrieve(query, k=5)
    if not retrieved:
        return {"answer": "No relevant content found.", "sources": []}
    best = max(retrieved, key=lambda r: r["score"]) if len(retrieved) > 0 else retrieved[0]
    sources = []
    for r in retrieved:
        text = r["text"]
        preview = text[:400].replace("\n", " ") + ("..." if len(text) > 400 else "")
        sources.append({"metadata": r["metadata"], "preview": preview})
    return {"answer": best["text"], "sources": sources}


@app.on_event("startup")
def on_startup():
    with _index_lock:
        build_index()


@app.get("/", response_class=HTMLResponse)
async def root_page():
    html = """
    <!doctype html>
    <html>
    <head>
      <meta charset=\"utf-8\" />
      <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />
      <title>PDF RAG QA</title>
      <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 2rem; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { font-size: 1.75rem; margin-bottom: 1rem; }
        textarea { width: 100%; height: 100px; padding: .75rem; font-size: 1rem; }
        button { margin-top: .75rem; padding: .6rem 1rem; font-size: 1rem; }
        .answer { margin-top: 1.5rem; padding: 1rem; background: #f6f8fa; border-radius: 8px; white-space: pre-wrap; }
        .sources { margin-top: 1rem; font-size: .9rem; color: #333; }
        .src { padding: .5rem; background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: .5rem; }
      </style>
    </head>
    <body>
      <div class=\"container\">
        <h1>Ask the PDFs</h1>
        <p>Type a question about your PDFs. The most relevant chunk will be returned as the answer.</p>
        <textarea id=\"q\" placeholder=\"Type your question...\"></textarea>
        <br/>
        <button id=\"askBtn\">Ask</button>
        <div id=\"status\"></div>
        <div id=\"answer\" class=\"answer\"></div>
        <div id=\"sources\" class=\"sources\"></div>
      </div>
      <script>
        const askBtn = document.getElementById('askBtn');
        const q = document.getElementById('q');
        const answer = document.getElementById('answer');
        const sources = document.getElementById('sources');
        const status = document.getElementById('status');

        async function ask() {
          const query = q.value.trim();
          if (!query) return;
          answer.textContent = '';
          sources.innerHTML = '';
          status.textContent = 'Searching...';
          askBtn.disabled = true;
          try {
            const res = await fetch('/ask', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question: query })
            });
            const text = await res.text();
            if (!res.ok) throw new Error(text || 'Request failed');
            const data = JSON.parse(text);
            answer.textContent = data.answer;
            status.textContent = '';
            if (data.sources && data.sources.length) {
              for (const s of data.sources) {
                const div = document.createElement('div');
                div.className = 'src';
                div.textContent = `${s.metadata.source || 'source'} - page ${s.metadata.page != null ? s.metadata.page + 1 : 'n/a'}\n` + s.preview;
                sources.appendChild(div);
              }
            }
          } catch (e) {
            status.textContent = '';
            answer.textContent = e.message || String(e);
          } finally {
            askBtn.disabled = false;
          }
        }
        askBtn.addEventListener('click', ask);
        q.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) ask(); });
      </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html)


@app.get("/status")
async def status():
    ready = _bm25 is not None and len(_chunks) > 0
    return {"ready": ready, **_index_info}


@app.post("/ask")
async def ask(question: dict):
    if not isinstance(question, dict) or "question" not in question:
        raise HTTPException(status_code=400, detail="Missing 'question' in body")
    q = (question.get("question") or "").strip()
    if not q:
        raise HTTPException(status_code=400, detail="Empty question")
    if _bm25 is None:
        raise HTTPException(status_code=503, detail="Index not ready")

    try:
        result = answer_question(q)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=False)