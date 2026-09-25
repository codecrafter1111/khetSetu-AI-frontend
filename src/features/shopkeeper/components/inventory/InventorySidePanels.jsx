import { Bell, Boxes, CirclePlus, Download, FileText, IndianRupee, Package, RefreshCw, Star, Upload, Zap } from 'lucide-react'

const actionIcons = { add: CirclePlus, stock: FileText, upload: Upload, report: Download }
const actions = [
  { id: 'add', title: 'Add Product', detail: 'Add a new product to your inventory', tone: 'bg-gradient-to-r from-[#148b4b] to-[#238f53] text-white' },
  { id: 'stock', title: 'Update Stock', detail: 'Adjust stock quantity', tone: 'bg-[#f0f8fa] text-[#173556]' },
  { id: 'upload', title: 'Bulk Upload CSV', detail: 'Upload multiple products', tone: 'bg-[#f0f8fa] text-[#173556]' },
  { id: 'report', title: 'Download Inventory Report', detail: 'Get detailed inventory report', tone: 'bg-[#f0f8fa] text-[#173556]' },
]
const featureIcons = { tracking: Package, alerts: Bell, categories: Boxes, price: IndianRupee, batch: FileText, restock: RefreshCw }
const card = 'min-w-0 rounded-2xl border border-[#dce8ee] bg-white p-5 shadow-sm'

export function InventoryQuickActions({ onAction }) {
  return <section className={card}><h2 className="mb-4 flex items-center gap-3 text-[18px] font-bold text-[#17223e]"><Zap size={26} className="fill-emerald-700 text-emerald-700" />Quick Actions</h2><div className="space-y-3">{actions.map(action => { const Icon = actionIcons[action.id]; return <button key={action.id} type="button" onClick={() => onAction(action.id)} className={`flex min-h-[72px] w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:brightness-[.97] ${action.tone}`}><span className={`grid size-11 shrink-0 place-items-center rounded-full ${action.id === 'add' ? 'bg-white text-emerald-800' : 'bg-[#def5e9] text-emerald-800'}`}><Icon size={23} /></span><span className="min-w-0"><strong className="block text-[14px] leading-tight">{action.title}</strong><small className={`mt-1 block text-[11px] leading-tight ${action.id === 'add' ? 'text-white/90' : 'text-[#687891]'}`}>{action.detail}</small></span></button> })}</div></section>
}

export function InventoryKeyFeatures({ features }) {
  return <section className={card}><h2 className="mb-4 flex items-center gap-3 text-[18px] font-bold text-[#17223e]"><Star size={26} className="fill-emerald-700 text-emerald-700" />Key Features</h2><div className="space-y-2">{features.map(feature => { const Icon = featureIcons[feature.icon]; return <div key={feature.title} className="flex min-h-[64px] items-center gap-3 rounded-lg bg-[#f0f9f8] px-3 py-2"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#def5e9] text-emerald-800"><Icon size={21} /></span><span className="min-w-0"><strong className="block text-[13px] leading-tight text-[#17243e]">{feature.title}</strong><small className="mt-1 block text-[11px] leading-tight text-[#687891]">{feature.detail}</small></span></div> })}</div></section>
}
