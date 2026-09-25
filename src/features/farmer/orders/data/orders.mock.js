import { BadgeCheck, CircleCheck, Clock3, ClipboardCheck, CreditCard, PackageCheck, Truck, UserRound } from 'lucide-react'

export const orderStats = [
  { label: 'Pending Orders', value: '6', detail: 'Need your action', icon: Clock3, tone: 'amber', status: 'pending' },
  { label: 'Confirmed Orders', value: '8', detail: 'Ready for dispatch', icon: CircleCheck, tone: 'green', status: 'confirmed' },
  { label: 'Shipped Orders', value: '10', detail: 'Out for delivery', icon: Truck, tone: 'blue', status: 'shipped' },
  { label: 'Completed Orders', value: '24', detail: 'Successfully delivered', icon: BadgeCheck, tone: 'green', status: 'delivered' },
]

export const orders = [
  { id: 'KS4582', consumer: { name: 'Priya Sharma', location: 'Lucknow, UP', fullLocation: 'Lucknow, Uttar Pradesh', avatar: 'priya' }, product: { name: 'Organic Rice', image: 'riceBag', packageSize: '5 kg' }, quantity: '5 kg', amount: 1250, deliveryStatus: 'delivered', paymentStatus: 'paid', orderDate: '2025-04-26T10:24:00', dateLabel: 'Apr 26, 2025', timeline: ['Apr 26, 2025, 10:30 AM', 'Apr 26, 2025, 02:15 PM', 'Apr 26, 2025, 04:20 PM', 'Apr 27, 2025, 11:10 AM'], trackingId: 'DLV1234567890' },
  { id: 'KS4581', consumer: { name: 'Amit Verma', location: 'Varanasi, UP', fullLocation: 'Varanasi, Uttar Pradesh', avatar: 'amit' }, product: { name: 'Wheat', image: 'wheat', packageSize: '10 kg' }, quantity: '10 kg', amount: 940, deliveryStatus: 'shipped', paymentStatus: 'paid', orderDate: '2025-04-25T11:15:00', dateLabel: 'Apr 25, 2025', timeline: ['Apr 25, 2025, 11:30 AM', 'Apr 25, 2025, 02:40 PM', 'Apr 25, 2025, 05:10 PM'], trackingId: 'DLV1234567891' },
  { id: 'KS4580', consumer: { name: 'Neha Singh', location: 'Kanpur, UP', fullLocation: 'Kanpur, Uttar Pradesh', avatar: 'neha' }, product: { name: 'Maize', image: 'maize', packageSize: '5 kg' }, quantity: '5 kg', amount: 975, deliveryStatus: 'confirmed', paymentStatus: 'paid', orderDate: '2025-04-24T09:20:00', dateLabel: 'Apr 24, 2025', timeline: ['Apr 24, 2025, 09:45 AM'], trackingId: null },
  { id: 'KS4579', consumer: { name: 'Rahul Mehta', location: 'Prayagraj, UP', fullLocation: 'Prayagraj, Uttar Pradesh', avatar: 'rahul' }, product: { name: 'Natural Jaggery', image: 'jaggery', packageSize: '1 kg' }, quantity: '1 kg', amount: 320, deliveryStatus: 'pending', paymentStatus: 'cod', orderDate: '2025-04-24T08:50:00', dateLabel: 'Apr 24, 2025', timeline: [], trackingId: null },
  { id: 'KS4578', consumer: { name: 'Sneha Patel', location: 'Gorakhpur, UP', fullLocation: 'Gorakhpur, Uttar Pradesh', avatar: 'sneha' }, product: { name: 'Pure Cow Ghee', image: 'ghee', packageSize: '500 ml' }, quantity: '500 ml', amount: 680, deliveryStatus: 'processing', paymentStatus: 'paid', orderDate: '2025-04-22T12:05:00', dateLabel: 'Apr 22, 2025', timeline: ['Apr 22, 2025, 12:25 PM', 'Apr 22, 2025, 03:00 PM'], trackingId: null },
]

export const timelineLabels = ['Order Confirmed', 'Packed & Ready', 'Handed over to Delivery Partner', 'Delivered to Customer']

export const deliveryPartner = { name: 'Delhivery', subtitle: 'Our Delivery Partner', contactNumber: '1800-123-4567' }

export const orderFeatures = [
  { title: 'Order Tracking', description: 'Track real-time order status', icon: Clock3 },
  { title: 'Fulfillment Status', description: 'Confirm, pack and dispatch', icon: ClipboardCheck },
  { title: 'Payment Tracking', description: 'Monitor payments & COD', icon: CreditCard },
  { title: 'Delivery Handoff', description: 'Manage delivery partner', icon: Truck },
  { title: 'Consumer Details', description: 'View customer information', icon: UserRound },
  { title: 'Dispatch Management', description: 'Update packaging & shipping', icon: PackageCheck },
]
