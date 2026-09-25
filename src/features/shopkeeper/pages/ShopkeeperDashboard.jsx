import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dashboardStats, farmerRequests, inventoryItems, notifications, salesByMonth, topProducts } from '../data/dashboard.mock'
import { FarmerRequestsTable, InventoryHighlights, ShopkeeperHero, ShopkeeperStatCard } from '../components/DashboardPrimary'
import { NearbyFarmers, SalesOverview, TopProducts } from '../components/DashboardInsights'
import { KeyFeaturesPanel, NotificationsPanel, QuickActions } from '../components/DashboardSidePanels'
import RespondDialog from '../components/RespondDialog'

export default function ShopkeeperDashboard() {
  const [params] = useSearchParams()
  const search = (params.get('q') ?? '').toLowerCase()
  const [period, setPeriod] = useState('month')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [notice, setNotice] = useState('')
  const [readIds, setReadIds] = useState([])
  const visibleRequests = farmerRequests.filter(item => `${item.name} ${item.crop} ${item.issue} ${item.product}`.toLowerCase().includes(search))
  const visibleProducts = topProducts.filter(item => `${item.name} ${item.size}`.toLowerCase().includes(search))
  return <div className="min-w-0 bg-[#f2faff]"><ShopkeeperHero /><div className="space-y-3 px-3 pb-6 pt-0 sm:px-4"><div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">{dashboardStats.map(stat => <ShopkeeperStatCard key={stat.label} stat={stat} />)}</div><div className="grid min-w-0 gap-2.5 xl:grid-cols-[minmax(0,1fr)_minmax(285px,328px)]"><div className="min-w-0 space-y-2.5"><div className="grid min-w-0 gap-2.5 lg:grid-cols-[minmax(0,2.05fr)_minmax(250px,1fr)]"><FarmerRequestsTable requests={visibleRequests} onRespond={setSelectedRequest} /><InventoryHighlights items={inventoryItems} /></div><div className="grid min-w-0 gap-2.5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.95fr)]"><SalesOverview sales={salesByMonth} period={period} onPeriod={setPeriod} /><NearbyFarmers /></div><TopProducts products={visibleProducts} /></div><aside className="min-w-0 space-y-2.5"><QuickActions /><NotificationsPanel notifications={notifications} readIds={readIds} onRead={id => setReadIds(current => current.includes(id) ? current : [...current, id])} /><KeyFeaturesPanel /></aside></div></div>{selectedRequest && <RespondDialog key={selectedRequest.id} request={selectedRequest} onClose={() => setSelectedRequest(null)} onSend={request => { setSelectedRequest(null); setNotice(`Response to ${request.name} saved for this preview.`) }} />}{notice && <div role="status" className="fixed bottom-4 right-4 z-[90] rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white shadow-xl">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss message" className="ml-4 text-lg">×</button></div>}</div>
}
