import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getRegisteredUsers,
  normalizeEmail,
  saveRegisteredUsers
} from '../../services/auth'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState('')
  const [error, setError] = useState('')

  // handle register
  const handleRegister = (e) => {
    e.preventDefault()

    if (!name || !email || !password || !accountType) {
      setError('please fill all fields, including account type')
      return
    }

    const normalizedEmail = normalizeEmail(email)
    const registeredUsers = getRegisteredUsers()
    const userAlreadyExists = registeredUsers.some(
      (user) => user.email === normalizedEmail
    )

    if (userAlreadyExists) {
      setError('an account with this email already exists')
      return
    }

    saveRegisteredUsers([
      ...registeredUsers,
      {
        name: name.trim(),
        email: normalizedEmail,
        password,
        accountType
      }
    ])

    setError('')

    // go to login
    navigate('/login', {
      state: {
        message: 'registration successful. please sign in.'
      }
    })
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <h2 className="mb-4">Register</h2>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <select
              className="form-select mb-3"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="">Select Account Type</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>

            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Register
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Register