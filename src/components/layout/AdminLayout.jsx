import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="main-section">

        <TopNavbar />

        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  )
}

export default AdminLayout