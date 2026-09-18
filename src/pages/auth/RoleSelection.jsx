import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RoleSelection() {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  // handle role selection
  const handleRole = () => {
    if (!role) {
      setError('please select a role')
      return
    }

    setError('')

    // go to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <h2 className="mb-4">Select Role</h2>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="d-flex gap-2 flex-wrap">

            <button
              className={`btn ${
                role === 'admin'
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => setRole('admin')}
            >
              admin
            </button>

            <button
              className={`btn ${
                role === 'manager'
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => setRole('manager')}
            >
              manager
            </button>

            <button
              className={`btn ${
                role === 'employee'
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => setRole('employee')}
            >
              employee
            </button>

          </div>

          <button
            className="btn btn-success mt-4"
            onClick={handleRole}
          >
            continue
          </button>

        </div>
      </div>
    </div>
  )
}

export default RoleSelection