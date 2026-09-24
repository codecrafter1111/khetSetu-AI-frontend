import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../../config/routes'
import { farmerRoutes } from './FarmerRoutes'

export default function AppRouter() {
  return <Routes>{farmerRoutes}<Route path="*" element={<Navigate to={routes.farmer.dashboard} replace />} /></Routes>
}
