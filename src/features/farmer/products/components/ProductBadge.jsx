const categoryTones = {
  Grains: 'bg-amber-50 text-amber-700',
  Processed: 'bg-red-50 text-red-700',
  Dairy: 'bg-sky-100 text-sky-700',
  Pulses: 'bg-violet-100 text-violet-700',
  Oilseeds: 'bg-green-100 text-green-700',
  Vegetables: 'bg-green-100 text-green-700',
  Spices: 'bg-orange-100 text-orange-700',
}

const stock = {
  in_stock: ['In Stock', 'bg-emerald-100 text-emerald-800'],
  low_stock: ['Low Stock', 'bg-orange-100 text-orange-700'],
  out_of_stock: ['Out of Stock', 'bg-red-100 text-red-700'],
}

export default function ProductBadge({ kind, value }) {
  let label = value
  let tone = categoryTones[value] || 'bg-slate-100 text-slate-700'
  if (kind === 'stock') [label, tone] = stock[value] || [value, tone]
  if (kind === 'listing') {
    label = value === 'active' ? 'Active' : 'Inactive'
    tone = value === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
  }
  return <span className={`inline-flex min-w-[58px] items-center justify-center rounded-lg px-2 py-1 text-[10px] font-medium whitespace-nowrap ${tone}`}>{label}</span>
}
