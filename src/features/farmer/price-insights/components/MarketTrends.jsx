import { useMemo, useState } from 'react'
import { ChartNoAxesCombined } from 'lucide-react'
import Card from '../../../../components/ui/Card'
import { chartMonths, chartSeries } from '../data/priceInsights.mock'

const format = value => value.toLocaleString('en-IN')

export default function MarketTrends() {
  const [crop, setCrop] = useState('Wheat')
  const [period, setPeriod] = useState('6')
  const chart = useMemo(() => {
    const values = period === '3' ? chartSeries[crop].slice(-3) : chartSeries[crop]
    const months = period === '3' ? chartMonths.slice(-3) : chartMonths
    const ceiling = Math.max(3000, Math.ceil((Math.max(...values) + 250) / 1000) * 1000)
    const floor = ceiling > 4000 ? Math.floor((Math.min(...values) - 500) / 1000) * 1000 : 1000
    const x = index => 82 + index * (624 / (values.length - 1))
    const y = value => 151 - ((value - floor) / (ceiling - floor)) * 120
    const points = values.map((value, index) => ({ x: x(index), y: y(value), value, month: months[index] }))
    return { points, floor, ceiling, line: points.map((p, index) => `${index ? 'L' : 'M'} ${p.x} ${p.y}`).join(' '), area: `M ${points[0].x} 151 ${points.map(p => `L ${p.x} ${p.y}`).join(' ')} L ${points.at(-1).x} 151 Z` }
  }, [crop, period])
  const ticks = Array.from({ length: 5 }, (_, index) => chart.floor + ((chart.ceiling - chart.floor) * index / 4))
  return <Card className="min-w-0 p-4 xl:min-h-[285px] xl:flex xl:flex-col xl:justify-between"><div className="flex flex-wrap items-start justify-between gap-2"><div><h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><ChartNoAxesCombined className="size-7 text-emerald-700" />Market Trends</h2><p className="ml-9 text-xs text-slate-500">Track price trends of key crops in major markets over the last 6 months.</p></div><div className="flex gap-2"><select aria-label="Choose crop" value={crop} onChange={event => setCrop(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-900">{Object.keys(chartSeries).map(name => <option key={name}>{name}</option>)}</select><select aria-label="Choose time period" value={period} onChange={event => setPeriod(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-900"><option value="6">Last 6 Months</option><option value="3">Last 3 Months</option></select></div></div><div className="mt-3 w-full overflow-x-auto"><svg viewBox="0 0 760 177" role="img" aria-label={`${crop} price trend over the last ${period} months`} className="h-[185px] w-full min-w-[600px]"><defs><linearGradient id="price-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#16a34a" stopOpacity="0.11" /><stop offset="1" stopColor="#16a34a" stopOpacity="0.01" /></linearGradient></defs>{ticks.map(value => { const y = 151 - ((value - chart.floor) / (chart.ceiling - chart.floor)) * 120; return <g key={value}><line x1="82" x2="706" y1={y} y2={y} stroke="#e2e8f0" /><text x="66" y={y + 4} textAnchor="end" fill="#475569" fontSize="11">{format(value)}</text></g> })}{chart.points.map(point => <line key={point.month} x1={point.x} x2={point.x} y1="31" y2="151" stroke="#edf2f7" strokeDasharray="2 2" />)}<path d={chart.area} fill="url(#price-chart-fill)" /><path d={chart.line} fill="none" stroke="#07883e" strokeWidth="2" />{chart.points.map(point => <g key={point.month}><circle cx={point.x} cy={point.y} r="4" fill="#0a8c42" /><text x={point.x} y={point.y - 12} textAnchor="middle" fill="#0f172a" fontWeight="700" fontSize="11">{format(point.value)}</text><text x={point.x} y="170" textAnchor="middle" fill="#475569" fontSize="11">{point.month}</text></g>)}<text x="16" y="95" transform="rotate(-90 16 95)" textAnchor="middle" fill="#475569" fontSize="11">Price (₹ / quintal)</text></svg></div></Card>
}
