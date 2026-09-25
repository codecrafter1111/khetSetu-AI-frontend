import { CalendarDays, ChevronRight, Heart, Leaf, ShieldCheck, Star, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import SectionTitle from './SectionTitle'
const features = [
  { title: 'Verified Products', description: '100% farm-sourced and quality checked', icon: ShieldCheck, to: routes.consumer.products },
  { title: 'Order Tracking', description: 'Track your orders in real-time', icon: Truck, to: routes.consumer.orders },
  { title: 'Subscription Box', description: 'Get your essentials, on repeat', icon: CalendarDays, to: routes.consumer.subscriptions },
  { title: 'Farm Passport', description: 'Know your food. Know your farmer.', icon: Leaf, to: routes.consumer.farmPassport },
  { title: 'Wishlist', description: 'Save your favorite products', icon: Heart, to: routes.consumer.wishlist },
  { title: 'Ratings & Reviews', description: 'Share your experience and support farmers', icon: Star, to: routes.consumer.reviews },
]
export default function ConsumerKeyFeatures() {
  return <section className="rounded-xl border border-emerald-100 bg-[#f1fcf5] p-4 shadow-sm"><SectionTitle icon={Star} title="Key Features" /><div className="rounded-lg border border-emerald-100 bg-white/50 px-2">{features.map(({ title, description, icon: Icon, to }) => <Link key={title} to={to} className="flex min-h-[64px] items-center gap-3 border-b border-emerald-100 py-1.5 last:border-0 hover:bg-white"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-800"><Icon size={21} fill={title === 'Wishlist' || title === 'Ratings & Reviews' ? 'currentColor' : 'none'} /></span><span className="min-w-0 flex-1"><strong className="block text-xs text-slate-950">{title}</strong><small className="block truncate text-[10px] text-slate-500">{description}</small></span><ChevronRight size={15} className="text-emerald-900" /></Link>)}</div></section>
}
