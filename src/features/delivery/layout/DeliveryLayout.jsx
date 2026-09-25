import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DeliverySidebar from './DeliverySidebar'
import DeliveryTopNavbar from './DeliveryTopNavbar'
import '../delivery.css'

export default function DeliveryLayout() {
  const location = useLocation()
  const [openForPath, setOpenForPath] = useState(null)
  const menuOpen = openForPath === location.pathname

  useEffect(() => {
    if (!menuOpen) return undefined
    const close = event => event.key === 'Escape' && setOpenForPath(null)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  return <div className="delivery-app">
    <DeliverySidebar open={menuOpen} onClose={() => setOpenForPath(null)} />
    <div className="delivery-shell">
      <DeliveryTopNavbar onMenu={() => setOpenForPath(location.pathname)} menuOpen={menuOpen} />
      <main className="delivery-main"><Outlet /></main>
    </div>
  </div>
}
