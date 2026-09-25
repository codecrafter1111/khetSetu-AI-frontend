import { CalendarDays, CircleHelp, Heart, House, Leaf, Package, ShoppingBag, ShoppingCart, Star, UserRound } from 'lucide-react'
import { routes } from '../../../config/routes'

export const consumerNavigation = [
  { label: 'Dashboard', to: routes.consumer.dashboard, icon: House },
  { label: 'Shop Products', to: routes.consumer.products, icon: ShoppingCart },
  { label: 'Cart & Checkout', to: routes.consumer.cart, icon: ShoppingBag },
  { label: 'My Orders', to: routes.consumer.orders, icon: Package },
  { label: 'Subscriptions', to: routes.consumer.subscriptions, icon: CalendarDays },
  { label: 'Farm Passport', to: routes.consumer.farmPassport, icon: Leaf },
  { label: 'Wishlist', to: routes.consumer.wishlist, icon: Heart },
  { label: 'Reviews', to: routes.consumer.reviews, icon: Star },
  { label: 'Profile', to: routes.consumer.profile, icon: UserRound },
  { label: 'Help', to: routes.consumer.help, icon: CircleHelp },
]
