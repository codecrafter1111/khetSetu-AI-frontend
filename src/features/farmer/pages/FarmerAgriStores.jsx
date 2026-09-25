import { useMemo, useState } from 'react'
import { Store } from 'lucide-react'
import FarmerPageHero from '../components/FarmerPageHero'
import AgriStoreSearch from '../agri-stores/components/AgriStoreSearch'
import AgriStoreStats from '../agri-stores/components/AgriStoreStats'
import StoresMap from '../agri-stores/components/StoresMap'
import NearbyStores from '../agri-stores/components/NearbyStores'
import AgriStoreFeatures from '../agri-stores/components/AgriStoreFeatures'
import RecommendedProducts from '../agri-stores/components/RecommendedProducts'
import StoreContact from '../agri-stores/components/StoreContact'
import LocalStoreBenefits from '../agri-stores/components/LocalStoreBenefits'
import { recommendedProducts, stores } from '../agri-stores/data/agriStores.mock'

const initialFilters = { location: 'Varanasi, Uttar Pradesh', productType: 'all', query: '', distance: '10' }

export default function FarmerAgriStores() {
  const [draft, setDraft] = useState(initialFilters)
  const [applied, setApplied] = useState(initialFilters)
  const [selectedId, setSelectedId] = useState(1)
  const [sort, setSort] = useState('distance')
  const visibleStores = useMemo(() => {
    const query = applied.query.trim().toLowerCase()
    const matchingProducts = recommendedProducts.filter(product => `${product.name} ${product.category}`.toLowerCase().includes(query))
    return stores.filter(store => store.distance <= Number(applied.distance) && (applied.productType === 'all' || store.categories.includes(applied.productType)) && (!query || `${store.name} ${store.address} ${store.categories.join(' ')}`.toLowerCase().includes(query) || matchingProducts.some(product => store.categories.includes(product.category)))).sort((a, b) => sort === 'rating' ? b.rating - a.rating : a.distance - b.distance)
  }, [applied, sort])
  const selectedStore = visibleStores.find(store => store.id === selectedId) || visibleStores[0]
  const visibleProducts = recommendedProducts.filter(product => applied.productType === 'all' || product.category === applied.productType)
  const nearbyCount = applied.productType === 'all' && applied.distance === '10' && !applied.query.trim() ? 12 : visibleStores.length

  return <>
    <FarmerPageHero title="Agri Stores" subtitle="Find nearby farm-input suppliers for quality seeds, fertilizers, pesticides and more." icon={Store} iconPlacement="end" slogan={['Sahi Inputs', 'Behtar Fasal', 'Behtar Kal']} />
    <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-4 sm:px-5">
      <AgriStoreSearch draft={draft} onChange={setDraft} onSearch={() => setApplied({ ...draft })} />
      <div className="mt-4"><AgriStoreStats /></div>
      <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-2 xl:grid-cols-[minmax(0,502fr)_minmax(0,370fr)_minmax(0,290fr)]">
        <div className="contents xl:grid xl:content-start xl:gap-4"><div className="order-1 min-w-0"><StoresMap stores={visibleStores} selectedId={selectedStore?.id} onSelect={setSelectedId} /></div><div className="order-4 min-w-0"><RecommendedProducts products={visibleProducts} /></div></div>
        <div className="contents xl:grid xl:content-start xl:gap-4"><div className="order-2 min-w-0"><NearbyStores stores={visibleStores} totalCount={nearbyCount} selectedId={selectedStore?.id} onSelect={setSelectedId} sort={sort} onSort={setSort} /></div><div className="order-5 min-w-0"><StoreContact store={selectedStore} /></div></div>
        <div className="contents xl:grid xl:content-start xl:gap-4"><div className="order-3 min-w-0"><AgriStoreFeatures /></div><div className="order-6 min-w-0"><LocalStoreBenefits /></div></div>
      </div>
    </div>
  </>
}
