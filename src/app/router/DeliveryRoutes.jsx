import { Navigate, Route } from 'react-router-dom'
import { routes } from '../../config/routes'
import DeliveryLayout from '../../features/delivery/layout/DeliveryLayout'
import DeliveryDashboard from '../../features/delivery/pages/DeliveryDashboard'
import MyDeliveries from '../../features/delivery/pages/MyDeliveries'
import DeliveryRouteMap from '../../features/delivery/pages/DeliveryRouteMap'
import DeliveryEarnings from '../../features/delivery/pages/DeliveryEarnings'
import DeliveryHistory from '../../features/delivery/pages/DeliveryHistory'

export const deliveryRoutes = <Route path="/delivery" element={<DeliveryLayout />}>
  <Route index element={<Navigate to={routes.delivery.dashboard} replace />} />
  <Route path="dashboard" element={<DeliveryDashboard />} />
  <Route path="deliveries" element={<MyDeliveries />} />
  <Route path="route-map" element={<DeliveryRouteMap />} />
  <Route path="earnings" element={<DeliveryEarnings />} />
  <Route path="history" element={<DeliveryHistory />} />
</Route>
