import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../../config/routes'
import { farmerRoutes } from './FarmerRoutes'
import { consumerRoutes } from './ConsumerRoutes'

export default function AppRouter() {
  return <Routes>{farmerRoutes}{consumerRoutes}<Route path="*" element={<Navigate to={routes.farmer.dashboard} replace />} /></Routes>
}
