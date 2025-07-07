import EmployeeManagement from './EmployeeManagement'
import ProjectManagement from './ProjectManagement'
import TaskManagement from './TaskManagement'

const Admin = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">⚙️ Admin Dashboard</h2>
        <p className="opacity-90">Manage employees, projects, and system settings</p>
      </div>

      <EmployeeManagement />
      <ProjectManagement />
      <TaskManagement />
    </div>
  )
}

export default Admin