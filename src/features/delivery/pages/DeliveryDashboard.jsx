import { useRef, useState } from 'react'
import { BadgeIndianRupee, Box, Camera, Check, CheckCircle2, ChevronRight, Clock3, History, Leaf, Map, MapPin, Navigation, Package, ShieldCheck, Star, Truck, Upload, UserRound } from 'lucide-react'
import deliveryReference from '../../../../Images/delevery/ChatGPT Image Sep 23, 2026, 09_54_20 PM (1).png'
import { featureItems, recentDeliveries, routeStops, summaryStats } from '../data/dashboard.mock'

const iconMap = { package: Box, check: CheckCircle2, clock: Clock3, rupee: BadgeIndianRupee, map: Map, shield: ShieldCheck, camera: Camera, history: History }

function PanelTitle({ icon: Icon, children, action }) {
  return <header className="delivery-panel-title"><h2>{Icon && <Icon />}{children}</h2>{action}</header>
}

function DeliveryHero() {
  return <section className="delivery-hero" style={{ '--delivery-art': `url("${deliveryReference}")` }}>
    <div className="delivery-hero-copy"><h1>Welcome back, Ramesh! <Leaf /></h1><strong>Every delivery connects farms to families.</strong><p>Your efforts bring fresh food to more homes. Keep going!</p></div>
    <div className="hero-script" aria-hidden="true">Good<br /><span>Food Reaches</span><br />Further</div>
    <div className="hero-city"><Leaf /><strong>Fresh Farms<br />Stronger Cities</strong></div>
    <span className="hero-location"><MapPin />Varanasi, Uttar Pradesh</span>
  </section>
}

function SummaryCards() {
  return <section className="summary-grid" aria-label="Delivery summary">{summaryStats.map(stat => {
    const Icon = iconMap[stat.icon]
    return <article className="summary-card" key={stat.label}><span className={`summary-icon ${stat.tone}`}><Icon /></span><div><p>{stat.label}</p><div className="summary-value"><strong>{stat.value}</strong><span className={stat.trend.startsWith('-') ? 'down' : ''}>{stat.trend.startsWith('-') ? '↓' : '↗'} {stat.trend}</span></div><small>{stat.detail}</small></div></article>
  })}</section>
}

function RouteList({ stops }) {
  return <article className="delivery-panel route-list-panel"><PanelTitle icon={MapPin} action={<time>Mon, Apr 28, 2025</time>}>Today&apos;s Route</PanelTitle><ol className="route-list">{stops.map((stop, index) => <li key={stop.name} className={`route-stop route-${stop.status.toLowerCase().replaceAll(' ', '-')}`}><span className="route-number">{index + 1}</span><div><strong>{stop.name}</strong><p>{stop.meta}</p><small>{stop.location}</small></div><em>{stop.status}</em></li>)}</ol><button className="delivery-soft-button" type="button">View Full Route <ChevronRight /></button></article>
}

function RouteMapPanel() {
  return <article className="delivery-panel map-panel"><PanelTitle icon={Map} action={<button type="button" className="tiny-outline">Open in Maps ↗</button>}>Live Route Map</PanelTitle><div className="mock-map"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-river">Ganga</div><div className="route-line"><i /><i /><i /><i /><i /></div><strong className="varanasi-label">Varanasi<small>वाराणसी</small></strong><span className="map-label sarnath">Sarnath</span><span className="map-label bhu">BHU</span><span className="map-label assi">Assi Ghat</span>{[1,2,3,4,5].map(n => <span key={n} className={`map-marker marker-${n}`}>{n}</span>)}</div><div className="map-legend"><span><i className="done" />Completed</span><span><i className="current" />Current Stop</span><span><i />Upcoming</span></div></article>
}

