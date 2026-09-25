import { useEffect, useRef, useState } from 'react'
import { Leaf } from 'lucide-react'
import { storeCategories, storeFeatures, storeGallery, storeHours, storeLicenses, storePayments, storeProfile, storeServices, storeStrengths } from '../data/store.mock'
import { BusinessHours, Certifications, DeliveryCoverage, PaymentOptions, ServiceCategories, StoreOverview, SupportedCategories } from '../components/StoreMainPanels'
import { StoreKeyFeatures, StoreQuickActions, StoreStrengths } from '../components/StoreSidePanels'
import StoreGallery from '../components/StoreGallery'
import StoreActionDialog from '../components/StoreActionDialog'

function MyStoreHero({ bannerSrc }) {
  return <section className="relative isolate flex min-h-[150px] items-center overflow-hidden rounded-2xl bg-[url('/images/dashboard/farmer-hero.png')] bg-[length:160%_auto] bg-[position:left_72%] px-5 py-7 sm:min-h-[165px] sm:px-8" style={bannerSrc ? { backgroundImage: `url('${bannerSrc}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}><div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-white/20" /><div className="relative z-10"><h1 className="text-[34px] font-extrabold leading-tight tracking-tight text-[#131c2d] sm:text-[40px]">My Store</h1><p className="mt-1 max-w-[650px] text-[14px] leading-relaxed text-[#526587] sm:text-[16px]">Manage your store profile, contact details, services, and operating hours.</p></div><p aria-hidden="true" className="absolute right-[24%] top-7 hidden -rotate-6 font-serif text-[19px] font-semibold italic leading-tight text-[#152039] 2xl:block">Bharat<br />Ka Kisan<br />Bharat Ki Shaan <Leaf size={34} className="inline fill-emerald-500 text-emerald-700" /></p><p aria-hidden="true" className="absolute right-5 top-7 hidden text-[14px] font-bold leading-tight text-[#133d2b] 2xl:block">Better<br />Farms<br />Brighter<br />Futures</p></section>
}

export default function ShopkeeperMyStore() {
  const [store, setStore] = useState(storeProfile)
  const [hours, setHours] = useState(storeHours)
  const [photos, setPhotos] = useState(storeGallery)
  const [bannerSrc, setBannerSrc] = useState(null)
  const [dialog, setDialog] = useState(null)
  const [notice, setNotice] = useState('')
  const createdUrls = useRef([])
  useEffect(() => () => createdUrls.current.forEach(url => URL.revokeObjectURL(url)), [])
  useEffect(() => {
    if (!dialog) return undefined
    const close = event => { if (event.key === 'Escape') setDialog(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [dialog])
  const addPhotos = fileList => {
    const files = [...(fileList ?? [])].filter(file => file.type.startsWith('image/'))
    const additions = files.map(file => { const src = URL.createObjectURL(file); createdUrls.current.push(src); return { id: `gallery-local-${crypto.randomUUID()}`, src, alt: file.name } })
    if (additions.length) { setPhotos(current => [...current, ...additions]); setNotice(`${additions.length} photo${additions.length === 1 ? '' : 's'} added for this preview.`) }
  }
  const save = (mode, value) => {
    if (mode === 'profile') setStore(current => ({ ...current, ...value }))
    if (mode === 'hours') setHours(value)
    if (mode === 'coverage') setStore(current => ({ ...current, deliveryRadiusKm: value }))
    if (mode === 'banner' && value?.size) { const src = URL.createObjectURL(value); createdUrls.current.push(src); setBannerSrc(src) }
    setDialog(null)
    setNotice('Store details updated for this preview.')
  }
  return <div className="min-w-0 bg-[#f2faff] p-4 sm:p-5 lg:p-6"><MyStoreHero bannerSrc={bannerSrc} /><div className="mt-5 grid min-w-0 items-start gap-5 min-[1380px]:grid-cols-[minmax(0,1fr)_minmax(320px,350px)]"><div className="min-w-0 space-y-5"><StoreOverview store={store} onEdit={() => setDialog('profile')} /><div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-5"><BusinessHours hours={hours} onEdit={() => setDialog('hours')} /><ServiceCategories services={storeServices} onEdit={() => setDialog('services')} /><DeliveryCoverage radius={store.deliveryRadiusKm} onEdit={() => setDialog('coverage')} /></div><div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-5"><Certifications licenses={storeLicenses} onEdit={() => setDialog('documents')} /><SupportedCategories categories={storeCategories} onEdit={() => setDialog('categories')} /><PaymentOptions payments={storePayments} onEdit={() => setDialog('payments')} /></div><StoreGallery photos={photos} onAdd={addPhotos} onViewAll={() => setDialog('gallery')} /></div><aside className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-5"><StoreStrengths strengths={storeStrengths} /><StoreQuickActions onAction={setDialog} /><StoreKeyFeatures features={storeFeatures} /></aside></div><StoreActionDialog mode={dialog} store={store} hours={hours} photos={photos} licenses={storeLicenses} onClose={() => setDialog(null)} onSave={save} />{notice && <div role="status" className="fixed bottom-4 right-4 z-[90] rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss message" className="ml-3 text-lg">×</button></div>}</div>
}
