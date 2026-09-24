import { Navigate, Route } from 'react-router-dom'
import { routes } from '../../config/routes'
import FarmerLayout from '../../features/farmer/layout/FarmerLayout'
import FarmerDashboard from '../../features/farmer/pages/FarmerDashboard'

export const farmerRoutes = <Route path="/farmer" element={<FarmerLayout />}>
  <Route index element={<Navigate to={routes.farmer.dashboard} replace />} />
  <Route path="dashboard" element={<FarmerDashboard />} />
</Route>
