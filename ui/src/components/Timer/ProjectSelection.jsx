const ProjectSelection = ({ selectedProject, onSelectProject, projects = [], loading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Select Project</h3>
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="space-y-3">
          {(Array.isArray(projects) ? projects : []).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedProject?.id === project.id
                  ? 'bg-indigo-100 border-2 border-indigo-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color || '#3B82F6' }}></div>
                <div>
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectSelection