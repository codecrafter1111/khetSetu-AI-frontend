import { X } from 'lucide-react'

const titles = {
  profile: 'Edit Store Profile', hours: 'Manage Business Hours', services: 'Service Categories',
  coverage: 'Delivery Coverage', documents: 'Certifications & Licenses', categories: 'Supported Product Categories',
  payments: 'Payment Options', banner: 'Add Store Banner', gallery: 'Store Gallery',
}

const inputClass = 'mt-1 w-full rounded-lg border border-[#d8e5ed] bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600'

export default function StoreActionDialog({ mode, store, hours, photos, licenses, onClose, onSave }) {
  if (!mode) return null
  const save = event => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (mode === 'profile') onSave(mode, Object.fromEntries(form))
    else if (mode === 'hours') onSave(mode, hours.map(item => ({ day: item.day, hours: String(form.get(item.day) ?? item.hours) })))
    else if (mode === 'coverage') onSave(mode, Math.max(1, Number(form.get('radius')) || store.deliveryRadiusKm))
    else if (mode === 'banner') onSave(mode, form.get('banner'))
    else onClose()
  }
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-[#0b1730]/50 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><div role="dialog" aria-modal="true" aria-labelledby="store-dialog-title" className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-2xl"><div className="flex items-center justify-between gap-3"><h2 id="store-dialog-title" className="text-lg font-bold text-[#172342]">{titles[mode]}</h2><button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-md p-1 hover:bg-slate-100"><X size={20} /></button></div><p className="mt-1 text-xs text-slate-500">Changes in this preview stay on this page.</p>
    {mode === 'gallery' ? <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{photos.map(photo => <div key={photo.id} role="img" aria-label={photo.alt} className="aspect-square rounded-lg bg-slate-100 bg-no-repeat" style={{ backgroundImage: `url('${photo.src}')`, backgroundSize: photo.size ?? 'cover', backgroundPosition: photo.position ?? 'center' }} />)}</div> : <form onSubmit={save} className="mt-4 space-y-3">{mode === 'profile' && <>{[['name', 'Store name', store.name], ['owner', 'Owner name', store.owner], ['address', 'Address', store.address], ['phone', 'Phone', store.phone], ['tagline', 'Store tagline', store.tagline]].map(([key, label, value]) => <label key={key} className="block text-xs font-semibold text-[#374562]">{label}<input name={key} required defaultValue={value} className={inputClass} /></label>)}</>}{mode === 'hours' && <div className="grid gap-2 sm:grid-cols-2">{hours.map(item => <label key={item.day} className="block text-xs font-semibold text-[#374562]">{item.day}<input name={item.day} required defaultValue={item.hours} className={inputClass} /></label>)}</div>}{mode === 'coverage' && <label className="block text-xs font-semibold text-[#374562]">Delivery radius (km)<input type="number" min="1" max="100" name="radius" required defaultValue={store.deliveryRadiusKm} className={inputClass} /></label>}{mode === 'banner' && <label className="block text-xs font-semibold text-[#374562]">Banner image<input type="file" name="banner" accept="image/*" required className={inputClass} /></label>}{mode === 'documents' && <div className="rounded-lg bg-[#f2fbf5] p-3 text-sm">{licenses.map(item => <p key={item.title} className="flex justify-between border-b border-emerald-100 py-2 last:border-0"><span>{item.title}</span><span className="font-medium text-emerald-700">Verified</span></p>)}</div>}{['services', 'categories', 'payments'].includes(mode) && <p className="rounded-lg bg-[#f2fbf5] p-4 text-sm text-[#465b73]">These store settings are shown on your profile. Their editing controls will be connected with store management.</p>}<div className="flex justify-end gap-2 pt-1"><button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-[#31415e]">Cancel</button><button type="submit" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">{['profile', 'hours', 'coverage', 'banner'].includes(mode) ? 'Save changes' : 'Done'}</button></div></form>}
  </div></div>
}
