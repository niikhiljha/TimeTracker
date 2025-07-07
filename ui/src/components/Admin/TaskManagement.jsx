import { useState, useEffect } from 'react'
import { apiService } from '../../services/api'

const TaskManagement = () => {
  const [newTask, setNewTask] = useState({ name: '', project_id: '' })
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [projectsData, tasksData] = await Promise.all([
        apiService.getProjects(),
        apiService.getTasks()
      ])
      setProjects(Array.isArray(projectsData.projects) ? projectsData.projects : [])
      setTasks(Array.isArray(tasksData.tasks) ? tasksData.tasks : [])
      console.log(tasksData)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateTask = async () => {
    if (newTask.name && newTask.project_id) {
      try {
        setIsLoading(true)
        await apiService.createTask({
          ...newTask,
          project_id: parseInt(newTask.project_id)
        })
        setNewTask({ name: '', project_id: '' })
        await fetchData() // Refresh after add
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

//   const handleDeleteTask = async (taskId) => {
//     try {
//       setIsLoading(true)
//       await apiService.deactivateEmployee(taskId) // Replace with correct task delete if needed
//       await fetchData() // Refresh after delete
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

  if (isLoading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Task Management</h3>
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Task name"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={newTask.name}
            onChange={(e) => setNewTask({...newTask, name: e.target.value})}
          />
          <select
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={newTask.project_id}
            onChange={(e) => setNewTask({...newTask, project_id: e.target.value})}
          >
            <option value="">Select Project</option>
            {(Array.isArray(projects) ? projects : []).map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <button 
            onClick={handleCreateTask}
            disabled={isLoading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          (Array.isArray(tasks) ? tasks : []).map(task => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold">{task.name}</h4>
                <p className="text-sm text-gray-600">
                  Project: {(Array.isArray(projects) ? projects : []).find(p => p.id === parseInt(task.project_id))?.name || 'Unknown'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {/* <button 
                  className="text-indigo-500 hover:text-indigo-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskManagement