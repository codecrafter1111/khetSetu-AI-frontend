import { CalendarDays, Package, ShieldCheck, Wallet } from 'lucide-react'

export const stats = [
  { label: 'Active Orders', value: '2', trend: '0%', detail: '1 delivered, 1 in transit', icon: Package },
  { label: 'Monthly Savings', value: '₹ 420', trend: '+18%', detail: 'vs last month', icon: Wallet },
  { label: 'My Subscriptions', value: '3', trend: '+1', detail: 'Next delivery: Apr 28, 2025', icon: CalendarDays },
  { label: 'Trusted Farms', value: '12', trend: '+2', detail: "Farms you've shopped from", icon: ShieldCheck },
]
export const categories = [
  { name: 'Grains', tile: 0 }, { name: 'Dairy', tile: 1 }, { name: 'Jaggery', tile: 2 },
  { name: 'Pulses', tile: 3 }, { name: 'Fruits & Vegetables', tile: 4 }, { name: 'Oils & Spices', tile: 5 },
]
export const products = [
  { id: 1, name: 'Organic Basmati Rice', quantity: '5 kg', farm: 'GreenFields Farm', price: 420, originalPrice: 480, discount: 13, rating: 4.8, reviews: 240, badge: 'Bestseller', tile: 0 },
  { id: 2, name: 'A2 Cow Ghee', quantity: '500 ml', farm: 'Shanti Dairy', price: 650, originalPrice: 720, discount: 10, rating: 4.9, reviews: 189, badge: 'Farm Fresh', tile: 6 },
  { id: 3, name: 'Organic Jaggery', quantity: '1 kg', farm: 'Mittal Farms', price: 180, originalPrice: 210, discount: 14, rating: 4.7, reviews: 95, badge: 'Natural', tile: 2 },
  { id: 4, name: 'Wild Honey', quantity: '500 g', farm: 'Forest Hive', price: 320, originalPrice: 360, discount: 11, rating: 4.8, reviews: 132, badge: 'Pure & Raw', tile: 7 },
]
export const orderSteps = [
  { label: 'Confirmed', date: 'Apr 24', complete: true }, { label: 'Packed', date: 'Apr 24', complete: true },
  { label: 'Shipped', date: 'Apr 25', complete: true }, { label: 'Out for Delivery', date: 'Apr 26' },
  { label: 'Delivered', date: 'Apr 27' },
]
