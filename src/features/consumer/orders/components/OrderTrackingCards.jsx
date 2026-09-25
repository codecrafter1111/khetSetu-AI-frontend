import { useEffect, useMemo, useRef } from 'react'
import { Check, Clock3, MapPin, Package, Phone, Truck } from 'lucide-react'

const statusIcons = { PICKED_UP: Package, OUT_FOR_DELIVERY: Truck, DELIVERED: Check, CANCELLED: Package, FAILED: Package }

export function VerticalOrderTimeline({ events }) {
  return <section className="tracking-card tracking-timeline-card"><h2>Order Timeline</h2><ol className="tracking-timeline">{events.map((event) => {
    const Icon = statusIcons[event.code] || Check
    return <li key={event.code} className={`tracking-event is-${event.state}`}><span className="tracking-event-icon" aria-hidden="true"><Icon /></span><div><h3>{event.label}</h3>{event.timestamp && <time>{event.timestamp}</time>}<p>{event.description}</p></div></li>
  })}</ol></section>
}

export function DeliveryPartnerCard({ partner }) {
  if (!partner) return <section className="tracking-card partner-unavailable"><h2>Delivery Partner</h2><p>A delivery partner will be assigned when your order is ready for pickup.</p></section>
  return <section className="tracking-card partner-card"><h2>Delivery Partner</h2><div className="partner-main"><span className="partner-avatar" role="img" aria-label={`${partner.name}, delivery partner`} style={{ backgroundPosition: partner.avatarPosition }} /><div><h3>{partner.name}</h3><p>{partner.role}</p></div>{partner.phoneAvailable && partner.phone && <a href={`tel:${partner.phone}`} aria-label={`Call ${partner.name}`}><Phone />Call</a>}</div><div className="partner-vehicle"><span>Vehicle Number</span><strong><Truck />{partner.vehicleNumber}</strong></div></section>
}

function normalizeRoute(tracking) {
  const points = tracking.route || []
  if (!points.length) return []
  const latitudes = points.map((point) => point.latitude); const longitudes = points.map((point) => point.longitude)
  const minLat = Math.min(...latitudes); const maxLat = Math.max(...latitudes); const minLng = Math.min(...longitudes); const maxLng = Math.max(...longitudes)
  return points.map((point) => ({ x: 8 + ((point.longitude - minLng) / Math.max(maxLng - minLng, 0.0001)) * 84, y: 82 - ((point.latitude - minLat) / Math.max(maxLat - minLat, 0.0001)) * 64 }))
}

function DynamicTrackingMap({ tracking, statusLabel }) {
  const canvasRef = useRef(null)
  const points = useMemo(() => normalizeRoute(tracking), [tracking])
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !points.length) return undefined
    const draw = () => {
      const box = canvas.getBoundingClientRect(); const ratio = window.devicePixelRatio || 1
      canvas.width = box.width * ratio; canvas.height = box.height * ratio
      const context = canvas.getContext('2d'); context.scale(ratio, ratio)
      context.fillStyle = '#eef1ef'; context.fillRect(0, 0, box.width, box.height)
      context.lineCap = 'round'
      for (let index = -4; index < 13; index += 1) { context.beginPath(); context.strokeStyle = index % 3 === 0 ? '#d9e3dc' : '#ffffff'; context.lineWidth = index % 3 === 0 ? 2 : 5; context.moveTo(index * 76, 0); context.lineTo(index * 76 + 260, box.height); context.stroke() }
      for (let index = -2; index < 10; index += 1) { context.beginPath(); context.strokeStyle = '#fff'; context.lineWidth = 4; context.moveTo(0, index * 54 + 22); context.bezierCurveTo(box.width * .3, index * 54 - 18, box.width * .65, index * 54 + 70, box.width, index * 54 + 15); context.stroke() }
      context.fillStyle = '#d1eed4'; [[.18,.19,.2,.18],[.64,.08,.24,.17],[.42,.67,.19,.2]].forEach(([x,y,w,h]) => context.fillRect(box.width*x,box.height*y,box.width*w,box.height*h))
      context.beginPath(); context.strokeStyle = '#068b3e'; context.lineWidth = 5
      points.forEach((point, index) => { const x = point.x / 100 * box.width; const y = point.y / 100 * box.height; if (!index) context.moveTo(x, y); else context.lineTo(x, y) }); context.stroke()
    }
    draw(); const observer = new ResizeObserver(draw); observer.observe(canvas); return () => observer.disconnect()
  }, [points])
  const start = points[0]; const destination = points.at(-1); const driver = points[Math.floor(points.length / 2)]
  return <div className="live-map" role="img" aria-label={`${statusLabel}. Driver is travelling toward your delivery location.`}><canvas ref={canvasRef} />{start && <span className="map-pin map-pin--start" style={{ left: `${start.x}%`, top: `${start.y}%` }}><MapPin /></span>}{driver && <><span className="map-driver-label" style={{ left: `${driver.x}%`, top: `${driver.y - 14}%` }}>{statusLabel}</span><span className="map-driver" style={{ left: `${driver.x}%`, top: `${driver.y}%` }}><Truck /></span></>}{destination && <><span className="map-destination-label" style={{ left: `${destination.x}%`, top: `${destination.y - 18}%` }}>Your location</span><span className="map-pin map-pin--destination" style={{ left: `${destination.x}%`, top: `${destination.y}%` }}><MapPin /></span></>}</div>
}

export function LiveTrackingCard({ tracking, partner, statusLabel }) {
  return <section className="tracking-card live-tracking-card"><h2>Live Tracking</h2>{tracking.available ? <><DynamicTrackingMap tracking={tracking} statusLabel={statusLabel} /><div className="tracking-update"><span><Truck /></span><p><strong>{partner?.name || 'Your delivery partner'} is on the way to deliver your order.</strong><small>Live location updates every few minutes.</small></p></div></> : <div className="tracking-unavailable"><Clock3 /><h3>Live tracking is not available yet</h3><p>{statusLabel === 'Delivered' ? 'This order has already been delivered.' : 'Live location is currently unavailable. Your order is still being prepared.'}</p></div>}</section>
}
