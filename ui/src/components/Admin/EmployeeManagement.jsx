import { useState, useEffect } from 'react'
import { apiService } from '../../services/api'

const EmployeeManagement = () => {
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('')
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch employees from API on mount
  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const data = await apiService.getEmployees()
      setEmployees(Array.isArray(data.employees) ? data.employees : [])
      // Debug: log employees and loading state
      console.log('Fetched employees:', data)
    } catch (err) {
      console.error('Failed to fetch employees:', err)
      setEmployees([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleAddEmployee = async () => {
    if (newEmployeeEmail) {
      setLoading(true)
      try {
        await apiService.createEmployee({
          email: newEmployeeEmail,
          name: newEmployeeEmail.split('@')[0],
          status: 'active'
        })
        setNewEmployeeEmail('')
        await fetchEmployees() // Always fetch fresh data after add
      } catch (err) {
        console.error('Failed to add employee:', err)
      }
      setLoading(false)
    }
  }

  const handleRemoveEmployee = async (employeeId) => {
    setLoading(true)
    try {
      await apiService.deactivateEmployee(employeeId)
      await fetchEmployees() // Refresh employee list after removal
    } catch (err) {
      console.error('Failed to remove employee:', err)
    }
    setLoading(false)
  }

  // Debug: log employees and loading state on every render
  // Remove this in production
  console.log('Render:', { employees, loading })

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Employee Management</h3>
      <div className="mb-4">
        <div className="flex space-x-4">
          <input
            type="email"
            placeholder="Add new employee email"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={newEmployeeEmail}
            onChange={(e) => setNewEmployeeEmail(e.target.value)}
            disabled={loading}
          />
          <button 
            onClick={handleAddEmployee}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            disabled={loading}
          >
            Send Invite
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {loading && employees.length === 0 ? (
          <div className="text-gray-500">Loading...</div>
        ) : employees.length === 0 ? (
          <div className="text-gray-500">No employees found.</div>
        ) : (
          employees.map(employee => (
            <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {employee.name?.charAt(0).toUpperCase() || employee.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold">{employee.name}</h4>
                  <p className="text-sm text-gray-600">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  employee.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {employee.status}
                </span>
                <button 
                  onClick={() => handleRemoveEmployee(employee.id)}
                  className="text-red-500 hover:text-red-700"
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EmployeeManagement