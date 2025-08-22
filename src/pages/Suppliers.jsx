import { useEffect, useState } from 'react'
import * as api from '../services/api.js'

export default function Suppliers() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', contact: '' })
  const [loading, setLoading] = useState(false)

  const load = async () => setItems(await api.listSuppliers())
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    await api.createSupplier(form)
    setForm({ name: '', contact: '' })
    await load(); setLoading(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Fournisseurs</h2>
        <ul className="space-y-2">
          {items.map(s=>(
            <li key={s.id} className="p-4 shadow card bg-base-100, shadow-black">
              <div className="font-medium">{s.name}</div>
              <div className="text-sm opacity-70">{s.contact}</div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Ajouter un fournisseur</h2>
        <form className="p-4 space-y-3 shadow card bg-base-100 shadow-black" onSubmit={submit}>
          <input className="w-full input input-bordered, shadow" placeholder="Nom du fournisseur" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/>
          <input className="w-full input input-bordered, shadow" placeholder="Contact" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} required/>
          <button className={`btn btn-primary ${loading?'btn-disabled':''}, shadow`} type="submit">{loading?'Ajout...':'Ajouter'}</button>
        </form>
      </div>
    </div>
  )
}
