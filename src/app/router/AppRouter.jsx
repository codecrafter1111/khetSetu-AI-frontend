import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../../config/routes'
import { authRoutes } from './AuthRoutes'
import { consumerRoutes } from './ConsumerRoutes'
import { deliveryRoutes } from './DeliveryRoutes'
import { farmerRoutes } from './FarmerRoutes'
import { shopkeeperRoutes } from './ShopkeeperRoutes'

export default function AppRouter() {
  return (
    <Routes>
      {authRoutes}
      {farmerRoutes}
      {consumerRoutes}
      {deliveryRoutes}
      {shopkeeperRoutes}
      <Route path="*" element={<Navigate to={routes.auth.login} replace />} />
    </Routes>
  )
}
