import { Navigate, Route } from 'react-router-dom'
import { routes } from '../../config/routes'
import ConsumerLayout from '../../features/consumer/layout/ConsumerLayout'
import ConsumerDashboard from '../../features/consumer/pages/ConsumerDashboard'
import ConsumerSection from '../../features/consumer/pages/ConsumerSection'
import { ProductsRoute } from '../../features/consumer/pages/ConsumerProducts'
import ConsumerProductDetail from '../../features/consumer/pages/ConsumerProductDetail'
import ConsumerCart from '../../features/consumer/pages/ConsumerCart'
import ConsumerPayment from '../../features/consumer/pages/ConsumerPayment'
import ConsumerFarmPassport from '../../features/consumer/pages/ConsumerFarmPassport'
import ConsumerOrders from '../../features/consumer/pages/ConsumerOrders'
import ConsumerProfilePage from '../../features/consumer/profile/pages/ConsumerProfilePage'
import ConsumerOrderDetails from '../../features/consumer/orders/pages/ConsumerOrderDetails'
import ConsumerTrackOrder from '../../features/consumer/orders/pages/ConsumerTrackOrder'

const sections = [
  ['subscriptions', 'Subscriptions'],
  ['wishlist', 'Wishlist'], ['reviews', 'Reviews'], ['notifications', 'Notifications'],
  ['profile/addresses', 'Manage Addresses'], ['profile/preferences', 'Preferences'], ['profile/security', 'Security'], ['profile/reviews', 'My Reviews'], ['help', 'Help'],
]

export const consumerRoutes = <Route path="/consumer" element={<ConsumerLayout />}>
  <Route index element={<Navigate to={routes.consumer.dashboard} replace />} />
  <Route path="dashboard" element={<ConsumerDashboard />} />
  <Route path="products" element={<ProductsRoute />} />
  <Route path="products/:slug" element={<ConsumerProductDetail />} />
  <Route path="cart" element={<ConsumerCart />} />
  <Route path="checkout/payment" element={<ConsumerPayment />} />
  <Route path="farm-passport" element={<ConsumerFarmPassport />} />
  <Route path="orders" element={<ConsumerOrders />} />
  <Route path="orders/:orderId" element={<ConsumerOrderDetails />} />
  <Route path="orders/:orderId/track" element={<ConsumerTrackOrder />} />
  <Route path="profile" element={<ConsumerProfilePage />} />
  {sections.map(([path, title]) => <Route key={path} path={path} element={<ConsumerSection title={title} />} />)}
</Route>
