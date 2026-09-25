import { Leaf, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { shopkeeperNavigation } from '../config/navigation'

export default function ShopkeeperSidebar({ open, onClose }) {
  const pathname = useLocation().pathname
  const inventoryActive = pathname.startsWith(routes.shopkeeper.inventory)
  const requestsActive = pathname.startsWith(routes.shopkeeper.requests)
  return <>
    {open && <button type="button" aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" />}
    <aside id="shopkeeper-sidebar" aria-label="Shopkeeper navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col overflow-y-auto border-r border-[#e0eaf0] bg-white px-3.5 py-5 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <button type="button" aria-label="Close menu" onClick={onClose} className="absolute right-2 top-2 rounded-md p-1.5 lg:hidden"><X size={19} /></button>
      <div className="flex items-center gap-2 px-2 pb-9"><Leaf className="size-11 shrink-0 fill-emerald-500 text-emerald-800" /><div className="min-w-0"><p className="whitespace-nowrap text-[22px] font-extrabold leading-none tracking-tight text-[#0d2033]">KhetSetu AI</p><p className="mt-1 whitespace-nowrap text-[8px] text-[#465574]">Farmers Today, A Better Tomorrow</p></div></div>
      <nav aria-label="Shopkeeper sections" className="space-y-1">{shopkeeperNavigation.map(({ label, to, icon: Icon, badge }) => <NavLink key={to} to={to} end={to !== routes.shopkeeper.inventory} onClick={onClose} className={({ isActive }) => `relative flex h-[45px] items-center gap-4 rounded-lg px-3 text-[14px] font-medium transition-colors ${isActive ? 'bg-[#dff8e9] text-[#104b31] before:absolute before:-left-3.5 before:h-[42px] before:w-1 before:rounded-r before:bg-emerald-700' : 'text-[#172342] hover:bg-emerald-50'}`}><Icon size={21} strokeWidth={1.9} /><span className="flex-1">{label}</span>{badge && <span className="grid size-7 place-items-center rounded-full bg-[#fa3b38] text-xs font-bold text-white">{inventoryActive ? 3 : badge}</span>}</NavLink>)}</nav>
      <div className="mt-auto pt-6"><div className="relative hidden h-[440px] overflow-hidden rounded-xl bg-[#e5faea] bg-[url('/images/consumer/promo.png')] bg-cover bg-center p-4 xl:block"><Leaf size={44} className="relative z-10 mb-4 fill-emerald-500 text-emerald-800" /><p className="relative z-10 text-[23px] font-extrabold leading-[1.08] text-[#0f3429]">{inventoryActive ? <>Empowering<br />Local Agri<br />Businesses</> : requestsActive ? <>Stronger<br />Farmers<br />Stronger<br />Communities</> : <>Growing<br />Stronger<br />Together</>}</p><p className="relative z-10 mt-3 max-w-[165px] text-[13px] leading-tight text-[#35465d]">{inventoryActive ? 'Stronger retailers. Stronger farmers. A brighter tomorrow.' : requestsActive ? 'Quality agri-inputs for a prosperous tomorrow.' : 'Empowering a sustainable food system with technology.'}</p></div><p className="pt-2 text-center text-xs text-[#52647f]">v1.0.0</p></div>
    </aside>
  </>
}
