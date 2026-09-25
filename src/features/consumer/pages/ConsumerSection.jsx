import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { routes } from '../../../config/routes'

export default function ConsumerSection({ title }) {
  return <div className="p-4 md:p-6"><div className="min-h-[65vh] rounded-xl border border-slate-200 bg-white p-6"><Link to={routes.consumer.dashboard} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline"><ArrowLeft size={16} /> Back to dashboard</Link><h1 className="mt-7 text-3xl font-bold text-slate-950">{title}</h1><p className="mt-2 text-slate-600">This section is ready for its page content.</p></div></div>
}
