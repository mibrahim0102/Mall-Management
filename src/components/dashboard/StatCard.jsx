function StatCard({ title, value, icon }) {
  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card stat-card h-100">
        <div className="card-body">

          <div className="stat-icon">
            <i className={`bi ${icon}`}></i>
          </div>

          <h6>{title}</h6>

          <h3>{value}</h3>

        </div>
      </div>
    </div>
  )
}

export default StatCard