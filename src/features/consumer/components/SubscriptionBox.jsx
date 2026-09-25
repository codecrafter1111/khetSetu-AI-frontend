import { CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import ProduceImage from './ProduceImage'
import SectionTitle from './SectionTitle'
export default function SubscriptionBox() {
  return <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><SectionTitle icon={CalendarDays} title="Your Subscription Box" to={routes.consumer.subscriptions} action="Manage" /><div className="flex min-h-[142px] gap-3 rounded-lg border border-slate-100 p-3"><ProduceImage tile={0} alt="Monthly essentials subscription" className="w-28 shrink-0 rounded-lg" /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><h3 className="text-xs font-semibold text-slate-950">Monthly Essentials</h3><p className="text-[11px] text-slate-500">5 products • Every Month</p></div><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-900">Active</span></div><p className="mt-4 text-[10px] text-slate-500">Next delivery</p><strong className="block text-xs text-slate-950">Apr 28, 2025</strong><div className="flex items-center justify-between"><strong className="text-sm text-slate-950">₹ 1,180</strong><Link to={routes.consumer.subscriptions} className="rounded-md bg-emerald-100 px-3 py-1.5 text-[11px] font-medium text-emerald-900">View Details</Link></div></div></div></section>
}
