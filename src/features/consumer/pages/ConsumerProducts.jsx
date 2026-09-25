import { useMemo, useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { routes } from '../../../config/routes'
import ConsumerProductsHero from '../components/ConsumerProductsHero'
import ProductFilterBar from '../components/ProductFilterBar'
import ProductCategoryCarousel from '../components/ProductCategoryCarousel'
import ConsumerProductCard from '../components/ConsumerProductCard'
import ShopProductsAside from '../components/ShopProductsAside'
import { shopProducts } from '../data/shopProducts.mock'
import { useConsumerCommerce } from '../state/useConsumerCommerce'

const initialFilters = { search: '', category: '', location: '', price: '', verified: '', rating: '', sort: '' }

function filterProducts(filters) {
  const search = filters.search.trim().toLowerCase()
  const results = shopProducts.filter(product => {
    if (search && !`${product.name} ${product.farm} ${product.category} ${product.location}`.toLowerCase().includes(search)) return false
    if (filters.category && product.category !== filters.category) return false
    if (filters.location && product.location !== filters.location) return false
    if (filters.verified === 'yes' && !product.verified) return false
    if (filters.rating && product.rating < Number(filters.rating)) return false
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number)
      if (product.price < min || product.price > max) return false
    }
    return true
  })
  if (filters.sort === 'price-asc') return results.sort((a, b) => a.price - b.price)
  if (filters.sort === 'price-desc') return results.sort((a, b) => b.price - a.price)
  if (filters.sort === 'rating') return results.sort((a, b) => b.rating - a.rating)
  if (filters.sort === 'name') return results.sort((a, b) => a.name.localeCompare(b.name))
  return results
}

export default function ConsumerProducts() {
  const [params] = useSearchParams()
  const [filters, setFilters] = useState(() => ({ ...initialFilters, search: params.get('q') || '' }))
  const [view, setView] = useState('grid')
  const { wishlist, toggleWishlist, addToCart, cartCount, cartTotal } = useConsumerCommerce()
  const [notice, setNotice] = useState('')
  const products = useMemo(() => filterProducts(filters), [filters])

  const toggleWish = id => { const product = shopProducts.find(item => item.id === id); if (product) toggleWishlist(product.name) }
  const addProduct = product => { addToCart(product); setNotice(`${product.name} added to cart`) }

  return <div className="min-w-0 bg-[#f5fbfd]"><ConsumerProductsHero /><div className="space-y-2.5 p-3 md:p-4"><ProductFilterBar filters={filters} onChange={setFilters} /><ProductCategoryCarousel selected={filters.category} onSelect={category => setFilters(current => ({ ...current, category }))} /><div className="flex items-center justify-between gap-3 px-1 py-1"><p className="text-xs font-semibold text-slate-900">Showing {products.length} product{products.length === 1 ? '' : 's'}</p><div role="group" aria-label="Product view" className="flex gap-1.5"><button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs ${view === 'grid' ? 'border-emerald-200 bg-emerald-50 font-medium text-emerald-900' : 'border-slate-200 bg-white text-slate-600'}`}><LayoutGrid size={16} />Grid</button><button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs ${view === 'list' ? 'border-emerald-200 bg-emerald-50 font-medium text-emerald-900' : 'border-slate-200 bg-white text-slate-600'}`}><List size={16} />List</button></div></div><div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_260px]"><div className={`grid min-w-0 gap-2.5 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>{products.map(product => <ConsumerProductCard key={product.id} product={product} view={view} wished={wishlist.includes(product.name)} onWish={toggleWish} onAdd={addProduct} />)}{products.length === 0 && <div className="col-span-full rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600">No products match these filters. Try another search or category.</div>}</div><ShopProductsAside cart={{ count: cartCount, total: cartTotal }} /></div></div>{notice && <div role="status" className="fixed bottom-4 right-4 z-50 rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl">{notice}<Link to={routes.consumer.cart} className="ml-3 font-semibold underline">View Cart</Link><button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')} className="ml-3 text-lg leading-none">×</button></div>}</div>
}

export function ProductsRoute() {
  const location = useLocation()
  return <ConsumerProducts key={location.search} />
}
