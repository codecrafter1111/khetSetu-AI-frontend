import { CloudSun, Droplets, Leaf, MapPin, Wind } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { cropWeather } from '../data/cropDoctor.mock'

export default function WeatherInfluence() {
  return <Card className="min-w-0 p-3 xl:min-h-[280px] xl:flex xl:flex-col xl:justify-between">
    <div className="flex flex-wrap items-center justify-between gap-1"><h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><CloudSun className="size-5 text-sky-500" />Weather Influence</h2><span className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin className="size-3" />{cropWeather.location}</span></div>
    <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 p-2"><CloudSun className="size-14 shrink-0 text-amber-400" /><div className="min-w-0 flex-1"><strong className="block text-2xl leading-tight text-slate-900">{cropWeather.temperature}</strong><p className="text-[11px] text-slate-500">{cropWeather.condition}</p></div><dl className="space-y-1 border-l border-slate-200 pl-2 text-[10px] text-slate-600"><div className="flex items-center gap-1"><Droplets className="size-3" /><dt>Humidity:</dt><dd>{cropWeather.humidity}</dd></div><div className="flex items-center gap-1"><CloudSun className="size-3" /><dt>Rain Chance:</dt><dd>{cropWeather.rainChance}</dd></div><div className="flex items-center gap-1"><Wind className="size-3" /><dt>Wind:</dt><dd>{cropWeather.wind}</dd></div></dl></div>
    <div className="mt-2 flex gap-2 rounded-xl bg-emerald-50 p-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100"><Leaf className="size-5 fill-emerald-600 text-emerald-700" /></span><p className="text-[11px] leading-snug text-slate-600"><strong className="block text-xs text-slate-900">Disease Risk: <span className="text-amber-700">{cropWeather.risk}</span></strong>{cropWeather.riskMessage}</p></div>
  </Card>
}
