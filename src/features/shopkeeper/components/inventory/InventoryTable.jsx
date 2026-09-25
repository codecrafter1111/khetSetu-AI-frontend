import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical, Pencil, Wrench } from 'lucide-react'
import { ShopkeeperProductImage } from '../ShopkeeperImage'
import { stockStatus } from '../../data/inventory.mock'

const statusMeta = {
  in: { label: 'In Stock', className: 'bg-[#e2f9eb] text-[#136b3d]' },
  low: { label: 'Low Stock', className: 'bg-[#fff3d9] text-[#b9700b]' },
  out: { label: 'Out of Stock', className: 'bg-[#ffe7e8] text-[#bf333c]' },
}
const money = value => `₹ ${Number(value).toLocaleString('en-IN')}`

function ProductPicture({ product }) {
  return product.id === 'tools' || product.name === 'Farm Tools Kit'
    ? <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-[#edf7e9] text-emerald-800"><Wrench size={27} /></span>
    : <ShopkeeperProductImage tile={product.tile} name={product.name} className="size-12 rounded-lg border border-[#eaf0f3]" />
}

function ProductActions({ product, onEdit, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)
  const [position, setPosition] = useState(null)
  const toggle = () => {
    if (open) { setOpen(false); return }
    const rect = menuButton.current.getBoundingClientRect()
    setPosition({ left: Math.max(8, rect.right - 144), top: rect.bottom + 4 > window.innerHeight - 88 ? rect.top - 84 : rect.bottom + 4 })
    setOpen(true)
  }
  return <div className="flex items-center gap-1"><button type="button" aria-label={`Edit ${product.name}`} onClick={() => onEdit(product)} className="grid size-9 place-items-center rounded-lg border border-[#dde8f0] text-[#25385b] hover:bg-emerald-50"><Pencil size={16} /></button><button ref={menuButton} type="button" aria-label={`More actions for ${product.name}`} aria-expanded={open} onClick={toggle} className="grid size-9 place-items-center rounded-lg text-[#25385b] hover:bg-emerald-50"><MoreVertical size={18} /></button>{open && createPortal(<><button type="button" aria-label="Close product actions" onClick={() => setOpen(false)} className="fixed inset-0 z-[80] cursor-default" /><div style={position} className="fixed z-[81] w-36 rounded-lg border border-[#dbe7ee] bg-white p-1 text-left shadow-xl"><button type="button" onClick={() => { onDuplicate(product); setOpen(false) }} className="block w-full rounded px-3 py-2 text-left text-xs hover:bg-emerald-50">Duplicate</button><button type="button" onClick={() => { onDelete(product.id); setOpen(false) }} className="block w-full rounded px-3 py-2 text-left text-xs text-red-700 hover:bg-red-50">Delete</button></div></>, document.body)}</div>
}

export default function InventoryTable({ products, selected, onSelect, onSelectAll, onEdit, onDuplicate, onDelete }) {
  const allSelected = products.length > 0 && products.every(product => selected.includes(product.id))
  return <><div className="hidden min-w-0 overflow-x-auto rounded-xl border border-[#e3edf2] md:block"><table className="w-full min-w-[740px] border-collapse text-left text-[12px] text-[#253657]"><thead className="bg-[#f2f8fc] text-[11px] font-medium text-[#465877]"><tr><th className="w-9 p-2"><input type="checkbox" aria-label="Select all visible products" checked={allSelected} onChange={event => onSelectAll(products, event.target.checked)} /></th><th className="min-w-[160px] px-2 py-3 font-medium">Product</th><th className="px-2 py-3 font-medium">Category</th><th className="px-2 py-3 font-medium">SKU</th><th className="px-2 py-3 font-medium">Stock Qty</th><th className="px-2 py-3 font-medium">Unit Price (₹)</th><th className="px-2 py-3 font-medium">Supplier / Brand</th><th className="px-2 py-3 font-medium">Status</th><th className="px-2 py-3 font-medium">Actions</th></tr></thead><tbody>{products.map(product => { const status = statusMeta[stockStatus(product)]; return <tr key={product.id} className="border-t border-[#e6edf3] hover:bg-[#fbfefd]"><td className="p-2"><input type="checkbox" aria-label={`Select ${product.name}`} checked={selected.includes(product.id)} onChange={event => onSelect(product.id, event.target.checked)} /></td><td className="px-2 py-2"><div className="flex min-w-[150px] items-center gap-2"><ProductPicture product={product} /><span className="min-w-0"><strong className="block font-semibold leading-tight text-[#17243f]">{product.name}</strong><small className="mt-1 block text-[11px] text-[#6b7a96]">{product.pack}</small></span></div></td><td className="px-2 py-2">{product.category}</td><td className="px-2 py-2 whitespace-nowrap">{product.sku}</td><td className={`px-2 py-2 text-center ${product.stock === 0 ? 'font-semibold text-red-600' : ''}`}>{product.stock}</td><td className="px-2 py-2 whitespace-nowrap">{money(product.price)}</td><td className="px-2 py-2">{product.supplier}</td><td className="px-2 py-2"><span className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1.5 font-medium ${status.className}`}>{status.label}</span></td><td className="px-2 py-2"><ProductActions product={product} onEdit={onEdit} onDuplicate={onDuplicate} onDelete={onDelete} /></td></tr> })}</tbody></table></div><div className="grid gap-3 md:hidden">{products.map(product => { const status = statusMeta[stockStatus(product)]; return <article key={product.id} className="rounded-xl border border-[#e3edf2] bg-white p-4"><div className="flex items-start gap-3"><input type="checkbox" aria-label={`Select ${product.name}`} checked={selected.includes(product.id)} onChange={event => onSelect(product.id, event.target.checked)} className="mt-4" /><ProductPicture product={product} /><div className="min-w-0 flex-1"><h3 className="font-semibold leading-tight text-[#17243f]">{product.name}</h3><p className="mt-1 text-xs text-[#6b7a96]">{product.pack} · {product.sku}</p></div></div><div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs"><p><span className="text-[#697b98]">Category</span><strong className="block text-[#233654]">{product.category}</strong></p><p><span className="text-[#697b98]">Supplier</span><strong className="block text-[#233654]">{product.supplier}</strong></p><p><span className="text-[#697b98]">Stock</span><strong className="block text-[#233654]">{product.stock}</strong></p><p><span className="text-[#697b98]">Unit price</span><strong className="block text-[#233654]">{money(product.price)}</strong></p></div><div className="mt-4 flex items-center justify-between border-t border-[#e9eff3] pt-3"><span className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${status.className}`}>{status.label}</span><ProductActions product={product} onEdit={onEdit} onDuplicate={onDuplicate} onDelete={onDelete} /></div></article> })}</div>{products.length === 0 && <p className="rounded-xl border border-dashed border-[#dce7ee] py-12 text-center text-sm text-[#647491]">No products match these filters.</p>}</>
}
