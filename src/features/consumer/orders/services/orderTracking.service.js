import { consumerOrders } from '../../data/consumerOrders.mock'

const wait = (duration = 360) => new Promise((resolve) => window.setTimeout(resolve, duration))

const timelineTemplate = [
  ['PLACED', 'Order Placed', 'Your order has been placed successfully.'],
  ['CONFIRMED', 'Confirmed', 'Your order has been confirmed by the seller.'],
  ['PACKED', 'Packed', 'Your items have been packed and are ready.'],
  ['PICKED_UP', 'Picked Up', 'Your order has been picked up by our delivery partner.'],
  ['OUT_FOR_DELIVERY', 'Out for Delivery', 'Your order is on the way'],
  ['DELIVERED', 'Delivered', 'Expected by 4:00 PM'],
]

const referenceTracking = {
  orderId: 'KS2025001234',
  orderNumber: 'KS2025001234',
  status: 'OUT_FOR_DELIVERY',
  statusLabel: 'Out for Delivery',
  expectedDeliveryAt: '2025-04-20T16:00:00+05:30',
  expectedDeliveryLabel: 'Today, 20 Apr 2025, 4:00 PM',
  invoiceAvailable: true,
  timeline: timelineTemplate.map(([code, label, description], index) => ({
    code, label, description,
    timestamp: index < 5 ? ['15 Apr 2025, 10:30 AM', '15 Apr 2025, 11:00 AM', '15 Apr 2025, 02:00 PM', '16 Apr 2025, 08:30 AM', '16 Apr 2025, 04:00 PM'][index] : null,
    state: index < 4 ? 'completed' : index === 4 ? 'current' : 'pending',
  })),
  deliveryPartner: { id: 'DP-104', name: 'Amit Kumar', role: 'Delivery Partner', vehicleNumber: 'DL 01 AB 1234', phoneAvailable: true, phone: '+919876543210', avatarPosition: '0% 100%' },
  tracking: {
    available: true, updatedAt: new Date().toISOString(), etaMinutes: 24,
    currentLocation: { latitude: 28.5521, longitude: 77.2183 },
    destination: { latitude: 28.5566, longitude: 77.2325 },
    pickup: { latitude: 28.5588, longitude: 77.1992 },
    route: [
      { latitude: 28.5588, longitude: 77.1992 }, { latitude: 28.5493, longitude: 77.2021 },
      { latitude: 28.5461, longitude: 77.2091 }, { latitude: 28.5521, longitude: 77.2183 },
      { latitude: 28.5504, longitude: 77.2261 }, { latitude: 28.5566, longitude: 77.2325 },
    ],
  },
}

const terminalStatuses = new Set(['DELIVERED', 'CANCELLED', 'FAILED'])

function createTrackingFromOrder(order) {
  const statusMap = { processing: 'CONFIRMED', shipped: 'PICKED_UP', outForDelivery: 'OUT_FOR_DELIVERY', delivered: 'DELIVERED', cancelled: 'CANCELLED' }
  const status = statusMap[order.status] || 'PLACED'
  const currentIndex = timelineTemplate.findIndex(([code]) => code === status)
  const hasLiveLocation = ['PICKED_UP', 'OUT_FOR_DELIVERY'].includes(status)
  const standardTimeline = timelineTemplate.map(([code, label, description], index) => ({ code, label, description, timestamp: index <= currentIndex ? `${15 + Math.min(index, 1)} Apr 2025, ${index === 0 ? '10:30 AM' : `${10 + index}:00 AM`}` : null, state: index < currentIndex ? 'completed' : index === currentIndex ? (terminalStatuses.has(status) ? 'completed' : 'current') : 'pending' }))
  const timeline = ['CANCELLED', 'FAILED'].includes(status)
    ? [...standardTimeline.slice(0, 2).map((event) => ({ ...event, state: 'completed' })), { code: status, label: status === 'CANCELLED' ? 'Cancelled' : 'Delivery Failed', description: status === 'CANCELLED' ? 'This order has been cancelled.' : 'The delivery could not be completed.', timestamp: '16 Apr 2025, 09:00 AM', state: 'negative' }]
    : standardTimeline
  return {
    ...structuredClone(referenceTracking), orderId: order.id, orderNumber: order.id, status,
    statusLabel: status.split('_').map((word) => `${word[0]}${word.slice(1).toLowerCase()}`).join(' '),
    expectedDeliveryLabel: order.expectedDelivery ? new Date(order.expectedDelivery).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Delivery date will be updated soon',
    timeline,
    deliveryPartner: currentIndex >= 3 && status !== 'CANCELLED' ? structuredClone(referenceTracking.deliveryPartner) : null,
    tracking: { ...structuredClone(referenceTracking.tracking), available: hasLiveLocation },
  }
}

export async function getOrderTracking(orderId) {
  await wait()
  if (orderId?.toUpperCase() === referenceTracking.orderId) return structuredClone(referenceTracking)
  const order = consumerOrders.find((candidate) => candidate.id.toLowerCase() === orderId?.toLowerCase())
  if (!order) throw new Error('ORDER_NOT_FOUND')
  return createTrackingFromOrder(order)
}
