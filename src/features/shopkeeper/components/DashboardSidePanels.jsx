import { BarChart3, Bell, Box, ChevronRight, ClipboardList, MapPin, MessageCircle, Package, Plus, Star, UsersRound, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { PanelHeading } from './DashboardPrimary'

const actions = [
  { title: 'Add Product', detail: 'Add a new product to your inventory', icon: Plus, to: routes.shopkeeper.addProduct, primary: true },
  { title: 'Update Stock', detail: 'Adjust product quantities', icon: ClipboardList, to: `${routes.shopkeeper.inventory}?stock=low` },
  { title: 'Respond to Request', detail: 'View and respond to farmer requests', icon: UsersRound, to: routes.shopkeeper.requests },
  { title: 'View Sales Report', detail: 'Check your sales and growth', icon: BarChart3, to: routes.shopkeeper.sales },
]

export function QuickActions() {
  return <section className="rounded-lg border border-[#dbe8ef] bg-white p-3 shadow-sm"><PanelHeading icon={Zap} title="Quick Actions" /><div className="space-y-2">{actions.map(({ title, detail, icon: Icon, to, primary }) => <Link key={title} to={to} className={`flex min-h-[52px] items-center gap-3 rounded-lg px-3 py-1.5 transition-colors ${primary ? 'bg-gradient-to-r from-[#148d4a] to-[#22964e] text-white hover:from-[#0b753e]' : 'bg-[#eef6ff] text-[#172343] hover:bg-[#e0efff]'}`}><span className={`grid size-10 shrink-0 place-items-center rounded-lg ${primary ? 'bg-white text-emerald-800' : 'bg-[#e3f8ed] text-emerald-800'}`}><Icon size={25} /></span><span><strong className="block text-[13px] leading-tight">{title}</strong><small className={`block text-[11px] ${primary ? 'text-white/80' : 'text-[#687994]'}`}>{detail}</small></span></Link>)}</div></section>
}

const toneClass = { red: 'bg-[#f74745]', orange: 'bg-[#f49b16]', green: 'bg-[#079962]' }

export function NotificationsPanel({ notifications, readIds, onRead }) {
  return <section className="rounded-lg border border-[#dbe8ef] bg-white p-3 shadow-sm"><PanelHeading icon={Bell} title="Notifications & Alerts" to={routes.shopkeeper.notifications} /><div className="divide-y divide-[#e6eef2] rounded-lg border border-[#e6eef2]">{notifications.map(item => <button key={item.id} type="button" onClick={() => onRead(item.id)} aria-label={`${item.text}, ${readIds.includes(item.id) ? 'read' : 'unread'}`} className={`flex w-full items-start gap-3 px-2.5 py-1.5 text-left hover:bg-emerald-50 ${readIds.includes(item.id) ? 'opacity-60' : ''}`}><span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${readIds.includes(item.id) ? 'bg-slate-300' : toneClass[item.tone]}`} /><span><strong className="block text-[11px] font-medium leading-tight text-[#1f2b47]">{item.text}</strong><small className="block text-[10px] text-[#73829c]">{item.time}</small></span></button>)}</div></section>
}

const features = [
  { title: 'Request Management', detail: 'View and respond to farmer requests', icon: UsersRound, to: routes.shopkeeper.requests },
  { title: 'Inventory Monitoring', detail: 'Track stock levels and get low-stock alerts', icon: Package, to: routes.shopkeeper.inventory },
  { title: 'Nearby Farmer Discovery', detail: 'Find farmers in your area', icon: MapPin, to: routes.shopkeeper.nearbyFarmers },
  { title: 'Product Suggestions', detail: 'Recommend the right inputs to farmers', icon: Box, to: routes.shopkeeper.inventory },
  { title: 'Sales Tracking', detail: 'Monitor your sales and business growth', icon: BarChart3, to: routes.shopkeeper.sales },
  { title: 'Quick Response', detail: 'Respond quickly to farmer needs', icon: MessageCircle, to: routes.shopkeeper.requests },
]

export function KeyFeaturesPanel() {
  return <section className="rounded-lg border border-[#dbe8ef] bg-white p-3 shadow-sm"><PanelHeading icon={Star} title="Key Features" /><div>{features.map(({ title, detail, icon: Icon, to }) => <Link key={title} to={to} className="flex items-center gap-2 rounded-md py-1 hover:bg-emerald-50"><span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#e0f8eb] text-emerald-800"><Icon size={18} /></span><span className="min-w-0 flex-1"><strong className="block truncate text-[11px] leading-tight text-[#172342]">{title}</strong><small className="block truncate text-[10px] leading-tight text-[#697a97]">{detail}</small></span><ChevronRight size={14} className="text-emerald-700" /></Link>)}</div></section>
}
