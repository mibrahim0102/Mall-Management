import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import StatCard from '../../components/dashboard/StatCard'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

function Reports() {
  const brands = useSelector(
    (state) => state.brands.brands
  )

  const outlets = useSelector(
    (state) => state.outlets.outlets
  )

  const employees = useSelector(
    (state) => state.employees.employees
  )

  const attendance = useSelector(
    (state) => state.attendance.attendance
  )

  const tasks = useSelector(
    (state) => state.tasks.tasks
  )

  const activeEmployees = employees.filter(
    (employee) => employee.status === 'active'
  ).length

  const inactiveEmployees =
    employees.length - activeEmployees

  const presentEmployees = attendance.filter(
    (record) => record.status === 'present'
  ).length

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed'
  ).length

  const pendingTasks = tasks.filter(
    (task) => task.status === 'pending'
  ).length

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in progress'
  ).length

  const activeOutlets = outlets.filter(
    (outlet) => outlet.status === 'active'
  ).length

  const departmentData = []

  employees.forEach((employee) => {
    const department = employee.department.trim()
    const normalizedDepartment = department.toLowerCase()

    const existingDepartment =
      departmentData.find(
        (item) =>
          item.department.toLowerCase() === normalizedDepartment
      )

    if (existingDepartment) {
      existingDepartment.employees += 1
    } else {
      departmentData.push({
        department,
        employees: 1
      })
    }
  })

  const employeeStatusData = [
    {
      name: 'active',
      value: activeEmployees
    },
    {
      name: 'inactive',
      value: inactiveEmployees
    }
  ]

  const taskData = [
    {
      name: 'pending',
      value: pendingTasks
    },
    {
      name: 'in progress',
      value: inProgressTasks
    },
    {
      name: 'completed',
      value: completedTasks
    }
  ]

  const employeeColors = [
    '#0d6efd',
    '#20c997',
    '#ffc107',
    '#dc3545',
    '#6f42c1'
  ]

  const taskColors = [
    '#6c757d',
    '#ffc107',
    '#198754'
  ]

  return (
    <AdminLayout>

      <div className="mb-4">
        <h2>Reports & Analytics</h2>

        <p className="text-muted">
          View Mall Management Reports And Statistics
        </p>
      </div>

      <div className="row">

        <StatCard
          title="Total Brands"
          value={brands.length}
          icon="bi-tags"
        />

        <StatCard
          title="Active Outlets"
          value={activeOutlets}
          icon="bi-shop"
        />

        <StatCard
          title="Total Employees"
          value={employees.length}
          icon="bi-people"
        />

        <StatCard
          title="Present Employees"
          value={presentEmployees}
          icon="bi-calendar-check"
        />

        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          icon="bi-check-circle"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon="bi-clock"
        />

      </div>

      <div className="row mt-3">

        <div className="col-lg-8 mb-4">

          <div className="card dashboard-chart h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                  <h5 className="mb-1">
                    Employee Statistics
                  </h5>

                  <small className="text-muted">
                    Employee Distribution by Department
                  </small>
                </div>

                <span className="badge bg-primary">
                  {employees.length} Total
                </span>

              </div>

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <BarChart
                  data={departmentData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 10
                  }}
                >

                  <XAxis
                    dataKey="department"
                  />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="employees"
                    name="employees"
                    animationDuration={1200}
                    radius={[6, 6, 0, 0]}
                  >

                    {departmentData.map(
                      (entry, index) => (
                        <Cell
                          key={entry.department}
                          fill={
                            employeeColors[
                              index %
                              employeeColors.length
                            ]
                          }
                        />
                      )
                    )}

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <div className="col-lg-4 mb-4">

          <div className="card dashboard-chart h-100">

            <div className="card-body">

              <h5 className="mb-1">
                Employee Status
              </h5>

              <small className="text-muted">
                Active and Inactive Employees
              </small>

              <ResponsiveContainer
                width="100%"
                height={280}
              >

                <PieChart>

                  <Pie
                    data={employeeStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                    animationDuration={1200}
                  >

                    {employeeStatusData.map(
                      (entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={
                            index === 0
                              ? '#198754'
                              : '#dc3545'
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

              <div className="row text-center">

                <div className="col-6">
                  <h4 className="text-success">
                    {activeEmployees}
                  </h4>

                  <small className="text-muted">
                    Active
                  </small>
                </div>

                <div className="col-6">
                  <h4 className="text-danger">
                    {inactiveEmployees}
                  </h4>

                  <small className="text-muted">
                    Inactive
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="row">

        <div className="col-lg-6 mb-4">

          <div className="card dashboard-chart">

            <div className="card-body">

              <h5 className="mb-1">
                Task Statistics
              </h5>

              <small className="text-muted">
                Current Task Distribution
              </small>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <PieChart>

                  <Pie
                    data={taskData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                    animationDuration={1200}
                  >

                    {taskData.map(
                      (entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={taskColors[index]}
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <div className="col-lg-6 mb-4">

          <div className="card">

            <div className="card-body">

              <h5 className="mb-3">
                Employee Overview
              </h5>

              <div className="row text-center">

                <div className="col-6 mb-4">
                  <div className="p-3 bg-light rounded">
                    <i className="bi bi-people fs-3 text-primary"></i>

                    <h4 className="mt-2">
                      {employees.length}
                    </h4>

                    <small className="text-muted">
                      total employees
                    </small>
                  </div>
                </div>

                <div className="col-6 mb-4">
                  <div className="p-3 bg-light rounded">
                    <i className="bi bi-person-check fs-3 text-success"></i>

                    <h4 className="mt-2">
                      {activeEmployees}
                    </h4>

                    <small className="text-muted">
                      active employees
                    </small>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 bg-light rounded">
                    <i className="bi bi-calendar-check fs-3 text-info"></i>

                    <h4 className="mt-2">
                      {presentEmployees}
                    </h4>

                    <small className="text-muted">
                      present today
                    </small>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 bg-light rounded">
                    <i className="bi bi-diagram-3 fs-3 text-warning"></i>

                    <h4 className="mt-2">
                      {departmentData.length}
                    </h4>

                    <small className="text-muted">
                      departments
                    </small>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  )
}

export default Reports