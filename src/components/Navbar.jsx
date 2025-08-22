import { Sun, Moon, LogOut, User, Settings, Menu } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.js'
import { Link } from 'react-router-dom'

export default function Navbar({ theme, setTheme }) {
  const { logout } = useAuth()
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('scm_theme', next)
  }

  return (
    <div className="px-4 border-b navbar bg-base-100, shadow">
      {/* Bouton burger mobile */}
      <div className="flex-none lg:hidden">
        <label htmlFor="app-drawer" className="btn btn-ghost">
          <Menu size={20} />
        </label>
      </div>

      {/* Logo */}
      <div className="flex-1">
        <Link to="/dashboard" className="text-lg font-semibold">Easy Stock</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center flex-none gap-2">
        <button className="btn btn-ghost" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <Link to="/profile" className="hidden btn btn-ghost md:inline-flex"><User size={18}/></Link>
        <Link to="/settings" className="hidden btn btn-ghost md:inline-flex"><Settings size={18}/></Link>
        <button className="hidden ml-2 btn btn-outline btn-sm md:inline-flex" onClick={logout}>
          <LogOut size={16}/> Déconnexion
        </button>
      </div>
    </div>
  )
}
