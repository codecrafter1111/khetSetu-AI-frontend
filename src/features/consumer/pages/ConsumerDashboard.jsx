import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { routes } from '../../../config/routes'
import ConsumerHero from '../components/ConsumerHero'
import ConsumerStatCard from '../components/ConsumerStatCard'
import ShopCategories from '../components/ShopCategories'
import FeaturedProducts from '../components/FeaturedProducts'
import TrackOrder from '../components/TrackOrder'
import SubscriptionBox from '../components/SubscriptionBox'
import ConsumerKeyFeatures from '../components/ConsumerKeyFeatures'
import FarmPassportCard from '../components/FarmPassportCard'
import { products, stats } from '../data/dashboard.mock'
import { useConsumerCommerce } from '../state/useConsumerCommerce'

export default function ConsumerDashboard() {
  const [addedIds, setAddedIds] = useState([])
  const { addToCart, cartCount, cartTotal } = useConsumerCommerce()
  const addProduct = id => { const product = products.find(item => item.id === id); if (product) addToCart(product); setAddedIds(current => current.includes(id) ? current : [...current, id]) }
  return <><ConsumerHero /><div className="space-y-4 p-4 md:p-5"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stats.map(stat => <ConsumerStatCard key={stat.label} stat={stat} />)}</div><div className="grid gap-4 xl:grid-cols-[minmax(0,3fr)_minmax(285px,1.14fr)]"><div className="min-w-0 space-y-4"><ShopCategories /><FeaturedProducts onAdd={addProduct} addedIds={addedIds} /><div className="grid gap-4 lg:grid-cols-2"><TrackOrder /><SubscriptionBox /></div></div><aside className="min-w-0 space-y-4"><Link to={routes.consumer.cart} className="block rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition-colors hover:bg-emerald-50"><div className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-lg bg-emerald-700 text-white"><ShoppingBag size={23} /></span><div className="min-w-0 flex-1"><h2 className="text-sm font-bold text-slate-950">Cart &amp; Checkout</h2><p className="text-xs text-slate-500">{cartCount} {cartCount === 1 ? 'item' : 'items'} · ₹ {cartTotal.toLocaleString('en-IN')}</p></div><ArrowRight size={18} className="text-emerald-800" /></div><span className="mt-3 flex h-9 items-center justify-center rounded-md bg-emerald-700 text-xs font-semibold text-white">View Cart</span></Link><ConsumerKeyFeatures /><FarmPassportCard /></aside></div></div>{addedIds.length > 0 && <div role="status" className="fixed bottom-4 right-4 z-50 rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl">Added to cart <Link to={routes.consumer.cart} className="ml-3 font-semibold underline">View Cart</Link></div>}</>
}
