import { useState, useEffect } from 'react'
import TimerDisplay from './TimerDisplay'
import ProjectSelection from './ProjectSelection'
import TaskSelection from './TaskSelection'
import { apiService } from '../../services/api'

const Timer = ({
  currentTime,
  isTracking,
  selectedProject,
  setSelectedProject,
  selectedTask,
  setSelectedTask,
  onStart,
  onPause,
  onStop
}) => {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [loadingTasks, setLoadingTasks] = useState(false)

  useEffect(() => {
    apiService.getProjects().then((data) => {
      setProjects(data.projects)
      setLoadingProjects(false)
    })
  }, [])

  useEffect(() => {
    if (selectedProject && selectedProject.id) {
      setLoadingTasks(true)
      apiService.getTasks(selectedProject.id).then((data) => {
        setTasks(data.tasks)
        setLoadingTasks(false)
      })
    } else {
      setTasks([])
    }
  }, [selectedProject])

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
    setSelectedTask(null)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <TimerDisplay 
        currentTime={currentTime}
        isTracking={isTracking}
        selectedTask={selectedTask}
        onStart={onStart}
        onPause={onPause}
        onStop={onStop}
      />
      <ProjectSelection 
        selectedProject={selectedProject}
        onSelectProject={handleProjectSelect}
        projects={projects}
        loading={loadingProjects}
      />
      {selectedProject && (
        <TaskSelection 
          selectedProject={selectedProject}
          selectedTask={selectedTask}
          onSelectTask={setSelectedTask}
          tasks={tasks}
          loading={loadingTasks}
        />
      )}
    </div>
  )
}

export default Timer
