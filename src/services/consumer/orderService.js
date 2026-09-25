import { consumerOrders } from '../../features/consumer/data/consumerOrders.mock'
import { formatOrderDate } from '../../features/consumer/data/consumerOrders.mock'
import { apiRequest } from '../apiClient'

export function getConsumerOrders() {
  return consumerOrders
}

export function fetchConsumerOrders() {
  return apiRequest('/consumer/orders/')
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
export function downloadDemoInvoice(order) {
  const rows = order.items.map(item => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.pack)}</td><td>${item.quantity}</td></tr>`).join('')
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Demo invoice ${escapeHtml(order.id)}</title><style>body{font:14px Arial,sans-serif;max-width:720px;margin:50px auto;color:#17243b}h1{color:#075b32}table{width:100%;border-collapse:collapse;margin-top:24px}td,th{border-bottom:1px solid #dfe8e4;padding:10px;text-align:left}.total{font-size:20px;font-weight:bold;text-align:right}.note{padding:12px;background:#e9f9ee;color:#075b32}</style></head><body><h1>KhetSetu AI — Demo Invoice</h1><p class="note">Sample invoice generated from frontend mock order data. This is not a tax invoice.</p><p><strong>Order:</strong> #${escapeHtml(order.id)}<br><strong>Placed:</strong> ${escapeHtml(formatOrderDate(order.placedAt))}<br><strong>Farm:</strong> ${escapeHtml(order.farm)}<br><strong>Paid via:</strong> ${escapeHtml(order.paidWith)}</p><table><thead><tr><th>Product</th><th>Pack</th><th>Quantity</th></tr></thead><tbody>${rows}</tbody></table><p class="total">Total Paid: ₹ ${order.total.toLocaleString('en-IN')}</p></body></html>`
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `KhetSetu-demo-invoice-${order.id}.html`
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
