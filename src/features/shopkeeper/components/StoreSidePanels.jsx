import { BadgeCheck, Check, Clock3, Eye, MapPin, ShieldCheck, Star, Store, Truck, UsersRound, Zap } from 'lucide-react'
import StoreCardHeading from './StoreCardHeading'

const storeActionIcons = { profile: UsersRound, hours: Clock3, banner: Eye, documents: ShieldCheck }

const card = 'rounded-2xl border border-[#dce8ee] bg-white p-5 shadow-[0_2px_10px_rgba(28,72,70,0.03)]'

export function StoreStrengths({ strengths }) {
  return <section className={card}><StoreCardHeading icon={Star} title="Store Strengths" /><div className="space-y-3 rounded-xl bg-[#effcf3] p-4">{strengths.map(strength => <p key={strength} className="flex items-center gap-3 text-[13px] text-[#31425e]"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#1ba95a] text-white"><Check size={12} /></span>{strength}</p>)}</div></section>
}

const actions = [
  { id: 'profile', title: 'Update Profile', detail: 'Edit store details, contact info, description', tone: 'green' },
  { id: 'hours', title: 'Manage Hours', detail: 'Set or update your operating hours', tone: 'blue' },
  { id: 'banner', title: 'Add Banner', detail: 'Upload promotional banner or offers', tone: 'purple' },
  { id: 'documents', title: 'Verify Documents', detail: 'Upload or update licenses and certificates', tone: 'amber' },
]
const tones = {
  green: 'border-[#d5efe0] bg-[#f3fff7] text-[#167846]',
  blue: 'border-[#dbe9ff] bg-[#f1f7ff] text-[#2475d5]',
  purple: 'border-[#ece1fb] bg-[#f9f5ff] text-[#7652cb]',
  amber: 'border-[#f7e7cf] bg-[#fff9f0] text-[#e79a14]',
}

export function StoreQuickActions({ onAction }) {
  return <section className={card}><StoreCardHeading icon={Zap} title="Quick Actions" /><div className="space-y-3">{actions.map(action => { const Icon = storeActionIcons[action.id]; return <button key={action.id} type="button" onClick={() => onAction(action.id)} className={`flex min-h-[72px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left hover:brightness-[.98] ${tones[action.tone]}`}><span className="grid size-11 shrink-0 place-items-center rounded-md bg-white/80"><Icon size={23} /></span><span><strong className="block text-[14px] text-[#17213b]">{action.title}</strong><small className="block text-[11px] text-[#657591]">{action.detail}</small></span></button> })}</div></section>
}

const featureIcons = { profile: Store, location: MapPin, hours: Clock3, delivery: Truck, license: ShieldCheck, visibility: Eye }

export function StoreKeyFeatures({ features }) {
  return <section className={`${card} bg-gradient-to-br from-white to-[#effcf4]`}><StoreCardHeading icon={Star} title="Key Features" /><div className="space-y-3">{features.map(({ title, detail, icon }) => { const Icon = featureIcons[icon]; return <div key={title} className="flex min-h-[55px] items-center gap-3"><span className="grid size-10 shrink-0 place-items-center text-emerald-800"><Icon size={20} fill={icon === 'profile' || icon === 'visibility' ? 'currentColor' : 'none'} /></span><span className="min-w-0"><strong className="block truncate text-[13px] leading-tight text-[#17213b]">{title}</strong><small className="block truncate text-[11px] leading-tight text-[#657592]">{detail}</small></span>{icon === 'license' && <BadgeCheck size={13} className="ml-auto text-emerald-700" />}</div> })}</div></section>
}
