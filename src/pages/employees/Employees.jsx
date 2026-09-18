import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import {
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '../../redux/slices/employeeSlice'

function Employees() {
  const dispatch = useDispatch()

  const employees = useSelector(
    (state) => state.employees.employees
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [brand, setBrand] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('active')

  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [editId, setEditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !department || !brand || !phone) {
      setError('please fill all fields')
      return
    }

    setError('')

    const employeeData = {
      id: editId || (
        employees.reduce(
          (highestId, employee) =>
            Math.max(highestId, Number(employee.id) || 0),
          0
        ) + 1
      ),
      name,
      email,
      department,
      brand,
      phone,
      status
    }

    if (editId) {
      dispatch(updateEmployee(employeeData))
      setEditId(null)
    } else {
      dispatch(addEmployee(employeeData))
    }

    setName('')
    setEmail('')
    setDepartment('')
    setBrand('')
    setPhone('')
    setStatus('active')
  }

  const handleEdit = (employee) => {
    setEditId(employee.id)
    setName(employee.name)
    setEmail(employee.email)
    setDepartment(employee.department)
    setBrand(employee.brand)
    setPhone(employee.phone)
    setStatus(employee.status)
    setError('')
  }

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id))
  }

  const handleCancel = () => {
    setEditId(null)
    setName('')
    setEmail('')
    setDepartment('')
    setBrand('')
    setPhone('')
    setStatus('active')
    setError('')
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>

      <div className="mb-4">
        <h2>Employees</h2>
        <p className="text-muted">
          Manage Mall Employees
        </p>
      </div>

      <div className="card mb-4">
        <div className="card-body">

          <h5 className="mb-3">
            {editId ? 'Edit Employee' : 'Add Employee'}
          </h5>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  employee name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Employee Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  department
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  assigned brand
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  phone
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
            >
              {editId ? 'Update Employee' : 'Add Employee'}
            </button>

            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                cancel
              </button>
            )}

          </form>

        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">

          <label className="form-label">
            search employees
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="search by employee name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>

      <div className="card">
        <div className="card-body">

          <h5 className="mb-3">
            employee list
          </h5>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>email</th>
                  <th>department</th>
                  <th>brand</th>
                  <th>phone</th>
                  <th>status</th>
                  <th>action</th>
                </tr>
              </thead>

              <tbody>

                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>

                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.department}</td>
                      <td>{employee.brand}</td>
                      <td>{employee.phone}</td>

                      <td>
                        <span
                          className={
                            employee.status === 'active'
                              ? 'badge bg-success'
                              : 'badge bg-secondary'
                          }
                        >
                          {employee.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(employee)}
                        >
                          edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(employee.id)}
                        >
                          delete
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center text-muted"
                    >
                      no employees found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </AdminLayout>
  )
}

export default Employees