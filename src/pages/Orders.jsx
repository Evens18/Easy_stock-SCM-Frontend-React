import { useEffect, useState } from 'react'
import * as api from '../services/api.js'

export default function Orders() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ number: '', status: 'En cours', total: 0 })
  const [loading, setLoading] = useState(false)

  const load = async () => setItems(await api.listOrders())
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    await api.createOrder({ ...form, total: Number(form.total) })
    setForm({ number: '', status: 'En cours', total: 0 })
    await load(); setLoading(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Commandes</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>#</th><th>Statut</th><th>Total</th></tr></thead>
            <tbody>
              {items.map(o=>(
                <tr key={o.id}><td>{o.number}</td><td>{o.status}</td><td>{o.total}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Nouvelle commande</h2>
        <form className="p-4 space-y-3 shadow card bg-base-100 shadow-black" onSubmit={submit}>
          <input className="w-full input input-bordered, shadow" placeholder="Numéro de commande" value={form.number} onChange={e=>setForm(f=>({...f,number:e.target.value}))} required/>
          <select className="w-full select select-bordered, shadow" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
            <option>En cours</option><option>Livrée</option><option>Annulée</option>
          </select>
          <input className="w-full input input-bordered, shadow" placeholder="Total" type="number" value={form.total} onChange={e=>setForm(f=>({...f,total:e.target.value}))} required/>
          <button className={`btn btn-primary ${loading?'btn-disabled':''}, shadow-sky-950`} type="submit">{loading?'Création...':'Créer'}</button>
        </form>
      </div>
    </div>
  )
}
