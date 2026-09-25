import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Leaf, Package } from 'lucide-react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { inventoryFeatures, inventoryProducts, inventoryStats, stockStatus } from '../data/inventory.mock'
import { downloadInventoryCsv, parseInventoryCsv } from '../../../services/shopkeeper/inventoryService'
import InventoryStats from '../components/inventory/InventoryStats'
import InventoryFilters from '../components/inventory/InventoryFilters'
import InventoryTable from '../components/inventory/InventoryTable'
import InventoryDialog from '../components/inventory/InventoryDialog'
import { InventoryKeyFeatures, InventoryQuickActions } from '../components/inventory/InventorySidePanels'

function InventoryHero() {
  return <section className="relative isolate flex min-h-[150px] items-center overflow-hidden rounded-2xl bg-[url('/images/dashboard/farmer-hero.png')] bg-[length:160%_auto] bg-[position:left_62%] px-5 py-7 sm:min-h-[165px] sm:px-8"><div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-white/20" /><div className="relative z-10"><h1 className="text-[34px] font-extrabold leading-tight tracking-tight text-[#131c2d] sm:text-[40px]">Inventory</h1><p className="mt-1 max-w-[690px] text-[14px] leading-relaxed text-[#526587] sm:text-[16px]">Manage your stock of seeds, fertilizers, pesticides, and farm supplies efficiently.</p></div><p aria-hidden="true" className="absolute right-[23%] top-7 hidden -rotate-6 font-serif text-[19px] font-semibold italic leading-tight text-[#152039] 2xl:block">Bharat<br />Ka Kisan<br />Bharat Ki Shaan <Leaf size={34} className="inline fill-emerald-500 text-emerald-700" /></p><p aria-hidden="true" className="absolute right-5 top-7 hidden text-[14px] font-bold leading-tight text-[#133d2b] 2xl:block">Better<br />Farms<br />Brighter<br />Futures</p></section>
}

export default function ShopkeeperInventory() {
  const location = useLocation()
  const [params] = useSearchParams()
  const [products, setProducts] = useState(inventoryProducts)
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState(params.get('stock') ?? '')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [selected, setSelected] = useState([])
  const [dialog, setDialog] = useState(() => location.pathname.endsWith('/new') ? { mode: 'add' } : null)
  const [notice, setNotice] = useState('')
  const uploadRef = useRef(null)
  useEffect(() => {
    if (!dialog) return undefined
    const close = event => { if (event.key === 'Escape') setDialog(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [dialog])
  const filtered = products.filter(product => {
    const matchesQuery = `${product.name} ${product.sku} ${product.supplier} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase())
    return matchesQuery && (!category || product.category === category) && (!status || stockStatus(product) === status)
  })
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const start = filtered.length ? (currentPage - 1) * pageSize + 1 : 0
  const end = Math.min(currentPage * pageSize, filtered.length)
  const statValues = {
    'Total Products': products.length,
    'In Stock': products.filter(product => stockStatus(product) === 'in').length,
    'Low Stock': products.filter(product => stockStatus(product) === 'low').length,
    'Out of Stock': products.filter(product => stockStatus(product) === 'out').length,
  }
  const stats = inventoryStats.map(stat => ({ ...stat, value: statValues[stat.label] }))
  const chooseQuery = value => { setQuery(value); setPage(1) }
  const chooseCategory = value => { setCategory(value); setPage(1) }
  const chooseStatus = value => { setStatus(value); setPage(1) }
  const reset = () => { setQuery(''); setCategory(''); setStatus(''); setPage(1) }
  const save = product => {
    if (dialog.mode === 'add') setProducts(current => [{ ...product, id: `new-${crypto.randomUUID()}`, tile: 0 }, ...current])
    else setProducts(current => current.map(item => item.id === product.id ? product : item))
    setDialog(null)
    setNotice(dialog.mode === 'add' ? 'Product added to this inventory preview.' : 'Product updated in this inventory preview.')
  }
  const duplicate = product => { setProducts(current => [{ ...product, id: `copy-${crypto.randomUUID()}`, sku: `${product.sku}-COPY` }, ...current]); setNotice(`${product.name} duplicated.`) }
  const remove = id => { setProducts(current => current.filter(product => product.id !== id)); setSelected(current => current.filter(value => value !== id)); setNotice('Product removed from this inventory preview.') }
  const action = id => {
    if (id === 'upload') { uploadRef.current?.click(); return }
    if (id === 'report') { downloadInventoryCsv(products, 'khetsetu-inventory-report.csv'); setNotice('Inventory report downloaded.'); return }
    setDialog({ mode: id })
  }
  const importFile = async file => {
    if (!file) return
    try {
      const additions = parseInventoryCsv(await file.text())
      if (!additions.length) throw new Error('The CSV has no products to import.')
      setProducts(current => [...additions, ...current])
      setPage(1)
      setNotice(`${additions.length} product${additions.length === 1 ? '' : 's'} imported.`)
    } catch (error) { setNotice(error.message) }
  }
  const pageNumbers = Array.from({ length: Math.min(5, pageCount) }, (_, index) => Math.max(1, Math.min(currentPage - 2, pageCount - 4)) + index)
  return <div className="min-w-0 bg-[#f2faff] p-4 sm:p-5 lg:p-6"><InventoryHero /><div className="mt-5 space-y-5"><InventoryStats stats={stats} /><div className="min-w-0 space-y-5"><section className="min-w-0 rounded-2xl border border-[#dce8ee] bg-white p-4 shadow-sm sm:p-5"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Package size={31} className="shrink-0 fill-emerald-700 text-emerald-800" /><div><h2 className="text-[20px] font-bold leading-tight text-[#17213b]">Product Inventory</h2><p className="text-[13px] text-[#677793]">View and manage all your products</p></div></div><button type="button" onClick={() => { downloadInventoryCsv(filtered); setNotice('Inventory exported.') }} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#d9e5ef] px-4 text-[13px] text-[#3d5072] hover:bg-emerald-50"><Download size={17} />Export</button></div><InventoryFilters query={query} category={category} status={status} onQuery={chooseQuery} onCategory={chooseCategory} onStatus={chooseStatus} onReset={reset} /><div className="mt-4"><InventoryTable products={visible} selected={selected} onSelect={(id, checked) => setSelected(current => checked ? [...new Set([...current, id])] : current.filter(value => value !== id))} onSelectAll={(items, checked) => setSelected(current => checked ? [...new Set([...current, ...items.map(item => item.id)])] : current.filter(id => !items.some(item => item.id === id)))} onEdit={product => setDialog({ mode: 'edit', product })} onDuplicate={duplicate} onDelete={remove} /></div>{selected.length > 0 && <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-[#eef9f3] px-3 py-2 text-xs text-emerald-900"><span>{selected.length} selected</span><button type="button" onClick={() => setSelected([])} className="font-semibold underline">Clear selection</button><button type="button" onClick={() => { setProducts(current => current.filter(item => !selected.includes(item.id))); setSelected([]); setNotice('Selected products removed from this inventory preview.') }} className="font-semibold text-red-700 underline">Delete selected</button></div>}<div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-[12px] text-[#566987]"><p>Showing {start} - {end} of {filtered.length} products</p><nav aria-label="Inventory pages" className="flex items-center gap-1"><button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page" className="grid size-9 place-items-center rounded-lg border border-[#dfe9f0] disabled:opacity-40"><ChevronLeft size={17} /></button>{pageNumbers.map(number => <button key={number} type="button" aria-current={number === currentPage ? 'page' : undefined} onClick={() => setPage(number)} className={`grid size-9 place-items-center rounded-lg border ${number === currentPage ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-[#dfe9f0] bg-white text-[#405372]'}`}>{number}</button>)}<button type="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} aria-label="Next page" className="grid size-9 place-items-center rounded-lg border border-[#dfe9f0] disabled:opacity-40"><ChevronRight size={17} /></button></nav><label><span className="sr-only">Products per page</span><select value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1) }} className="min-h-9 rounded-lg border border-[#dfe9f0] bg-white px-3 text-[12px]"><option value="8">8 per page</option><option value="10">10 per page</option><option value="20">20 per page</option></select></label></div></section><aside className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-5"><InventoryQuickActions onAction={action} /><InventoryKeyFeatures features={inventoryFeatures} /></aside></div></div><input ref={uploadRef} type="file" accept=".csv,text/csv" className="sr-only" onChange={event => { importFile(event.target.files?.[0]); event.target.value = '' }} />{dialog && <InventoryDialog key={`${dialog.mode}-${dialog.product?.id ?? ''}`} mode={dialog.mode} product={dialog.product} products={products} onClose={() => setDialog(null)} onSave={save} />}{notice && <div role="status" className="fixed bottom-4 right-4 z-[110] max-w-[min(90vw,400px)] rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss message" className="ml-3 text-lg">×</button></div>}</div>
}
