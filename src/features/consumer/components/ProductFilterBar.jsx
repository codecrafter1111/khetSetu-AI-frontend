import { MapPin, Search, ShieldCheck, SlidersHorizontal, Star, Tag } from 'lucide-react'
import { shopCategories, shopProducts } from '../data/shopProducts.mock'

const locations = [...new Set(shopProducts.map(product => product.location))]
function FilterSelect({ icon: Icon, label, value, onChange, options }) {
  return <label className="relative flex h-10 min-w-[125px] flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-700 shadow-sm"><Icon size={16} className="shrink-0 text-slate-700" /><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={event => onChange(event.target.value)} className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-3 outline-none"><option value="">{label}</option>{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><span className="pointer-events-none absolute right-2 text-slate-500">⌄</span></label>
}

export default function ProductFilterBar({ filters, onChange }) {
  const update = (key, value) => onChange(current => ({ ...current, [key]: value }))
  return <div className="flex flex-wrap gap-2 rounded-xl bg-white/60 p-2.5"><label className="flex h-10 min-w-[225px] flex-[2] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm"><Search size={17} className="text-slate-600" /><span className="sr-only">Search products</span><input value={filters.search} onChange={event => update('search', event.target.value)} placeholder="Search products, farms, or keywords..." className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-slate-500" /></label>
    <FilterSelect icon={Tag} label="All Categories" value={filters.category} onChange={value => update('category', value)} options={shopCategories.slice(1).map(item => ({ value: item.name, label: item.name }))} />
    <FilterSelect icon={MapPin} label="All Locations" value={filters.location} onChange={value => update('location', value)} options={locations.map(location => ({ value: location, label: location }))} />
    <FilterSelect icon={Tag} label="Price Range" value={filters.price} onChange={value => update('price', value)} options={[{ value: '0-200', label: 'Under ₹200' }, { value: '200-400', label: '₹200 – ₹400' }, { value: '400-700', label: '₹400 – ₹700' }]} />
    <FilterSelect icon={ShieldCheck} label="Verified Only" value={filters.verified} onChange={value => update('verified', value)} options={[{ value: 'yes', label: 'Verified Only' }]} />
    <FilterSelect icon={Star} label="Min Rating" value={filters.rating} onChange={value => update('rating', value)} options={[{ value: '4.5', label: '4.5+ Stars' }, { value: '4.8', label: '4.8+ Stars' }]} />
    <FilterSelect icon={SlidersHorizontal} label="Sort by" value={filters.sort} onChange={value => update('sort', value)} options={[{ value: 'price-asc', label: 'Price: Low to High' }, { value: 'price-desc', label: 'Price: High to Low' }, { value: 'rating', label: 'Highest Rated' }, { value: 'name', label: 'Name A–Z' }]} />
  </div>
}
