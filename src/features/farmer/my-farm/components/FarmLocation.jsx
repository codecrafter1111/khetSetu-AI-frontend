import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { farmLocation } from '../data/myFarm.mock'

export default function FarmLocation() {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Bhadani%2C%20Chandauli%2C%20Varanasi%2C%20Uttar%20Pradesh%20221109'
  return <Card className="min-w-0 p-3 xl:min-h-[235px] xl:flex xl:flex-col xl:justify-between">
    <div className="flex items-center justify-between gap-2 px-1"><h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><MapPin className="size-6 fill-emerald-700 text-emerald-700" />Farm Location</h2><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800">View on Map <ArrowRight className="size-4" /></a></div>
    <div className="mt-2 grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1.55fr)_minmax(150px,0.8fr)]"><div className="relative h-[170px] overflow-hidden rounded-lg bg-[url('/images/my-farm/farm-satellite.png')] bg-cover bg-center" role="img" aria-label="Satellite-style preview of the farm location"><div className="absolute left-[30%] top-[12%] h-[76%] w-[37%] rotate-[11deg] border-2 border-dashed border-white bg-emerald-600/20 shadow-[0_0_0_2px_rgba(22,101,52,.5)]" /><MapPin className="absolute left-[47%] top-[38%] size-7 fill-red-600 text-white drop-shadow" /><span className="absolute bottom-1 left-1 text-[9px] text-white drop-shadow">Farm location preview</span></div><div className="flex flex-col justify-between gap-2"><dl className="space-y-0.5 text-[11px] text-slate-600">{Object.entries(farmLocation).map(([key, value]) => <div key={key} className="flex gap-1"><MapPin className="mt-0.5 size-3 shrink-0" /><dt className="capitalize">{key === 'pin' ? 'PIN Code' : key}:</dt><dd>{value}</dd></div>)}</dl><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-800">Open in Maps <ExternalLink className="size-3.5" /></a></div></div>
  </Card>
}
