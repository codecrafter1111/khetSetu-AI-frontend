import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../../config/routes'
import { farmerRoutes } from './FarmerRoutes'
import { deliveryRoutes } from './DeliveryRoutes'

export default function AppRouter() {
  return <Routes>{farmerRoutes}{deliveryRoutes}<Route path="*" element={<Navigate to={routes.farmer.dashboard} replace />} /></Routes>
}
