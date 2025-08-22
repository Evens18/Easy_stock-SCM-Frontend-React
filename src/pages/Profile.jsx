import { useAuth } from '../hooks/useAuth.js'
import { LogOut } from 'lucide-react'

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-xl font-semibold">Profil</h2>

      <div className="p-4 shadow card bg-base-100, shadow-black">
        <div><span className="font-medium">Nom: </span>{user?.name || '—'}</div>
        <div><span className="font-medium">Email: </span>{user?.email || '—'}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="btn btn-outline btn-sm, shadow"
          onClick={logout}
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    </div>
  )
}
