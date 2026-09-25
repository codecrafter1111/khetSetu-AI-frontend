import { Leaf, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { farmerNavigation } from '../config/navigation'
import { routes } from '../../../config/routes'

export default function FarmerSidebar({ open, onClose }) {
  const { pathname } = useLocation()
  const farmSetupPage = pathname === routes.farmer.profileFarmBasics
  const profilePage = pathname === routes.farmer.profile || pathname === routes.farmer.profileVerification || pathname === routes.farmer.profileComplete
  return <>
    {open && <button type="button" aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm lg:hidden" />}
    <aside id="farmer-sidebar" aria-label="Farmer sidebar" className={`fixed left-0 top-0 z-50 flex h-dvh w-[238px] flex-col overflow-hidden border-r border-slate-200 bg-white px-3.5 py-5 transition-transform duration-300 ${open ? 'visible translate-x-0' : 'invisible -translate-x-full lg:visible lg:translate-x-0'}`}>
      <button type="button" onClick={onClose} aria-label="Close menu" className="absolute right-3 top-3 rounded-lg p-1.5 lg:hidden"><X className="size-5" /></button>
      <div className="farmer-sidebar-brand flex items-center gap-2 px-2 pb-10"><div className="grid size-10 place-items-center rounded-xl bg-emerald-100"><Leaf className="size-7 fill-emerald-500 text-emerald-700" /></div><div><p className="text-xl font-black tracking-tight text-slate-950">KhetSetu AI</p><p className="text-[9px] text-slate-500">Farmers Today, A Better Tomorrow</p></div></div>
      <nav className="farmer-sidebar-nav space-y-1" aria-label="Farmer navigation">{farmerNavigation.map(({ label, to, icon: Icon, badge }) => {
        const styles = 'farmer-sidebar-item relative flex h-[43px] w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium transition'
        const content = <><Icon className="size-[19px]" />{label}{badge && <span className="ml-auto grid size-6 place-items-center rounded-full bg-red-500 text-xs text-white">{badge}</span>}</>
        return to === routes.farmer.dashboard || to === routes.farmer.farm || to === routes.farmer.products || to === routes.farmer.orders || to === routes.farmer.cropDoctor || to === routes.farmer.priceInsights || to === routes.farmer.agriStores || to === routes.farmer.profile
          ? <NavLink key={to} to={to} end={to !== routes.farmer.products && to !== routes.farmer.profile} onClick={onClose} className={({ isActive }) => `${styles} ${(farmSetupPage ? to === routes.farmer.farm : isActive) ? 'bg-emerald-100 text-emerald-800 before:absolute before:-left-3.5 before:h-8 before:w-1 before:rounded-r before:bg-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}>{content}</NavLink>
          : <span key={to} aria-disabled="true" className={`${styles} text-slate-700`}>{content}</span>
      })}</nav>
      <div className="farmer-sidebar-promo relative mt-auto hidden h-[385px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-100 p-4 xl:block"><Leaf className="mb-2 size-10 fill-emerald-400 text-emerald-700" /><p className="relative z-10 text-xl font-black leading-[1.05] text-emerald-950">{profilePage ? <>Growing<br />Stronger<br />Together</> : <>Better<br />Farmers<br />Brighter<br />Futures</>}</p><p className="relative z-10 mt-3 max-w-32 text-xs leading-snug text-slate-700">{profilePage ? <>Empowering Farmers with AI for a Healthier, Greener Tomorrow.</> : <>Technology for healthier farms and happier communities.</>}</p><div className="absolute inset-x-0 bottom-0 h-[150px] bg-[url('/images/dashboard/farmer-hero.png')] bg-cover bg-center" /></div><p className="farmer-sidebar-version pt-3 text-center text-[11px] text-slate-500">v1.0.0</p>
    </aside>
  </>
}
