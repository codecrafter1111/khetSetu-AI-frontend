import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ConsumerSidebar from './ConsumerSidebar'
import ConsumerTopNavbar from './ConsumerTopNavbar'
import ConsumerCommerceProvider from '../state/ConsumerCommerceProvider'

export default function ConsumerLayout() {
  const location = useLocation()
  const [openForPath, setOpenForPath] = useState(null)
  const menuOpen = openForPath === location.pathname

  useEffect(() => {
    if (!menuOpen) return undefined
    const close = event => { if (event.key === 'Escape') setOpenForPath(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  return <ConsumerCommerceProvider><div className="consumer-app min-h-screen bg-[#f4fbfd]">
    <ConsumerSidebar open={menuOpen} onClose={() => setOpenForPath(null)} />
    <div className="lg:pl-[240px]">
      <ConsumerTopNavbar onMenu={() => setOpenForPath(location.pathname)} menuOpen={menuOpen} />
      <main id="consumer-main"><Outlet /></main>
    </div>
  </div></ConsumerCommerceProvider>
}
