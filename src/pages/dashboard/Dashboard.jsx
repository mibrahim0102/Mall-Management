import { useSelector } from 'react-redux'
import AdminLayout from '../../components/layout/AdminLayout'
import StatCard from '../../components/dashboard/StatCard'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function Dashboard() {
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

  const pendingTasks = tasks.filter(
    (task) => task.status === 'pending'
  ).length

  const activeOutlets = outlets.filter(
    (outlet) => outlet.status === 'active'
  ).length

  const employeeChartData = [
    {
      name: 'total employees',
      value: employees.length,
      fill: '#0d6efd'
    },
    {
      name: 'active employees',
      value: activeEmployees,
      fill: '#198754'
    },
    {
      name: 'present today',
      value: presentEmployees,
      fill: '#20c997'
    },
    {
      name: 'inactive employees',
      value: inactiveEmployees,
      fill: '#dc3545'
    }
  ]

  return (
    <AdminLayout>

      <div className="mb-4">
        <h2>Dashboard</h2>

        <p className="text-muted">
          Welcome To Mall Management System
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
          title="Today's Attendance"
          value={presentEmployees}
          icon="bi-calendar-check"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon="bi-list-task"
        />

      </div>

      <div className="card dashboard-chart mt-3">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h5 className="mb-1">
                Employee Analytics
              </h5>

              <small className="text-muted">
                Real-Time Workforce Overview
              </small>
            </div>

            <span className="badge bg-primary px-3 py-2">
              Live Data
            </span>

          </div>

          <div className="row align-items-center">

            <div className="col-lg-7">

              <div className="employee-chart-wrapper">

                <ResponsiveContainer
                  width="100%"
                  height={380}
                >

                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="25%"
                    outerRadius="90%"
                    barSize={18}
                    data={employeeChartData}
                    startAngle={90}
                    endAngle={-270}
                  >

                    <PolarAngleAxis
                      type="number"
                      domain={[
                        0,
                        Math.max(employees.length, 1)
                      ]}
                      tick={false}
                    />

                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                      animationDuration={1800}
                      animationBegin={200}
                    />

                    <Tooltip />

                  </RadialBarChart>

                </ResponsiveContainer>

                <div className="employee-chart-center">

                  <div className="employee-total">
                    {employees.length}
                  </div>

                  <div className="employee-total-label">
                    Total Employees
                  </div>


                </div>

              </div>

            </div>

            <div className="col-lg-5">

              <div className="employee-stat-box">

                <div className="employee-stat-icon bg-primary">
                  <i className="bi bi-people"></i>
                </div>

                <div>
                  <small className="text-muted">
                    Total Employees
                  </small>

                  <h4>
                    {employees.length}
                  </h4>
                </div>

              </div>

              <div className="employee-stat-box">

                <div className="employee-stat-icon bg-success">
                  <i className="bi bi-person-check"></i>
                </div>

                <div>
                  <small className="text-muted">
                    Active Employees
                  </small>

                  <h4>
                    {activeEmployees}
                  </h4>
                </div>

              </div>

              <div className="employee-stat-box">

                <div className="employee-stat-icon bg-info">
                  <i className="bi bi-calendar-check"></i>
                </div>

                <div>
                  <small className="text-muted">
                    Present Today
                  </small>

                  <h4>
                    {presentEmployees}
                  </h4>
                </div>

              </div>

              <div className="employee-stat-box">

                <div className="employee-stat-icon bg-danger">
                  <i className="bi bi-person-x"></i>
                </div>

                <div>
                  <small className="text-muted">
                    Inactive Employees
                  </small>

                  <h4>
                    {inactiveEmployees}
                  </h4>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="card mt-4">

        <div className="card-body">

          <h5 className="mb-3">
            Recent Activities
          </h5>

          <div className="border-bottom py-2">
            New Brand Added - Nike
          </div>

          <div className="border-bottom py-2">
            Employee Added - Ahmed Khan
          </div>

          <div className="border-bottom py-2">
            Task Assigned To Development Team
          </div>

          <div className="py-2">
            Outlet Updated - Shop 204
          </div>

        </div>

      </div>

    </AdminLayout>
  )
}

export default Dashboard