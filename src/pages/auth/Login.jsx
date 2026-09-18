import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  getRegisteredUsers,
  normalizeEmail
} from '../../services/auth'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // handle login
  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('please enter email and password')
      return
    }

    const normalizedEmail = normalizeEmail(email)
    const registeredUsers = getRegisteredUsers()
    const registeredUser = registeredUsers.find(
      (user) =>
        user.email === normalizedEmail &&
        user.password === password
    )

    if (!registeredUser) {
      setError('invalid email or password. please register first.')
      return
    }

    setError('')

    // Registered users go directly to the dashboard.
    navigate('/dashboard')
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <h2 className="mb-4">Login</h2>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {location.state?.message && !error && (
            <div className="alert alert-success">
              {location.state.message}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login