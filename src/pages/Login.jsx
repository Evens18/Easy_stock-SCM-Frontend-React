import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@easy.stock')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null); setLoading(true)
    try { await login(email, password) } 
    catch (err) { setError(err.message || 'Erreur de connexion') }
    finally { setLoading(false) }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md shadow-xl card bg-base-100">
        <div className="flex flex-col items-center w-full card-body">
          <h2 className="mb-4 text-2xl font-bold card-title">Connexion</h2>
          
          <form className="w-full space-y-3" onSubmit={onSubmit}>
            <input 
              className="w-full input input-bordered, shadow"
              type="email" 
              placeholder="Email"
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              required 
            />
            
            <input 
              className="w-full input input-bordered, shadow"
              type="password" 
              placeholder="Mot de passe"
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              required 
            />
            
            {error && <div className="text-sm alert alert-error">{error}</div>}
            
            <button 
              className="w-full btn btn-primary" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="divider">ou</div>

          <button className="w-full btn btn-outline, shadow">Continuer avec Google</button>
          <a className="mt-2 text-center link">Mot de passe oublié ?</a>
        </div>
      </div>
    </div>
  )
}
