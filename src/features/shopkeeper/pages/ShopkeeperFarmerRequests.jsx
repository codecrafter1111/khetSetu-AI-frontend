import { useEffect, useState } from 'react'
import { Leaf } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { farmerRequests, fulfilledRequests, requestFeatures, requestStats } from '../data/requests.mock'
import RequestStats from '../components/requests/RequestStats'
import FarmerRequestsList from '../components/requests/FarmerRequestsList'
import RequestDetails from '../components/requests/RequestDetails'
import { FulfilledRequests, PendingResponses, RequestKeyFeatures } from '../components/requests/RequestSummaryCards'
import QuotationDialog from '../components/requests/QuotationDialog'
import RespondDialog from '../components/RespondDialog'

function RequestsHero() {
  return <section className="relative isolate flex min-h-[150px] items-center overflow-hidden rounded-2xl bg-[url('/images/dashboard/farmer-hero.png')] bg-[length:160%_auto] bg-[position:left_62%] px-5 py-7 sm:min-h-[165px] sm:px-8"><div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-white/20" /><div className="relative z-10"><h1 className="flex items-center gap-2 text-[32px] font-extrabold leading-tight tracking-tight text-[#131c2d] sm:text-[40px]">Farmer Requests <Leaf size={27} className="fill-emerald-500 text-emerald-700" /></h1><p className="mt-1 max-w-[690px] text-[14px] leading-relaxed text-[#526587] sm:text-[16px]">Respond to crop-input needs and treatment-related requests from farmers.</p></div><p aria-hidden="true" className="absolute right-[23%] top-7 hidden -rotate-6 font-serif text-[19px] font-semibold italic leading-tight text-[#152039] 2xl:block">Bharat<br />Ka Kisan<br />Bharat Ki Shaan <Leaf size={34} className="inline fill-emerald-500 text-emerald-700" /></p><p aria-hidden="true" className="absolute right-5 top-7 hidden text-[14px] font-bold leading-tight text-[#133d2b] 2xl:block">Better<br />Farms<br />Brighter<br />Futures</p></section>
}

export default function ShopkeeperFarmerRequests() {
  const [params] = useSearchParams()
  const [requests, setRequests] = useState(farmerRequests)
  const [selectedId, setSelectedId] = useState('ramesh')
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [responding, setResponding] = useState(null)
  const [quoting, setQuoting] = useState(null)
  const [notice, setNotice] = useState('')
  const selected = [...requests, ...fulfilledRequests].find(request => request.id === selectedId) ?? null
  const source = status === 'Fulfilled' ? fulfilledRequests : status === 'all' ? requests : requests.filter(request => request.status === status)
  const visible = source.filter(request => (priority === 'all' || request.priority === priority) && `${request.name} ${request.crop} ${request.issue} ${request.product} ${request.location}`.toLowerCase().includes(query.trim().toLowerCase()))
  const pending = requests.filter(request => request.status === 'Pending')
  const respondedCount = requests.filter(request => request.status === 'Responded').length
  const respondedHighCount = requests.filter(request => request.status === 'Responded' && request.priority === 'High').length
  const stats = requestStats.map(stat => ({ ...stat, value: stat.label === 'Open Requests' ? String(24 - respondedCount) : stat.label === 'High Priority' ? String(7 - respondedHighCount) : stat.label === 'Responded Today' ? String(18 + respondedCount) : stat.value }))
  useEffect(() => {
    if (!responding && !quoting) return undefined
    const close = event => { if (event.key === 'Escape') { setResponding(null); setQuoting(null) } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [responding, quoting])
  const focusList = nextStatus => { setStatus(nextStatus); setPriority('all'); setQuery(''); document.getElementById('farmer-request-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const sendResponse = (request, response) => { setRequests(current => current.map(item => item.id === request.id ? { ...item, status: 'Responded', response } : item)); setResponding(null); setNotice(`Response to ${request.name} saved for this preview.`) }
  const sendQuote = (request, offer) => { setRequests(current => current.map(item => item.id === request.id ? { ...item, status: 'Responded', offer } : item)); setQuoting(null); setNotice(`Offer for ${request.name} saved for this preview.`) }
  const select = request => setSelectedId(request.id)
  const respond = request => { select(request); if (request.status !== 'Fulfilled') setResponding(request) }
  return <div className="min-w-0 bg-[#f2faff] p-4 sm:p-5 lg:p-6"><RequestsHero /><div className="mt-5 space-y-5"><RequestStats stats={stats} /><div className={`grid min-w-0 items-start gap-5 ${selected ? 'min-[1400px]:grid-cols-[minmax(0,1fr)_minmax(340px,390px)]' : ''}`}><div className="min-w-0 min-[1400px]:col-start-1 min-[1400px]:row-start-1"><FarmerRequestsList requests={visible} selectedId={selectedId} status={status} priority={priority} query={query} onStatus={setStatus} onPriority={setPriority} onQuery={setQuery} onSelect={select} onRespond={respond} /></div>{selected && <div className="min-w-0 min-[1400px]:col-start-2 min-[1400px]:row-span-2 min-[1400px]:row-start-1"><RequestDetails request={selected} onClose={() => setSelectedId(null)} onQuote={setQuoting} /></div>}<div className="grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-3 min-[1400px]:col-start-1 min-[1400px]:row-start-2"><PendingResponses requests={pending} onViewAll={() => focusList('Pending')} onSelect={select} /><FulfilledRequests requests={fulfilledRequests} onViewAll={() => focusList('Fulfilled')} onSelect={request => { setStatus('Fulfilled'); select(request) }} /><RequestKeyFeatures features={requestFeatures} /></div></div></div>{responding && <RespondDialog key={responding.id} request={responding} onClose={() => setResponding(null)} onSend={sendResponse} />}{quoting && <QuotationDialog key={quoting.id} request={quoting} onClose={() => setQuoting(null)} onSend={sendQuote} />}{notice && <div role="status" className="fixed bottom-4 right-4 z-[110] max-w-[min(90vw,400px)] rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss message" className="ml-3 text-lg">×</button></div>}</div>
}
