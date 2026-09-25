import { BarChart3, Bell, CircleHelp, Grid2X2, MapPin, Package, Store, UserRound, UsersRound } from 'lucide-react'
import { routes } from '../../../config/routes'

export const shopkeeperNavigation = [
  { label: 'Dashboard', to: routes.shopkeeper.dashboard, icon: Grid2X2 },
  { label: 'My Store', to: routes.shopkeeper.store, icon: Store },
  { label: 'Inventory', to: routes.shopkeeper.inventory, icon: Package },
  { label: 'Farmer Requests', to: routes.shopkeeper.requests, icon: UsersRound },
  { label: 'Nearby Farmers', to: routes.shopkeeper.nearbyFarmers, icon: MapPin },
  { label: 'Sales', to: routes.shopkeeper.sales, icon: BarChart3 },
  { label: 'Notifications', to: routes.shopkeeper.notifications, icon: Bell, badge: 6 },
  { label: 'Profile', to: routes.shopkeeper.profile, icon: UserRound },
  { label: 'Help', to: routes.shopkeeper.help, icon: CircleHelp },
]
