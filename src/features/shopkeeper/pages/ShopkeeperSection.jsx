import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config/routes'
import { farmerRequests, inventoryItems, notifications, salesByMonth, topProducts } from '../data/dashboard.mock'
import { FarmerRequestsTable, InventoryHighlights } from '../components/DashboardPrimary'
import { NearbyFarmers, SalesOverview, TopProducts } from '../components/DashboardInsights'
import { NotificationsPanel } from '../components/DashboardSidePanels'
import RespondDialog from '../components/RespondDialog'

export default function ShopkeeperSection({ title }) {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [period, setPeriod] = useState('month')
  const [readIds, setReadIds] = useState([])
  const [notice, setNotice] = useState('')
  return <div className="min-h-[calc(100vh-72px)] bg-[#f2faff] p-4 md:p-6"><Link to={routes.shopkeeper.dashboard} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline"><ArrowLeft size={17} />Back to Dashboard</Link><h1 className="mb-4 mt-3 text-3xl font-extrabold text-[#15213d]">{title}</h1><div className="max-w-[1050px]">{title === 'Farmer Requests' ? <FarmerRequestsTable requests={farmerRequests} onRespond={setSelectedRequest} /> : title === 'Inventory' || title === 'Add Product' ? <div className="space-y-3"><InventoryHighlights items={inventoryItems} /><TopProducts products={topProducts} /></div> : title === 'Nearby Farmers' ? <NearbyFarmers /> : title === 'Sales' ? <SalesOverview sales={salesByMonth} period={period} onPeriod={setPeriod} /> : title === 'Notifications' ? <NotificationsPanel notifications={notifications} readIds={readIds} onRead={id => setReadIds(current => current.includes(id) ? current : [...current, id])} /> : <div className="rounded-xl border border-[#dbe8ef] bg-white p-6 text-sm text-slate-600">{title} content is being prepared. Return to the dashboard to manage your store.</div>}</div>{selectedRequest && <RespondDialog key={selectedRequest.id} request={selectedRequest} onClose={() => setSelectedRequest(null)} onSend={request => { setSelectedRequest(null); setNotice(`Response to ${request.name} saved for this preview.`) }} />}{notice && <div role="status" className="fixed bottom-4 right-4 z-[90] rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl">{notice}</div>}</div>
}
