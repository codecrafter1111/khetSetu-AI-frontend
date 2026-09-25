import { Navigate, Route } from 'react-router-dom'
import { routes } from '../../config/routes'
import FarmerLayout from '../../features/farmer/layout/FarmerLayout'
import FarmerDashboard from '../../features/farmer/pages/FarmerDashboard'
import FarmerProducts from '../../features/farmer/pages/FarmerProducts'
import FarmerOrders from '../../features/farmer/pages/FarmerOrders'
import FarmerCropDoctor from '../../features/farmer/pages/FarmerCropDoctor'
import FarmerMyFarm from '../../features/farmer/pages/FarmerMyFarm'
import FarmerPriceInsights from '../../features/farmer/pages/FarmerPriceInsights'
import FarmerAgriStores from '../../features/farmer/pages/FarmerAgriStores'
import FarmerProductDetails from '../../features/farmer/pages/FarmerProductDetails'
import FarmerAddProduct from '../../features/farmer/pages/FarmerAddProduct'

export const farmerRoutes = <Route path="/farmer" element={<FarmerLayout />}>
  <Route index element={<Navigate to={routes.farmer.dashboard} replace />} />
  <Route path="dashboard" element={<FarmerDashboard />} />
  <Route path="farm" element={<FarmerMyFarm />} />
  <Route path="products" element={<FarmerProducts />} />
  <Route path="products/new" element={<FarmerAddProduct />} />
  <Route path="products/:productId" element={<FarmerProductDetails />} />
  <Route path="orders" element={<FarmerOrders />} />
  <Route path="crop-doctor" element={<FarmerCropDoctor />} />
  <Route path="price-insights" element={<FarmerPriceInsights />} />
  <Route path="agri-stores" element={<FarmerAgriStores />} />
</Route>
