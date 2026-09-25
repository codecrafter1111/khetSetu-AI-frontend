import { BadgeCheck, Banknote, Check, ClipboardCheck, Clock3, CreditCard, Droplets, FileText, Leaf, MapPin, Package, Phone, Settings, ShieldCheck, Sprout, Store, Tractor, Truck, UsersRound, Wrench } from 'lucide-react'
import { KanpurMap } from './DashboardInsights'
import StoreCardHeading from './StoreCardHeading'

const card = 'min-w-0 rounded-2xl border border-[#dce8ee] bg-white p-5 shadow-[0_2px_10px_rgba(28,72,70,0.03)]'
const serviceIcons = { store: Store, advice: UsersRound, delivery: Truck, bulk: Package, custom: Wrench }
const categoryIcons = { seeds: Sprout, fertilizers: Package, pesticides: ClipboardCheck, organic: Leaf, tools: Wrench, irrigation: Droplets, feed: Tractor, soil: Sprout }
const categoryColors = { seeds: 'text-emerald-700', fertilizers: 'text-green-700', pesticides: 'text-emerald-700', organic: 'text-green-600', tools: 'text-sky-700', irrigation: 'text-sky-500', feed: 'text-amber-700', soil: 'text-emerald-800' }
const paymentIcons = { cash: Banknote, upi: CreditCard, card: CreditCard, bank: Store }

export function StoreOverview({ store, onEdit }) {
  return <section className={card}><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><StoreCardHeading icon={Store} title="Store Overview" /><button type="button" onClick={onEdit} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-[#dce5ef] px-4 text-[12px] font-medium text-[#1a2946] hover:bg-emerald-50">✎ Edit Store Profile</button></div><div className="grid gap-5 sm:grid-cols-[minmax(220px,290px)_minmax(0,1fr)]"><div className="relative h-[245px] overflow-hidden rounded-xl"><img src={store.photo} alt={`Storefront of ${store.name}`} className="size-full object-cover object-[center_44%]" /><div className="absolute inset-x-[9%] top-[15%] rounded bg-[#0a6356]/90 px-1 py-1 text-center text-white shadow"><strong className="block truncate text-[15px]">{store.name}</strong><span className="block truncate text-[8px]">Seeds | Fertilizers | Pesticides | Farm Advisory</span></div></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-[24px] font-bold leading-tight text-[#15213a]">{store.name}</h3>{store.verified && <span className="inline-flex items-center gap-1 rounded-full bg-[#e3f8e9] px-2 py-1 text-[11px] font-medium text-[#186e40]"><BadgeCheck size={14} fill="currentColor" />Verified Store</span>}</div><p className="text-[14px] text-[#5e6d89]">Owned by {store.owner}</p><p className="mt-3 flex items-center gap-2 text-[15px] text-[#17223d]"><span className="text-[19px] text-amber-500">★</span><strong>{store.rating}</strong><span className="text-[#5f708e]">({store.reviews} reviews)</span></p><div className="mt-4 space-y-2 text-[14px] text-[#435474]"><p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-[#1a355c]" />{store.address}</p><p className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-[#1a355c]" />{store.phone}</p></div><div className="mt-4 flex items-center gap-3 rounded-lg bg-[#eafaf0] px-4 py-3 text-[13px] italic text-[#3a5161]"><Leaf size={19} className="shrink-0 fill-emerald-500 text-emerald-700" />{store.tagline}</div></div></div></section>
}

export function BusinessHours({ hours, onEdit }) {
  return <section className={card}><StoreCardHeading icon={Clock3} title="Business Hours" onEdit={onEdit} /><div className="overflow-hidden rounded-md border border-[#e4edf2]">{hours.map(({ day, hours: time }) => <div key={day} className={`flex items-center justify-between gap-2 border-b border-[#e6edf2] min-h-[43px] px-3 py-2 text-[12px] last:border-0 ${day === 'Sunday' ? 'bg-[#e6faed] font-semibold text-[#12673c]' : 'text-[#425372]'}`}><span>{day}</span><span className="whitespace-nowrap">{time}</span></div>)}</div></section>
}

export function ServiceCategories({ services, onEdit }) {
  return <section className={card}><StoreCardHeading icon={Settings} title="Service Categories" onEdit={onEdit} /><div className="divide-y divide-[#e8eff2]">{services.map(({ title, detail, icon }) => { const Icon = serviceIcons[icon]; return <div key={title} className="flex min-h-[61px] items-center gap-3 py-2"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e2f9ec] text-emerald-800"><Icon size={18} /></span><span className="min-w-0"><strong className="block truncate text-[13px] text-[#15213b]">{title}</strong><small className="block truncate text-[11px] text-[#647493]">{detail}</small></span></div> })}</div></section>
}

export function DeliveryCoverage({ radius, onEdit }) {
  return <section className={card}><StoreCardHeading icon={Truck} title="Delivery Coverage" onEdit={onEdit} /><KanpurMap className="h-[210px]" /><div className="mt-3 flex min-h-[58px] items-center gap-3 rounded-lg bg-[#e9faef] px-3 text-[12px] text-[#314964]"><Truck size={20} className="shrink-0 text-emerald-800" /><span>We deliver within <strong>{radius} km radius</strong> of our store location.</span></div></section>
}

export function Certifications({ licenses, onEdit }) {
  return <section className={card}><StoreCardHeading icon={ShieldCheck} title="Certifications & Licenses" onEdit={onEdit} /><div className="divide-y divide-[#e6eef2]">{licenses.map(license => <div key={license.title} className="flex min-h-[54px] items-center gap-2 py-2"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#f1f6fa] text-[#263d62]"><FileText size={19} /></span><span className="min-w-0 flex-1"><strong className="block truncate text-[12px] text-[#182341]">{license.title}</strong><small className="block truncate text-[10px] text-[#657592]">{license.number}</small></span><span className="inline-flex items-center gap-0.5 rounded-full bg-[#e5f9ed] px-1.5 py-1 text-[10px] text-[#167340]"><Check size={11} />Verified</span></div>)}</div></section>
}

export function SupportedCategories({ categories, onEdit }) {
  return <section className={card}><StoreCardHeading icon={Package} title="Supported Product Categories" onEdit={onEdit} /><div className="grid grid-cols-4 gap-2">{categories.map(({ title, icon }) => { const Icon = categoryIcons[icon]; return <div key={title} className="flex min-h-[92px] min-w-0 flex-col items-center justify-center rounded-md border border-[#e0eaf0] p-1 text-center"><Icon size={24} className={categoryColors[icon]} fill={icon === 'organic' ? 'currentColor' : 'none'} /><span className="mt-2 text-[10px] leading-tight text-[#273451]">{title}</span></div> })}</div></section>
}

export function PaymentOptions({ payments, onEdit }) {
  return <section className={card}><StoreCardHeading icon={CreditCard} title="Payment Options" onEdit={onEdit} /><div>{payments.map(({ title, detail, icon }) => { const Icon = paymentIcons[icon]; return <div key={title} className="flex min-h-[39px] items-center gap-2 border-b border-[#edf1f4] py-1 last:border-0"><span className="grid size-9 shrink-0 place-items-center text-emerald-800"><Icon size={20} /></span><span className="min-w-0 flex-1 text-[12px] text-[#263451]">{title}{detail && <small className="ml-1 text-[10px]">{detail}</small>}</span><span className="rounded-full bg-[#e7f9ec] px-1.5 py-1 text-[10px] text-[#247547]">Available</span></div> })}</div></section>
}
