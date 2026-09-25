import { Leaf, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { consumerNavigation } from '../config/navigation'
import { routes } from '../../../config/routes'
import ConsumerPromoCard from '../components/ConsumerPromoCard'

export default function ConsumerSidebar({ open, onClose }) {
  const location = useLocation()
  return <>
    {open && <button type="button" aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden" />}
    <aside id="consumer-sidebar" aria-label="Consumer navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-5 transition-transform duration-300 ${open ? 'visible translate-x-0' : 'invisible -translate-x-full lg:visible lg:translate-x-0'}`}>
      <button type="button" onClick={onClose} aria-label="Close menu" className="absolute right-2 top-2 rounded p-1.5 lg:hidden"><X size={19} /></button>
      <div className="flex items-center gap-2.5 px-2 pb-8"><Leaf className="size-10 fill-emerald-500 text-emerald-700" /><div><p className="text-[23px] font-extrabold leading-none tracking-tight text-slate-950">KhetSetu AI</p><p className="mt-1 text-[8px] text-slate-500">Farmers Today, A Better Tomorrow</p></div></div>
      <nav className="space-y-0.5" aria-label="Consumer sections">{consumerNavigation.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to !== routes.consumer.products} onClick={onClose} className={({ isActive }) => `relative flex h-[48px] items-center gap-5 rounded-lg px-4 text-[15px] transition-colors ${isActive || (to === routes.consumer.cart && location.pathname.startsWith('/consumer/checkout/')) ? 'bg-[#e1f7e8] font-semibold text-emerald-900 before:absolute before:-left-3 before:h-11 before:w-1 before:rounded-r before:bg-emerald-700' : 'text-slate-800 hover:bg-emerald-50'}`}><Icon size={22} strokeWidth={1.8} />{label}</NavLink>)}</nav>
      <div className="mt-auto pt-10"><ConsumerPromoCard /><p className="py-2 text-center text-xs text-slate-500">v1.0.0</p></div>
    </aside>
  </>
}
