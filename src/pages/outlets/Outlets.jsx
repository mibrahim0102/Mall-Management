import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import {
  addOutlet,
  updateOutlet,
  deleteOutlet
} from '../../redux/slices/outletSlice'

function Outlets() {
  const dispatch = useDispatch()

  const outlets = useSelector(
    (state) => state.outlets.outlets
  )

  const [name, setName] = useState('')
  const [floor, setFloor] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('active')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [editId, setEditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !floor || !category || !status) {
      setError('please fill all fields')
      return
    }

    setError('')

    if (editId) {
      dispatch(
        updateOutlet({
          id: editId,
          name,
          floor,
          category,
          status
        })
      )

      setEditId(null)
    } else {
      const nextOutletId =
        outlets.reduce(
          (highestId, outlet) =>
            Math.max(highestId, Number(outlet.id) || 0),
          0
        ) + 1

      dispatch(
        addOutlet({
          id: nextOutletId,
          name,
          floor,
          category,
          status
        })
      )
    }

    setName('')
    setFloor('')
    setCategory('')
    setStatus('active')
  }

  const handleEdit = (outlet) => {
    setEditId(outlet.id)
    setName(outlet.name)
    setFloor(outlet.floor)
    setCategory(outlet.category)
    setStatus(outlet.status)
    setError('')
  }

  const handleDelete = (id) => {
    dispatch(deleteOutlet(id))
  }

  const handleCancel = () => {
    setEditId(null)
    setName('')
    setFloor('')
    setCategory('')
    setStatus('active')
    setError('')
  }

  const filteredOutlets = outlets.filter((outlet) =>
    outlet.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>

      <div className="mb-4">
        <h2>Shops & Outlets</h2>
        <p className="text-muted">
          Manage Mall Shops And Outlets
        </p>
      </div>

      <div className="card mb-4">
        <div className="card-body">

          <h5 className="mb-3">
            {editId ? 'Edit Outlet' : 'Add Outlet'}
          </h5>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  shop name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Shop Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  floor
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Floor"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  category
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
            >
              {editId ? 'Update Outlet' : 'Add Outlet'}
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
            search outlets
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="search by shop name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>

      <div className="card">
        <div className="card-body">

          <h5 className="mb-3">
            outlet list
          </h5>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>
                <tr>
                  <th>id</th>
                  <th>shop name</th>
                  <th>floor</th>
                  <th>category</th>
                  <th>status</th>
                  <th>action</th>
                </tr>
              </thead>

              <tbody>

                {filteredOutlets.length > 0 ? (
                  filteredOutlets.map((outlet) => (
                    <tr key={outlet.id}>

                      <td>{outlet.id}</td>
                      <td>{outlet.name}</td>
                      <td>{outlet.floor}</td>
                      <td>{outlet.category}</td>

                      <td>
                        <span
                          className={
                            outlet.status === 'active'
                              ? 'badge bg-success'
                              : 'badge bg-secondary'
                          }
                        >
                          {outlet.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(outlet)}
                        >
                          edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(outlet.id)}
                        >
                          delete
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-muted"
                    >
                      no outlets found
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

export default Outlets