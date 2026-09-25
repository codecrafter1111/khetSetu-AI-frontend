import { consumerOrders } from '../../data/consumerOrders.mock'

const wait = (duration = 320) => new Promise((resolve) => window.setTimeout(resolve, duration))

const reasonOptions = [
  { code: 'ORDERED_BY_MISTAKE', label: 'Ordered by mistake' },
  { code: 'CHANGED_MIND', label: 'Changed my mind' },
  { code: 'DELIVERY_DELAY', label: 'Delivery taking too long' },
  { code: 'BETTER_PRICE', label: 'Found a better price' },
  { code: 'PRODUCT_NOT_NEEDED', label: 'Product not needed' },
  { code: 'OTHER', label: 'Other', commentRequired: true },
]

export async function getOrderCancellationOptions(orderId) {
  await wait()
  const order = consumerOrders.find((candidate) => candidate.id.toLowerCase() === orderId?.toLowerCase())
  if (!order) throw new Error('ORDER_NOT_FOUND')
  return {
    orderId: order.id,
    status: order.status,
    canCancel: order.cancellation?.canCancel === true,
    cancellationDeadline: order.cancellation?.cancellationDeadline || null,
    unavailableReason: order.cancellation?.canCancel ? '' : 'This order is no longer eligible for cancellation.',
    reasonOptions,
  }
}

export async function cancelConsumerOrder(orderId, payload) {
  const options = await getOrderCancellationOptions(orderId)
  if (!options.canCancel) throw new Error(options.unavailableReason)
  const reason = options.reasonOptions.find((item) => item.code === payload.reasonCode)
  if (!reason) throw new Error('Please select a valid cancellation reason.')
  const comment = String(payload.comment || '').trim()
  if (reason.commentRequired && !comment) throw new Error('Please add a comment when selecting Other.')
  if (comment.length > 300) throw new Error('Comments must be 300 characters or fewer.')
  await wait(520)
  return { orderId, status: 'cancelled', statusLabel: 'Cancelled', reasonCode: reason.code, comment, cancelledAt: new Date().toISOString() }
}
