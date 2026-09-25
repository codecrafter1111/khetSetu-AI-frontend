import { consumerOrders } from '../../data/consumerOrders.mock'
import { shopProducts } from '../../data/shopProducts.mock'
import { downloadDemoInvoice } from '../../../../services/consumer/orderService'

const wait = (duration = 330) => new Promise((resolve) => window.setTimeout(resolve, duration))

const referenceOrder = {
  id: 'KS2025001234', placedAt: '2025-04-15T10:30:00.000Z', status: 'delivered', statusLabel: 'Delivered',
  items: [
    { productId: 7, name: 'Organic Tomatoes', pack: '1 kg', quantity: 2, unitPrice: 40, subtotal: 80, tile: 6 },
    { productId: 7, name: 'Fresh Spinach', pack: '500 g', quantity: 1, unitPrice: 30, subtotal: 30, tile: 6 },
    { productId: 8, name: 'Farm Fresh Milk', pack: '1 L', quantity: 1, unitPrice: 60, subtotal: 60, tile: 7 },
  ],
  timeline: [
    { status: 'placed', label: 'Order Placed', timestamp: '2025-04-15T10:30:00.000Z', complete: true },
    { status: 'confirmed', label: 'Confirmed', timestamp: '2025-04-15T11:00:00.000Z', complete: true },
    { status: 'packed', label: 'Packed', timestamp: '2025-04-15T14:00:00.000Z', complete: true },
    { status: 'outForDelivery', label: 'Out for Delivery', timestamp: '2025-04-15T16:00:00.000Z', complete: true },
    { status: 'delivered', label: 'Delivered', timestamp: '2025-04-15T17:15:00.000Z', complete: true },
  ],
  address: { name: 'Priya Sharma', lines: '123, Green Park', city: 'New Delhi - 110016', phone: '+91 98765 43210' },
  payment: { method: 'Online Payment', status: 'Paid', transactionId: 'TXN123456789' },
  summary: { itemTotal: 170, deliveryCharge: 30, discount: 20, totalPaid: 180 },
  permissions: { canEditAddress: false, canCancel: false, canTrack: false, canReorder: true, canReview: true, canViewFarmPassport: true },
}

const statusStep = { processing: 1, shipped: 2, outForDelivery: 3, delivered: 4, cancelled: 0 }
const labels = ['Order Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered']

function normalizeOrder(order) {
  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0)
  const fallbackUnit = Math.max(1, Math.round(order.subtotal / totalQuantity))
  const currentStep = statusStep[order.status] ?? 0
  return {
    ...order,
    placedAt: `${order.placedAt}T10:30:00.000Z`,
    items: order.items.map((item) => { const product = shopProducts.find((candidate) => candidate.id === item.productId); const unitPrice = product?.price || fallbackUnit; return { ...item, tile: product?.tile ?? order.imageTile, unitPrice, subtotal: unitPrice * item.quantity, slug: product?.slug } }),
    timeline: labels.map((label, index) => ({ status: label.toLowerCase().replaceAll(' ', ''), label, timestamp: index <= currentStep ? new Date(`${order.placedAt}T${10 + index}:30:00.000Z`).toISOString() : null, complete: index <= currentStep })),
    address: { ...(order.address || { name: 'Priya Sharma', lines: 'B-102, Sunrise Apartments', city: 'New Delhi - 110062' }), phone: '+91 98765 43210' },
    payment: { method: order.paidWith, status: order.status === 'cancelled' ? 'Refunded' : 'Paid', transactionId: `TXN${order.id.replace(/\D/g, '')}89` },
    summary: { itemTotal: order.subtotal, deliveryCharge: order.deliveryCharge, discount: order.discount, totalPaid: order.total },
    permissions: { canEditAddress: !['delivered', 'cancelled'].includes(order.status), canCancel: order.cancellation?.canCancel === true, canTrack: !['delivered', 'cancelled'].includes(order.status), canReorder: ['delivered', 'cancelled'].includes(order.status), canReview: order.status === 'delivered', canViewFarmPassport: true },
  }
}

export async function getConsumerOrderDetails(orderId) {
  await wait()
  if (orderId === referenceOrder.id) return structuredClone(referenceOrder)
  const order = consumerOrders.find((candidate) => candidate.id.toLowerCase() === orderId.toLowerCase())
  if (!order) throw new Error('ORDER_NOT_FOUND')
  return normalizeOrder(order)
}

export async function downloadOrderInvoice(order) {
  await wait(420)
  downloadDemoInvoice(order)
  return true
}

export async function requestOrderCancellation(orderId, reason) {
  await wait(500)
  if (!String(reason).trim()) throw new Error('Select or enter a cancellation reason.')
  return { orderId, status: 'cancelled', cancelledAt: new Date().toISOString() }
}
