const tones = { green: 'bg-emerald-100 text-emerald-700', blue: 'bg-sky-100 text-sky-700', orange: 'bg-orange-100 text-orange-700', red: 'bg-red-100 text-red-700' }
export default function Badge({ children, tone = 'green' }) { return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>{children}</span> }
