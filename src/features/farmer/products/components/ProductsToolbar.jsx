import { Plus, Search } from 'lucide-react'
import { categories } from '../data/products.mock'

const control = 'h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15'

export default function ProductsToolbar({ search, onSearchChange, onSearch, category, onCategoryChange, listingStatus, onListingStatusChange, stockStatus, onStockStatusChange, onAddProduct }) {
  return <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
    <form onSubmit={onSearch} className="grid gap-2 rounded-xl border border-slate-200/80 bg-white p-[7px] shadow-sm sm:grid-cols-2 xl:w-[862px] xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,.8fr)_minmax(0,1fr)_100px]">
      <label className="relative sm:col-span-2 xl:col-span-1"><span className="sr-only">Search products</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={event => onSearchChange(event.target.value)} placeholder="Search products by name or category..." className={`${control} w-full pl-9`} /></label>
      <label><span className="sr-only">Category</span><select value={category} onChange={event => onCategoryChange(event.target.value)} className={`${control} w-full`}><option value="all">All Categories</option>{categories.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
      <label><span className="sr-only">Listing status</span><select value={listingStatus} onChange={event => onListingStatusChange(event.target.value)} className={`${control} w-full`}><option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
      <label><span className="sr-only">Stock level</span><select value={stockStatus} onChange={event => onStockStatusChange(event.target.value)} className={`${control} w-full`}><option value="all">Stock Level</option><option value="in_stock">In Stock</option><option value="low_stock">Low Stock</option><option value="out_of_stock">Out of Stock</option></select></label>
      <button type="submit" className="h-9 rounded-lg bg-emerald-700 px-4 text-xs font-semibold text-white transition hover:bg-emerald-800">Search</button>
    </form>
    <button type="button" onClick={onAddProduct} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-emerald-800"><Plus className="size-4" />Add New Product</button>
  </div>
}
