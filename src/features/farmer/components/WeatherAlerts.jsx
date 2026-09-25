import { CloudSun, Droplets, MapPin, TriangleAlert, Wind } from 'lucide-react'
import Card from '../../../components/ui/Card'
import SectionHeader from '../../../components/common/SectionHeader'

export default function WeatherAlerts() {
  return <Card className="h-full min-w-0 p-4 xl:flex xl:flex-col xl:justify-between">
    <div className="flex items-start justify-between gap-2"><SectionHeader icon={CloudSun} iconClass="text-sky-500" title="Weather & Alerts" /><span className="flex items-center gap-1 pt-1 text-[10px] whitespace-nowrap text-slate-500"><MapPin className="size-3" />Varanasi, Uttar Pradesh</span></div>
    <div className="mb-1 text-right text-[10px] font-semibold text-emerald-700">View Details →</div>
    <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl border border-slate-200 p-3"><div className="flex items-center gap-2"><CloudSun className="size-14 shrink-0 text-sky-500" /><div><strong className="text-3xl text-slate-950">32°C</strong><p className="text-xs whitespace-nowrap text-slate-500">Partly Cloudy</p></div></div><div className="border-l border-slate-200 pl-3 text-[10px] whitespace-nowrap text-slate-600"><p>H: 34°C · L: 24°C</p><p className="mt-1 flex items-center gap-1"><Droplets className="size-3" />Humidity: 62%</p><p className="mt-1 flex items-center gap-1"><Wind className="size-3" />Wind: 12 km/h</p><p className="mt-1">Mon, Apr 28, 2025</p></div></div>
    <div className="mt-3 flex min-h-[90px] gap-2 rounded-xl bg-red-50 p-3 text-red-700"><TriangleAlert className="size-5 shrink-0" /><div><p className="text-xs font-bold">Light rain is expected in the next 24 hours.</p><p className="mt-1 text-[10px] leading-tight text-slate-500">Good time for sowing summer crops. Ensure proper drainage in fields.</p></div></div>
  </Card>
}
