import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import { useEffect, useState } from 'react'


export default function Layout() {
  const [theme, setTheme] = useState(() => localStorage.getItem('scm_theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="h-screen drawer lg:drawer-open">
      {/* Toggle checkbox pour DaisyUI */}
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Contenu principal */}
      <div className="flex flex-col drawer-content">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Sidebar (drawer side) */}
      <div className="drawer-side">
        <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  )
}
