import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../../config/routes'
import { authRoutes } from './AuthRoutes'
import { consumerRoutes } from './ConsumerRoutes'
import { deliveryRoutes } from './DeliveryRoutes'
import { shopkeeperRoutes } from './ShopkeeperRoutes'

export default function AppRouter() {
  return <Routes>{farmerRoutes}{consumerRoutes}{deliveryRoutes}{shopkeeperRoutes}<Route path="*" element={<Navigate to={routes.farmer.dashboard} replace />} /></Routes>
import { farmerRoutes } from './FarmerRoutes'

export default function AppRouter() {
  return (
    <Routes>
      {authRoutes}
      {farmerRoutes}
      {consumerRoutes}
      {deliveryRoutes}
      <Route path="*" element={<Navigate to={routes.auth.login} replace />} />
    </Routes>
  )
}
