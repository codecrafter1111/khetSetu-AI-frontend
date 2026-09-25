import { Bell, CalendarDays, CircleHelp, Heart, House, Leaf, Package, ShoppingCart, UserRound } from 'lucide-react'
import { routes } from '../../../config/routes'

export const consumerNavigation = [
  { label: 'Home', to: routes.consumer.dashboard, icon: House },
  { label: 'Shop Products', to: routes.consumer.products, icon: ShoppingCart },
  { label: 'My Orders', to: routes.consumer.orders, icon: Package },
  { label: 'Subscriptions', to: routes.consumer.subscriptions, icon: CalendarDays },
  { label: 'Wishlist', to: routes.consumer.wishlist, icon: Heart },
  { label: 'Farm Passport', to: routes.consumer.farmPassport, icon: Leaf },
  { label: 'Notifications', to: routes.consumer.notifications, icon: Bell },
  { label: 'Profile', to: routes.consumer.profile, icon: UserRound },
  { label: 'Support', to: routes.consumer.help, icon: CircleHelp },
]