function CurrentDelivery({ delivered, onDelivered }) {
  return <article className="delivery-panel current-panel"><PanelTitle icon={Package} action={<span className={`status-badge ${delivered ? 'completed' : 'current'}`}>{delivered ? 'Delivered' : 'On the way'}</span>}>Current Delivery</PanelTitle><div className="current-product"><span className="product-emoji">🥬</span><div><strong>Organic Vegetables (Batch #VG782)</strong><p><span>Fresh Produce</span><small>12 kg</small></p></div></div><div className="delivery-detail"><MapPin /><span>Pickup Point</span><div><strong>Kisan Samooh Kendra</strong><small>Sector 62, Varanasi</small></div><em>Completed</em></div><div className="delivery-detail blue"><MapPin /><span>Drop Point</span><div><strong>Green Leaf Organics</strong><small>Lanka, Varanasi</small></div><em>2.4 km away</em></div><div className="delivery-detail"><UserRound /><span>Customer</span><div><strong>Mr. Amit Verma</strong><small>Store Manager</small></div></div><div className="delivery-detail"><Box /><span>Weight</span><div><strong>12 kg</strong><small>Fresh vegetables</small></div></div><div className="current-actions"><button type="button" className="navigate"><Navigation />Navigate</button><button type="button" className="delivered" onClick={onDelivered}><Check />{delivered ? 'Delivered' : 'Mark as Delivered'}</button></div></article>
}

function DeliveryProgress({ delivered }) {
  const steps = [{ name: 'Picked Up', time: '8:05 AM' }, { name: 'In Transit', time: '10:15 AM' }, { name: 'Out for Delivery', time: delivered ? '10:42 AM' : '--:--' }, { name: 'Delivered', time: delivered ? '10:48 AM' : '--:--' }]
  return <article className="delivery-panel progress-panel"><PanelTitle icon={Truck}>Delivery Progress</PanelTitle><div className={`progress-steps ${delivered ? 'all-complete' : ''}`}>{steps.map((step, i) => <div className={`progress-step ${i < 2 || delivered ? 'active' : ''}`} key={step.name}><span>{i + 1}</span><strong>{step.name}</strong><small>{step.time}</small></div>)}</div><div className="progress-note"><Leaf /><span><strong>You&apos;re doing great!</strong><small>Fresh food is on its way to a healthier tomorrow.</small></span></div></article>
}

function ProofOfDelivery() {
  const [tab, setTab] = useState('otp')
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [verified, setVerified] = useState(false)
  const refs = useRef([])
  const updateOtp = (value, index) => { const next = [...otp]; next[index] = value.replace(/\D/g, '').slice(-1); setOtp(next); if (next[index] && index < 5) refs.current[index + 1]?.focus() }
  return <article className="delivery-panel proof-panel"><PanelTitle icon={ShieldCheck}>Proof of Delivery</PanelTitle><div className="proof-tabs"><button type="button" onClick={() => setTab('otp')} className={tab === 'otp' ? 'active' : ''}>Enter OTP</button><button type="button" onClick={() => setTab('photo')} className={tab === 'photo' ? 'active' : ''}>Upload Photo</button></div>{tab === 'otp' ? <><p className="proof-hint">{verified ? 'OTP verified successfully!' : 'Ask customer for the 6-digit OTP'}</p><div className="otp-row">{otp.map((digit, i) => <input key={i} ref={el => { refs.current[i] = el }} value={digit} onChange={e => updateOtp(e.target.value, i)} onKeyDown={e => e.key === 'Backspace' && !otp[i] && refs.current[i - 1]?.focus()} inputMode="numeric" maxLength="1" aria-label={`OTP digit ${i + 1}`} />)}</div><button type="button" className="verify-button" onClick={() => otp.every(Boolean) && setVerified(true)}>{verified ? <><Check /> Verified</> : 'Verify OTP'}</button></> : <label className="photo-upload"><Upload /><strong>Upload delivery photo</strong><small>JPG or PNG up to 5 MB</small><input type="file" accept="image/*" /></label>}</article>
}

function RecentDeliveries() {
  return <article className="delivery-panel recent-panel"><PanelTitle icon={Clock3} action={<button type="button" className="view-all">View All <ChevronRight /></button>}>Recent Deliveries</PanelTitle><div className="recent-list">{recentDeliveries.map(item => <div className="recent-row" key={item.order}><span className="recent-thumb">{item.emoji}</span><div><strong>{item.name}</strong><small>{item.order} • {item.time}</small></div><em>Delivered</em><b>{item.amount}</b></div>)}</div></article>
}

function KeyFeatures() {
  return <aside className="delivery-panel features-panel"><PanelTitle icon={Star}>Key Features</PanelTitle><div className="features-list">{featureItems.map(item => { const Icon = iconMap[item.icon]; return <div className="feature-row" key={item.title}><span><Icon /></span><div><strong>{item.title}</strong><p>{item.text}</p></div></div> })}</div><div className="feature-quote"><Leaf /><p>“Delivering today<br />for a healthier tomorrow.”</p><i /></div></aside>
}

export default function DeliveryDashboard() {
  const [delivered, setDelivered] = useState(false)
  const stops = delivered ? routeStops.map((stop, i) => i === 1 ? { ...stop, status: 'Completed' } : stop) : routeStops
  return <><DeliveryHero /><div className="delivery-content"><SummaryCards /><div className="delivery-dashboard-grid"><div className="delivery-core"><div className="delivery-primary-row"><RouteList stops={stops} /><RouteMapPanel /><CurrentDelivery delivered={delivered} onDelivered={() => setDelivered(true)} /></div><div className="delivery-secondary-row"><DeliveryProgress delivered={delivered} /><ProofOfDelivery /><RecentDeliveries /></div></div><KeyFeatures /></div></div></>
}
