import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { routes } from '../../../config/routes'

export default function ConsumerTopNavbar({ onMenu, menuOpen }) {
  const [query, setQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()
  const submit = event => { event.preventDefault(); navigate(`${routes.consumer.products}${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`) }
  return <header className="relative z-20 flex min-h-[72px] flex-wrap items-center gap-3 border-b border-slate-100 bg-white px-4 py-2.5 md:flex-nowrap md:px-6">
    <button type="button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="consumer-sidebar" onClick={onMenu} className="rounded-lg p-2 text-slate-900 lg:hidden"><Menu size={22} /></button>
    <form role="search" onSubmit={submit} className="order-3 flex h-[42px] w-full max-w-[560px] items-center gap-3 rounded-lg border border-slate-200 px-3.5 shadow-sm focus-within:border-emerald-500 md:order-none md:mr-auto md:w-auto md:flex-1"><Search size={18} className="shrink-0 text-slate-600" /><input aria-label="Search products, farms, or categories" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search for products (e.g. rice, ghee, honey...), farms, or categories..." className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-slate-500" /></form>
    <div className="ml-auto flex items-center gap-4 md:gap-6"><div className="relative"><button type="button" aria-label="Notifications" aria-expanded={showNotifications} onClick={() => setShowNotifications(value => !value)} className="relative rounded-lg p-2 text-slate-900"><Bell size={23} /><span className="absolute right-1 top-1 size-2.5 rounded-full border border-white bg-red-500" /></button>{showNotifications && <div className="absolute right-0 top-11 z-30 w-64 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-xl"><strong>Notifications</strong><p className="mt-2 text-slate-500">No new notifications.</p></div>}</div><span className="h-10 border-l border-slate-200" /><button type="button" onClick={() => navigate(routes.consumer.profile)} className="flex items-center gap-3 text-left"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-800">PS</span><span className="hidden sm:block"><strong className="block text-sm text-slate-900">Priya Sharma</strong><small className="text-xs text-slate-500">Consumer • New Delhi</small></span><ChevronDown size={18} className="hidden sm:block" /></button></div>
  </header>
}
