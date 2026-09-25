import { Bell, ChevronDown, Menu, Search } from 'lucide-react'

export default function DeliveryTopNavbar({ onMenu, menuOpen }) {
  return <header className="delivery-topbar">
    <button type="button" className="delivery-menu-button" onClick={onMenu} aria-label="Open menu" aria-controls="delivery-sidebar" aria-expanded={menuOpen}><Menu /></button>
    <label className="delivery-search"><Search /><span className="sr-only">Search deliveries</span><input placeholder="Search deliveries, locations, order IDs..." /></label>
    <div className="delivery-profile">
      <button type="button" className="delivery-bell" aria-label="Notifications"><Bell /><span /></button>
      <i />
      <div className="delivery-avatar" role="img" aria-label="Ramesh Kumar" />
      <span className="delivery-profile-copy"><strong>Ramesh Kumar</strong><small>Delivery Partner</small></span>
      <ChevronDown className="delivery-chevron" />
    </div>
  </header>
}
