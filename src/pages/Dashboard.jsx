import DashboardCard from '../components/DashboardCard.jsx'
import { useEffect, useState } from 'react'
import * as api from '../services/api.js'

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, suppliers: 0 })

  useEffect(() => {
    Promise.all([api.listProducts(), api.listOrders(), api.listSuppliers()])
      .then(([p, o, s]) => setStats({ products: p.length, orders: o.length, suppliers: s.length }))
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3,">
      <DashboardCard title="Produits" value={stats.products} hint="Total en catalogue" />
      <DashboardCard title="Commandes" value={stats.orders} hint="Toutes périodes" />
      <DashboardCard title="Fournisseurs" value={stats.suppliers} hint="Actifs" />
    </div>
  )
}
