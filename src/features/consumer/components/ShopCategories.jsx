import { LayoutGrid } from 'lucide-react'
import { routes } from '../../../config/routes'
import { categories } from '../data/dashboard.mock'
import ProduceImage from './ProduceImage'
import SectionTitle from './SectionTitle'
export default function ShopCategories() {
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><SectionTitle icon={LayoutGrid} title="Shop by Category" to={routes.consumer.products} action="View All Categories" /><div className="grid grid-cols-3 gap-3 sm:grid-cols-6">{categories.map(category => <div key={category.name} className="min-w-0 text-center"><ProduceImage tile={category.tile} alt={category.name} className="aspect-[1.08] rounded-lg" /><p className="mt-2 truncate text-xs font-medium text-slate-800">{category.name}</p></div>)}</div></section>
}
