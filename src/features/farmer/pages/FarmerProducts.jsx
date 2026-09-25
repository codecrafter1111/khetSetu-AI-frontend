import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FarmerPageHero from '../components/FarmerPageHero'
import ProductStatCard from '../products/components/ProductStatCard'
import ProductsToolbar from '../products/components/ProductsToolbar'
import ProductsTable from '../products/components/ProductsTable'
import QuickActions from '../products/components/QuickActions'
import ProductKeyFeatures from '../products/components/ProductKeyFeatures'
import { products, productStats } from '../products/data/products.mock'

const pageSize = 8

export default function FarmerProducts() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [listingStatus, setListingStatus] = useState('all')
  const [stockStatus, setStockStatus] = useState('all')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState(() => new Set())

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase()
    return products.filter(product =>
      (!term || `${product.name} ${product.category}`.toLowerCase().includes(term)) &&
      (category === 'all' || product.category === category) &&
      (listingStatus === 'all' || product.listingStatus === listingStatus) &&
      (stockStatus === 'all' || product.stockStatus === stockStatus),
    ).sort((a, b) => {
      if (sort === 'oldest') return a.updatedAt.localeCompare(b.updatedAt)
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'priceHigh') return b.unitPrice - a.unitPrice
      if (sort === 'priceLow') return a.unitPrice - b.unitPrice
      return b.updatedAt.localeCompare(a.updatedAt)
    })
  }, [query, category, listingStatus, stockStatus, sort])

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const pageProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize)

  function updateFilter(setter, value) { setter(value); setPage(1) }
  function toggleSelected(id) { setSelectedIds(current => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next }) }
  function selectPage() { setSelectedIds(current => { const next = new Set(current); const allSelected = pageProducts.every(product => next.has(product.id)); pageProducts.forEach(product => { if (allSelected) next.delete(product.id); else next.add(product.id) }); return next }) }

  return <>
    <FarmerPageHero title="My Products" subtitle="Manage your farm products, track stock, and reach more buyers." />
    <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-4 sm:px-5">
      <section aria-label="Product statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.05fr_1.07fr_1fr_1.6fr]">{productStats.map(stat => <ProductStatCard key={stat.label} stat={stat} />)}</section>
      <ProductsToolbar search={search} onSearchChange={setSearch} onSearch={event => { event.preventDefault(); updateFilter(setQuery, search) }} category={category} onCategoryChange={value => updateFilter(setCategory, value)} listingStatus={listingStatus} onListingStatusChange={value => updateFilter(setListingStatus, value)} stockStatus={stockStatus} onStockStatusChange={value => updateFilter(setStockStatus, value)} onAddProduct={() => navigate('/farmer/products/new')} />
      <div className="mt-4 grid min-w-0 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_308px]"><ProductsTable pageProducts={pageProducts} filteredCount={filteredProducts.length} page={page} pageCount={pageCount} onPageChange={setPage} selectedIds={selectedIds} onToggle={toggleSelected} onSelectPage={selectPage} sort={sort} onSortChange={value => updateFilter(setSort, value)} onProductOpen={product => navigate(`/farmer/products/${product.id}`)} /><aside aria-label="Product tools" className="grid content-start gap-4"><QuickActions /><ProductKeyFeatures /></aside></div>
    </div>
  </>
}
