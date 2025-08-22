import { Link, useLocation } from 'react-router-dom'
import { Package, ShoppingCart, Factory, User, Settings, Activity } from 'lucide-react'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: Activity },
  { to: '/products', label: 'Produits', icon: Package },
  { to: '/orders', label: 'Commandes', icon: ShoppingCart },
  { to: '/suppliers', label: 'Fournisseurs', icon: Factory },
  { to: '/profile', label: 'Profil', icon: User },
  { to: '/settings', label: 'Paramètres', icon: Settings },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  const handleClick = () => {
    const drawer = document.getElementById('app-drawer')
    if (drawer) drawer.checked = false
  }

  return (
    <ul className="w-64 min-h-full p-4 transition-all duration-300 ease-in-out border-r menu bg-base-200">
      {items.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <Link
            to={to}
            onClick={handleClick}
            className={`flex items-center gap-2 ${
              pathname === to ? 'active font-semibold' : ''
            }`}
          >
            <Icon size={18} /> <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}



