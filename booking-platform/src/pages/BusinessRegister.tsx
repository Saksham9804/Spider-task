import { useForm } from 'react-hook-form'

type FormValues = {
  businessType: 'restaurant' | 'salon' | 'hospital' | 'bank'
  name: string
  address: string
  contact: string
  openingHours: string
  services: string
}

export default function BusinessRegister() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { businessType: 'restaurant' }
  })

  const onSubmit = (values: FormValues) => {
    alert('Registered!\n' + JSON.stringify(values, null, 2))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-semibold">Register Your Business</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm font-medium">Business Type</label>
          <select className="mt-1 w-full rounded-md border border-slate-300 p-2" {...register('businessType', { required: true })}>
            <option value="restaurant">Restaurant</option>
            <option value="salon">Salon</option>
            <option value="hospital">Hospital</option>
            <option value="bank">Bank</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Business Name</label>
          <input className="mt-1 w-full rounded-md border border-slate-300 p-2" {...register('name', { required: true })} />
          {errors.name && <p className="text-sm text-red-600 mt-1">Name is required</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input className="mt-1 w-full rounded-md border border-slate-300 p-2" {...register('address', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact Details</label>
            <input className="mt-1 w-full rounded-md border border-slate-300 p-2" {...register('contact', { required: true })} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Opening Hours</label>
          <input placeholder="e.g. Mon-Fri 9:00-18:00" className="mt-1 w-full rounded-md border border-slate-300 p-2" {...register('openingHours', { required: true })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Services Offered</label>
          <textarea placeholder="Comma separated, e.g. Haircut, Facial" className="mt-1 w-full rounded-md border border-slate-300 p-2" rows={4} {...register('services', { required: true })} />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">Optional verification step after submission.</div>
          <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">Submit</button>
        </div>
      </form>
    </div>
  )
}