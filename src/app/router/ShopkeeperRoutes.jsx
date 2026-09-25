import { Navigate, Route } from 'react-router-dom'
import { routes } from '../../config/routes'
import ShopkeeperLayout from '../../features/shopkeeper/layout/ShopkeeperLayout'
import ShopkeeperDashboard from '../../features/shopkeeper/pages/ShopkeeperDashboard'
import ShopkeeperMyStore from '../../features/shopkeeper/pages/ShopkeeperMyStore'
import ShopkeeperInventory from '../../features/shopkeeper/pages/ShopkeeperInventory'
import ShopkeeperFarmerRequests from '../../features/shopkeeper/pages/ShopkeeperFarmerRequests'
import ShopkeeperSection from '../../features/shopkeeper/pages/ShopkeeperSection'

const sections = [
  ['nearby-farmers', 'Nearby Farmers'],
  ['sales', 'Sales'], ['notifications', 'Notifications'], ['profile', 'Profile'], ['help', 'Help'],
]

export const shopkeeperRoutes = <Route path="/shopkeeper" element={<ShopkeeperLayout />}>
  <Route index element={<Navigate to={routes.shopkeeper.dashboard} replace />} />
  <Route path="dashboard" element={<ShopkeeperDashboard />} />
  <Route path="my-store" element={<ShopkeeperMyStore />} />
  <Route path="inventory" element={<ShopkeeperInventory />} />
  <Route path="inventory/new" element={<ShopkeeperInventory />} />
  <Route path="farmer-requests" element={<ShopkeeperFarmerRequests />} />
  <Route path="requests" element={<Navigate to={routes.shopkeeper.requests} replace />} />
  <Route path="store" element={<Navigate to={routes.shopkeeper.store} replace />} />
  {sections.map(([path, title]) => <Route key={path} path={path} element={<ShopkeeperSection title={title} />} />)}
</Route>
