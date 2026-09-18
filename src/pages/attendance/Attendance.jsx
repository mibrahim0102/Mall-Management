import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import {
  addAttendance,
  updateAttendance,
  deleteAttendance
} from '../../redux/slices/attendanceSlice'

function Attendance() {
  const dispatch = useDispatch()

  const attendance = useSelector(
    (state) => state.attendance.attendance
  )

  const [employee, setEmployee] = useState('')
  const [date, setDate] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [status, setStatus] = useState('present')

  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [editId, setEditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!employee || !date || !checkIn || !checkOut) {
      setError('please fill all fields')
      return
    }

    setError('')

    const attendanceData = {
      id: editId || (
        attendance.reduce(
          (highestId, record) =>
            Math.max(highestId, Number(record.id) || 0),
          0
        ) + 1
      ),
      employee,
      date,
      checkIn,
      checkOut,
      status
    }

    if (editId) {
      dispatch(updateAttendance(attendanceData))
      setEditId(null)
    } else {
      dispatch(addAttendance(attendanceData))
    }

    setEmployee('')
    setDate('')
    setCheckIn('')
    setCheckOut('')
    setStatus('present')
  }

  const handleEdit = (record) => {
    setEditId(record.id)
    setEmployee(record.employee)
    setDate(record.date)
    setCheckIn(record.checkIn)
    setCheckOut(record.checkOut)
    setStatus(record.status)
    setError('')
  }

  const handleDelete = (id) => {
    dispatch(deleteAttendance(id))
  }

  const handleCancel = () => {
    setEditId(null)
    setEmployee('')
    setDate('')
    setCheckIn('')
    setCheckOut('')
    setStatus('present')
    setError('')
  }

  const filteredAttendance = attendance.filter((record) =>
    record.employee.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>

      <div className="mb-4">
        <h2>Employee Attendance</h2>
        <p className="text-muted">
          Manage Employee Check-In Records
        </p>
      </div>

      <div className="card mb-4">
        <div className="card-body">

          <h5 className="mb-3">
            {editId ? 'Edit Attendance' : 'Add Attendance'}
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
                  employee
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Employee Name"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  check-in time
                </label>

                <input
                  type="time"
                  className="form-control"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  check-out time
                </label>

                <input
                  type="time"
                  className="form-control"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
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
                  <option value="present">present</option>
                  <option value="absent">absent</option>
                  <option value="late">late</option>
                  <option value="leave">leave</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
            >
              {editId ? 'Update Attendance' : 'Add Attendance'}
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
            search attendance
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
            attendance records
          </h5>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>
                <tr>
                  <th>id</th>
                  <th>employee</th>
                  <th>date</th>
                  <th>check-in</th>
                  <th>check-out</th>
                  <th>status</th>
                  <th>action</th>
                </tr>
              </thead>

              <tbody>

                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record) => (
                    <tr key={record.id}>

                      <td>{record.id}</td>
                      <td>{record.employee}</td>
                      <td>{record.date}</td>
                      <td>{record.checkIn}</td>
                      <td>{record.checkOut}</td>

                      <td>
                        <span
                          className={
                            record.status === 'present'
                              ? 'badge bg-success'
                              : record.status === 'late'
                                ? 'badge bg-warning text-dark'
                                : 'badge bg-secondary'
                          }
                        >
                          {record.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(record)}
                        >
                          edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(record.id)}
                        >
                          delete
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center text-muted"
                    >
                      no attendance records found
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

export default Attendance