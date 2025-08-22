import { useEffect, useState } from 'react'
import * as api from '../services/api.js'

export default function Products() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', sku: '', stock: 0, supplierId: 1 })
  const [loading, setLoading] = useState(false)

  const load = async () => setItems(await api.listProducts())
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    await api.createProduct({ ...form, stock: Number(form.stock) })
    setForm({ name: '', sku: '', stock: 0, supplierId: 1 })
    await load(); setLoading(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Produits</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>ID</th><th>Nom</th><th>SKU</th><th>Stock</th></tr></thead>
            <tbody>
              {items.map(p=>(
                <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.sku}</td><td>{p.stock}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Ajouter un produit</h2>
        <form className="p-4 space-y-3 shadow card bg-base-100 shadow-black" onSubmit={submit}>
          <input className="w-full input input-bordered, shadow" placeholder="Nom" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/>
          <input className="w-full input input-bordered, shadow" placeholder="SKU" value={form.sku} onChange={e=>setForm(f=>({...f,sku:e.target.value}))} required/>
          <input className="w-full input input-bordered, shadow" placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))} required/>
          <input className="w-full input input-bordered, shadow" placeholder="ID fournisseur" type="number" value={form.supplierId} onChange={e=>setForm(f=>({...f,supplierId:Number(e.target.value)}))} required/>
          <button className={`btn btn-primary ${loading?'btn-disabled':''}, shadow-sky-950`} type="submit">{loading?'Ajout...':'Ajouter'}</button>
        </form>
      </div>
    </div>
  )
}
