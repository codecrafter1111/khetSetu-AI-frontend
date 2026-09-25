import Card from '../../../../components/ui/Card'
import { storeStats } from '../data/agriStores.mock'

export default function AgriStoreStats() {
  return <section aria-label="Agri store highlights" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{storeStats.map(({ value, label, detail, icon: Icon }) => <Card key={label} className="flex min-w-0 items-center gap-4 p-4 xl:min-h-[110px]"><span className="grid size-[68px] shrink-0 place-items-center rounded-xl bg-emerald-50"><Icon className="size-8 fill-emerald-700/15 text-emerald-700" /></span><div className="min-w-0"><strong className="block text-xl font-bold leading-tight text-slate-950">{value}</strong><p className="text-sm font-medium text-slate-900">{label}</p><p className="mt-0.5 text-[11px] leading-tight text-slate-500">{detail}</p></div></Card>)}</section>
}
