import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import {
  addTask,
  updateTask,
  deleteTask
} from '../../redux/slices/taskSlice'

function Tasks() {
  const dispatch = useDispatch()

  const tasks = useSelector(
    (state) => state.tasks.tasks
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [employee, setEmployee] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')

  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [editId, setEditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !description || !employee || !dueDate) {
      setError('please fill all fields')
      return
    }

    setError('')

    const taskData = {
      id: editId || (
        tasks.reduce(
          (highestId, task) =>
            Math.max(highestId, Number(task.id) || 0),
          0
        ) + 1
      ),
      title,
      description,
      employee,
      priority,
      dueDate,
      status
    }

    if (editId) {
      dispatch(updateTask(taskData))
      setEditId(null)
    } else {
      dispatch(addTask(taskData))
    }

    setTitle('')
    setDescription('')
    setEmployee('')
    setPriority('medium')
    setDueDate('')
    setStatus('pending')
  }

  const handleEdit = (task) => {
    setEditId(task.id)
    setTitle(task.title)
    setDescription(task.description)
    setEmployee(task.employee)
    setPriority(task.priority)
    setDueDate(task.dueDate)
    setStatus(task.status)
    setError('')
  }

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }

  const handleCancel = () => {
    setEditId(null)
    setTitle('')
    setDescription('')
    setEmployee('')
    setPriority('medium')
    setDueDate('')
    setStatus('pending')
    setError('')
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>

      <div className="mb-4">
        <h2>Task Assignment</h2>
        <p className="text-muted">
          Assign And Manage Employee Tasks
        </p>
      </div>

      <div className="card mb-4">
        <div className="card-body">

          <h5 className="mb-3">
            {editId ? 'Edit Task' : 'Assign Task'}
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
                  task title
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-md-8 mb-3">
                <label className="form-label">
                  description
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  employee
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee Name"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  priority
                </label>

                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">
                  due date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
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
                  <option value="pending">Pending</option>
                  <option value="in progress">in progress</option>
                  <option value="completed">completed</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
            >
              {editId ? 'Update Task' : 'Assign Task'}
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
            search tasks
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="search by task title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>

      <div className="card">
        <div className="card-body">

          <h5 className="mb-3">
            task list
          </h5>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>employee</th>
                  <th>priority</th>
                  <th>due date</th>
                  <th>status</th>
                  <th>action</th>
                </tr>
              </thead>

              <tbody>

                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <tr key={task.id}>

                      <td>{task.id}</td>
                      <td>{task.title}</td>
                      <td>{task.employee}</td>

                      <td>
                        <span
                          className={
                            task.priority === 'high'
                              ? 'badge bg-danger'
                              : task.priority === 'medium'
                                ? 'badge bg-warning text-dark'
                                : 'badge bg-success'
                          }
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td>{task.dueDate}</td>

                      <td>
                        <span
                          className={
                            task.status === 'completed'
                              ? 'badge bg-success'
                              : task.status === 'in progress'
                                ? 'badge bg-warning text-dark'
                                : 'badge bg-secondary'
                          }
                        >
                          {task.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(task)}
                        >
                          edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(task.id)}
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
                      no tasks found
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

export default Tasks