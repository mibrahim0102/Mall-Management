import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm border-0 text-center p-4 p-md-5 w-100" style={{ maxWidth: '560px' }}>
        <div className="card-body">
          <i className="bi bi-building fs-1 text-primary"></i>

          <h1 className="mt-3 mb-3">
            Mall Management System
          </h1>

          <p className="text-muted mb-4">
            Manage Your Mall, Brands, Outlets, Employees, And Tasks In One Place.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/login" className="btn btn-primary px-4">
              Sign In
            </Link>

            <Link to="/register" className="btn btn-outline-success px-4">
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
