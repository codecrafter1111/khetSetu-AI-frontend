import { Bell, ChevronDown, Leaf, Menu, Search } from 'lucide-react'
import { farmerProfile } from '../data/farmer.mock'

export default function FarmerTopNavbar({ onMenu, menuOpen }) {
  return <header className="relative z-30 flex min-h-[73px] flex-wrap items-center gap-3 border-b border-slate-200/80 bg-white px-4 py-2 md:px-6">
    <button type="button" onClick={onMenu} aria-label="Open menu" aria-controls="farmer-sidebar" aria-expanded={menuOpen} className="rounded-xl border border-slate-200 p-2.5 lg:hidden"><Menu className="size-5" /></button>
    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 sm:hidden"><Leaf className="size-5 fill-emerald-500 text-emerald-700" />KhetSetu AI</div>
    <label className="relative order-last w-full sm:order-none sm:max-w-[455px]"><span className="sr-only">Search</span><Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" placeholder="Search products, orders, or get help..." /></label>
    <div className="ml-auto flex items-center gap-3 md:gap-4"><button type="button" aria-label="Notifications" className="relative rounded-xl p-2 hover:bg-slate-50"><Bell className="size-6" /><span className="absolute right-1.5 top-1.5 size-2.5 rounded-full border-2 border-white bg-red-500" /></button><div className="hidden h-8 w-px bg-slate-200 sm:block" /><div role="img" aria-label="Ramesh Yadav" className="size-11 rounded-full bg-emerald-100 bg-[url('/images/dashboard/farmer-cutout.png')] bg-[length:115%_auto] bg-center bg-no-repeat" /><div className="hidden md:block"><p className="text-sm font-bold text-slate-900">{farmerProfile.name}</p><p className="text-xs text-slate-500">{farmerProfile.role} • {farmerProfile.location}</p></div><ChevronDown className="hidden size-4 md:block" /></div>
  </header>
}
