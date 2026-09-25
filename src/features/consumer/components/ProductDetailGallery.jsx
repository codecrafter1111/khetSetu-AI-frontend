import { ChevronLeft, ChevronRight, Leaf, Play } from 'lucide-react'
import { useState } from 'react'
import ProduceImage from './ProduceImage'

const views = [
  { label: 'A2 Cow Ghee jar', kind: 'main' },
  { label: 'Pure ghee close-up', kind: 'tile', tile: 6 },
  { label: 'Ghee jar close-up', kind: 'close' },
  { label: 'Desi cows at the farm', kind: 'farm' },
]

export default function ProductDetailGallery() {
  const [active, setActive] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  const change = step => setActive(current => (current + step + views.length) % views.length)
  const view = views[active]
  return <div className="min-w-0"><div className="relative h-[405px] overflow-hidden rounded-xl bg-[#f4f4e9] sm:h-[435px] xl:h-[405px]">
    {view.kind === 'main' || view.kind === 'close' ? <img src="/images/consumer/a2-cow-ghee.png" alt={view.label} className={`size-full object-cover ${view.kind === 'close' ? 'scale-125' : ''}`} /> : view.kind === 'farm' ? <img src="/images/consumer/desi-cows.png" alt={view.label} className="size-full object-cover" /> : <ProduceImage tile={view.tile} alt={view.label} className="size-full" />}
    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-50/95 px-3 py-1.5 text-xs font-medium text-emerald-900"><Leaf size={15} />Pure & Natural</span>
    <button type="button" aria-label="Previous product image" onClick={() => change(-1)} className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-emerald-900 shadow"><ChevronLeft size={20} /></button>
    <button type="button" aria-label="Next product image" onClick={() => change(1)} className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-emerald-900 shadow"><ChevronRight size={20} /></button>
  </div><div className="mt-2.5 grid grid-cols-5 gap-2">{views.map((item, index) => <button type="button" key={item.label} aria-label={`Show ${item.label}`} aria-pressed={active === index} onClick={() => setActive(index)} className={`h-[76px] overflow-hidden rounded-lg border-2 ${active === index ? 'border-emerald-700' : 'border-transparent'}`}>{item.kind === 'main' || item.kind === 'close' ? <img src="/images/consumer/a2-cow-ghee.png" alt="" className={`size-full object-cover ${item.kind === 'close' ? 'scale-125' : ''}`} /> : item.kind === 'farm' ? <img src="/images/consumer/desi-cows.png" alt="" className="size-full object-cover" /> : <ProduceImage tile={item.tile} alt={item.label} className="size-full" />}</button>)}<button type="button" aria-label="Product video preview" onClick={() => setVideoOpen(true)} className="relative h-[76px] overflow-hidden rounded-lg"><img src="/images/consumer/desi-cows.png" alt="" className="size-full object-cover brightness-75" /><Play size={22} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-white text-white" /><span className="absolute inset-x-0 bottom-0 bg-black/50 py-0.5 text-[10px] text-white">Watch Video</span></button></div>{videoOpen && <div role="dialog" aria-modal="true" aria-label="Product video" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4"><div className="w-full max-w-lg rounded-xl bg-white p-4"><img src="/images/consumer/desi-cows.png" alt="Desi cows on a farm" className="w-full rounded-lg" /><p className="mt-3 text-sm text-slate-700">The farm video will be available soon.</p><button type="button" onClick={() => setVideoOpen(false)} className="mt-3 rounded-lg bg-emerald-700 px-4 py-2 text-sm text-white">Close</button></div></div>}</div>
}
