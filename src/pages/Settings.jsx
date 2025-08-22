import { useEffect, useState } from 'react'

export default function Settings() {
  const [twoFA, setTwoFA] = useState(() => localStorage.getItem('scm_2fa') === 'on')
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light')

  useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme) }, [theme])

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-xl font-semibold">Paramètres</h2>
      <div className="p-4 space-y-3 shadow card bg-base-100 shadow-black">
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Authentification à 2 facteurs</span>
            <input type="checkbox" className="toggle" checked={twoFA}
              onChange={e=>{ const v=e.target.checked; setTwoFA(v); localStorage.setItem('scm_2fa', v?'on':'off') }}/>
          </label>
        </div>
        <div className="form-control">
          <label className="label">Thème</label>
          <select className="select select-bordered, shadow" value={theme} onChange={e=>{ setTheme(e.target.value); localStorage.setItem('scm_theme', e.target.value) }}>
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>
      </div>
    </div>
  )
}
