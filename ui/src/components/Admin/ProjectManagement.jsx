import { useState, useEffect } from 'react'
import { apiService } from '../../services/api'

const ProjectManagement = () => {
  const [newProject, setNewProject] = useState({ name: '', description: '' })
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch projects from API on mount
  const fetchProjects = async () => {
    setLoading(true)
    try {
      const data = await apiService.getProjects()
      console.log(data);
      setProjects(Array.isArray(data.projects) ? data.projects : [])
      
    } catch (err) {
      console.error('Failed to fetch projects:', err)
      setProjects([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreateProject = async () => {
    if (newProject.name) {
      setLoading(true)
      try {
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`
        await apiService.createProject({
          ...newProject,
          color
        })
        await fetchProjects() // Always fetch fresh data after add
        setNewProject({ name: '', description: '' })
      } catch (err) {
        console.error('Failed to create project:', err)
      }
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Project Management</h3>
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Project name"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={newProject.name}
            onChange={(e) => setNewProject({...newProject, name: e.target.value})}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Description"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            disabled={loading}
          />
          <button 
            onClick={handleCreateProject}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            disabled={loading}
          >
            Create Project
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {loading && projects.length === 0 ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }}></div>
                <div>
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-indigo-500 hover:text-indigo-700" disabled>Edit</button>
                <button className="text-red-500 hover:text-red-700" disabled>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProjectManagement