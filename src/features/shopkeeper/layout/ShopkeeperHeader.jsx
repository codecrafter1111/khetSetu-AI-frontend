import { useState } from 'react'
import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { shopkeeperProfile } from '../data/dashboard.mock'
import { ShopkeeperAvatar } from '../components/ShopkeeperImage'

export default function ShopkeeperHeader({ onMenu, menuOpen }) {
  const navigate = useNavigate()
  const inventoryActive = useLocation().pathname.startsWith(routes.shopkeeper.inventory)
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [profileOpen, setProfileOpen] = useState(false)
  const search = event => {
    event.preventDefault()
    navigate(`${routes.shopkeeper.dashboard}${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`)
  }
  return <header className="relative z-30 flex min-h-[72px] flex-wrap items-center gap-3 border-b border-[#e4edf3] bg-white px-4 py-2 md:px-6">
    <button type="button" aria-label="Open menu" aria-controls="shopkeeper-sidebar" aria-expanded={menuOpen} onClick={onMenu} className="rounded-lg p-2 hover:bg-emerald-50 lg:hidden"><Menu size={22} /></button>
    <form role="search" onSubmit={search} className="relative order-last w-full sm:order-none sm:max-w-[620px]"><Search className="absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#607599]" /><input value={query} onChange={event => setQuery(event.target.value)} aria-label="Search shopkeeper dashboard" placeholder="Search farmers, products, orders, or anything..." className="h-10 w-full rounded-lg border border-[#d8e3ee] bg-white pl-11 pr-4 text-[14px] text-[#1a2b45] shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></form>
    <div className="ml-auto flex items-center gap-4"><Link to={routes.shopkeeper.notifications} aria-label={`Notifications, ${inventoryActive ? 3 : 6} unread`} className="relative rounded-lg p-1.5 text-[#172342] hover:bg-emerald-50"><Bell size={23} /><span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#f6403c] text-[11px] font-bold text-white">{inventoryActive ? 3 : 6}</span></Link><span className="hidden h-9 w-px bg-[#d8e5ee] sm:block" /><button type="button" onClick={() => setProfileOpen(value => !value)} aria-expanded={profileOpen} className="flex items-center gap-3 rounded-lg text-left"><ShopkeeperAvatar tile={shopkeeperProfile.avatarTile} name={shopkeeperProfile.name} className="size-10 border border-slate-200" /><span className="hidden sm:block"><strong className="block text-[14px] text-[#172342]">{shopkeeperProfile.name}</strong><small className="block text-xs text-[#64718a]">{shopkeeperProfile.role} • {shopkeeperProfile.location}</small></span><ChevronDown size={17} className="hidden text-[#2d3f61] sm:block" /></button></div>
    {profileOpen && <div className="absolute right-4 top-[64px] z-50 w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"><Link to={routes.shopkeeper.profile} onClick={() => setProfileOpen(false)} className="block rounded px-3 py-2 text-sm hover:bg-emerald-50">Profile</Link><Link to={routes.shopkeeper.help} onClick={() => setProfileOpen(false)} className="block rounded px-3 py-2 text-sm hover:bg-emerald-50">Help</Link></div>}
  </header>
}
