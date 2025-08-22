export default function DashboardCard({ title, value, hint }) {
  return (
    <div className="shadow card bg-base-100 shadow-black ">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
        {hint && <p className="text-sm opacity-70">{hint}</p>}
      </div>
    </div>
  )
}
