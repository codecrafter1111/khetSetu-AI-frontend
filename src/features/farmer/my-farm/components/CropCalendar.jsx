import { useState } from 'react'
import { ArrowRight, CalendarDays } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import ProductImage from '../../products/components/ProductImage'
import { seasonalCrops, seasons } from '../data/myFarm.mock'

const statusClass = { Planned: 'bg-emerald-100 text-emerald-900', 'In Progress': 'bg-blue-100 text-blue-700', Upcoming: 'bg-slate-100 text-slate-600' }

export default function CropCalendar() {
  const [season, setSeason] = useState('kharif')
  return <Card className="min-w-0 p-3 xl:min-h-[340px] xl:flex xl:flex-col xl:justify-between">
    <div className="flex items-center justify-between gap-2 px-1"><h2 className="flex items-center gap-2 text-base font-bold text-slate-900"><CalendarDays className="size-6 fill-emerald-700 text-emerald-700" />Crop Calendar (Seasonal Plan)</h2><span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800">View Full Calendar <ArrowRight className="size-4" /></span></div>
    <div role="tablist" aria-label="Crop season" className="mt-4 grid grid-cols-3 gap-1">{seasons.map(item => <button key={item.id} type="button" role="tab" aria-selected={season === item.id} onClick={() => setSeason(item.id)} className={`relative rounded-lg border px-1 py-1.5 text-center text-xs leading-tight ${season === item.id ? 'border-emerald-700 bg-emerald-700 text-white after:absolute after:-bottom-1.5 after:left-1/2 after:size-2 after:-translate-x-1/2 after:rotate-45 after:bg-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}><strong className="block">{item.name}</strong><span>{item.months}</span></button>)}</div>
    <div role="tabpanel" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{seasonalCrops[season].map(crop => <article key={crop.name} className="min-w-0 min-h-[180px] rounded-xl border border-slate-200 p-2.5"><ProductImage product={{ name: crop.name, image: crop.image }} className="h-[65px] w-[70px] max-w-full" /><h3 className="mt-1 text-xs font-semibold text-slate-900">{crop.name}</h3><p className="mt-0.5 text-xs text-slate-500">{crop.period}</p><span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${statusClass[crop.status]}`}>{crop.status}</span></article>)}</div>
  </Card>
}
