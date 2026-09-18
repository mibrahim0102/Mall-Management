import { Routes, Route } from 'react-router-dom'



import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/dashboard/Dashboard'
import Brands from '../pages/brands/Brands'
import Outlets from '../pages/outlets/Outlets'
import Employees from '../pages/employees/Employees'
import Attendance from '../pages/attendance/Attendance'
import Tasks from '../pages/tasks/Tasks'
import Reports from '../pages/reports/Reports'
import Home from '../pages/Home'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/outlets" element={<Outlets />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
    
  )
}

export default AppRoutes