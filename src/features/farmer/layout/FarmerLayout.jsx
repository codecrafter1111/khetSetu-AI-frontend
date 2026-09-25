import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FarmerSidebar from './FarmerSidebar'
import FarmerTopNavbar from './FarmerTopNavbar'

export default function FarmerLayout() {
  const location = useLocation()
  const [openForPath, setOpenForPath] = useState(null)
  const menuOpen = openForPath === location.pathname

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = event => { if (event.key === 'Escape') setOpenForPath(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return <div className="min-h-screen bg-[#f5f9f7]"><FarmerSidebar open={menuOpen} onClose={() => setOpenForPath(null)} /><div className="lg:pl-[238px]"><FarmerTopNavbar onMenu={() => setOpenForPath(location.pathname)} menuOpen={menuOpen} /><main id="farmer-main" className="min-h-[calc(100dvh-73px)]"><Outlet /></main></div></div>
}
