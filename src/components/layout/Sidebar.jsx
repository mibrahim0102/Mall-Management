import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="sidebar">

      <h4 className="sidebar-title">
        Mall Management
      </h4>

      <nav>

        <NavLink to="/dashboard" className="sidebar-link">
          <i className="bi bi-speedometer2"></i>
          Dashboard
        </NavLink>

        <NavLink to="/brands" className="sidebar-link">
          <i className="bi bi-tags"></i>
          Brands
        </NavLink>

        <NavLink to="/outlets" className="sidebar-link">
          <i className="bi bi-shop"></i>
          Outlets
        </NavLink>

        <NavLink to="/employees" className="sidebar-link">
          <i className="bi bi-people"></i>
          Employees
        </NavLink>

        <NavLink to="/attendance" className="sidebar-link">
          <i className="bi bi-calendar-check"></i>
          Attendance
        </NavLink>

        <NavLink to="/tasks" className="sidebar-link">
          <i className="bi bi-list-task"></i>
          Tasks
        </NavLink>

        <NavLink to="/reports" className="sidebar-link">
          <i className="bi bi-bar-chart"></i>
          Reports
        </NavLink>

      </nav>

    </div>
  )
}

export default Sidebar