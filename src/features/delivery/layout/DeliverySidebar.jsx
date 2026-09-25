import { BarChart3, CircleHelp, Clock3, Grid2X2, Leaf, MapPinned, Truck, UserRound, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../config/routes'

const navigation = [
  { label: 'Dashboard', to: routes.delivery.dashboard, icon: Grid2X2, enabled: true },
  { label: 'My Deliveries', to: routes.delivery.deliveries, icon: Truck, enabled: true },
  { label: 'Route Map', to: routes.delivery.routeMap, icon: MapPinned, enabled: true },
  { label: 'Earnings', to: routes.delivery.earnings, icon: BarChart3, enabled: true },
  { label: 'History', to: routes.delivery.history, icon: Clock3, enabled: true },
  { label: 'Profile', to: routes.delivery.profile, icon: UserRound },
  { label: 'Help', to: routes.delivery.help, icon: CircleHelp },
]

export default function DeliverySidebar({ open, onClose }) {
  return <>
    {open && <button className="delivery-drawer-backdrop" type="button" aria-label="Close navigation" onClick={onClose} />}
    <aside id="delivery-sidebar" className={`delivery-sidebar ${open ? 'is-open' : ''}`} aria-label="Delivery partner sidebar">
      <button type="button" onClick={onClose} className="delivery-sidebar-close" aria-label="Close menu"><X /></button>
      <div className="delivery-brand"><span className="delivery-brand-mark"><Leaf /></span><span><strong>KhetSetu AI</strong><small>Farmers Today, A Better Tomorrow</small></span></div>
      <nav className="delivery-nav">{navigation.map(({ label, to, icon: Icon, enabled }) => enabled
        ? <NavLink key={to} to={to} end onClick={onClose} className={({ isActive }) => `delivery-nav-item ${isActive ? 'active' : ''}`}><Icon />{label}</NavLink>
        : <span key={to} className="delivery-nav-item" aria-disabled="true"><Icon />{label}</span>
      )}</nav>
      <div className="delivery-promo">
        <Leaf className="delivery-promo-leaf" />
        <strong>From<br />Farms to Cities<br />A Healthier<br />Tomorrow</strong>
        <p>Bridging farmers and families through fresher food.</p>
        <div className="delivery-promo-scene"><span>🚚</span></div>
      </div>
      <small className="delivery-version">v1.0.0</small>
    </aside>
  </>
}
