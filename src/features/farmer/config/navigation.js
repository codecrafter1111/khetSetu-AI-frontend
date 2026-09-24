import { Bot, ChartNoAxesCombined, CircleDollarSign, CircleHelp, Grid2X2, MessageSquare, ReceiptText, ShoppingBag, Store, UserRound, Wheat } from 'lucide-react'
import { routes } from '../../../config/routes'

export const farmerNavigation = [
  { label: 'Dashboard', to: routes.farmer.dashboard, icon: Grid2X2 },
  { label: 'My Farm', to: routes.farmer.farm, icon: Wheat },
  { label: 'My Products', to: routes.farmer.products, icon: ShoppingBag },
  { label: 'Orders', to: routes.farmer.orders, icon: ReceiptText },
  { label: 'Crop Doctor (AI)', to: routes.farmer.cropDoctor, icon: Bot },
  { label: 'Price Insights', to: routes.farmer.priceInsights, icon: ChartNoAxesCombined },
  { label: 'Agri Stores', to: routes.farmer.agriStores, icon: Store },
  { label: 'Earnings', to: routes.farmer.earnings, icon: CircleDollarSign },
  { label: 'Messages', to: routes.farmer.messages, icon: MessageSquare, badge: 3 },
  { label: 'Profile', to: routes.farmer.profile, icon: UserRound },
  { label: 'Help', to: routes.farmer.help, icon: CircleHelp },
]
