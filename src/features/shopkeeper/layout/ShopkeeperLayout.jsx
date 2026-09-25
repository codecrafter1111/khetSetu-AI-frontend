import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ShopkeeperSidebar from './ShopkeeperSidebar'
import ShopkeeperHeader from './ShopkeeperHeader'

export default function ShopkeeperLayout() {
  const location = useLocation()
  const [openForPath, setOpenForPath] = useState(null)
  const menuOpen = openForPath === location.pathname
  useEffect(() => {
    if (!menuOpen) return undefined
    const close = event => { if (event.key === 'Escape') setOpenForPath(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])
  return <div className="min-h-screen bg-[#f3faff]"><ShopkeeperSidebar open={menuOpen} onClose={() => setOpenForPath(null)} /><div className="lg:pl-[240px]"><ShopkeeperHeader onMenu={() => setOpenForPath(location.pathname)} menuOpen={menuOpen} /><main id="shopkeeper-main" className="min-h-[calc(100vh-72px)]"><Outlet /></main></div></div>
}
