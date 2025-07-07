import Navigation from './Navigation'
import Dashboard from './Dashboard'
import Timer from './Timer'
import Analytics from './Analytics'
import Admin from './Admin'
import { useState, useEffect, useRef } from 'react'

const MainLayout = ({ currentView, setCurrentView }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isTracking) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isTracking])

  const handleStart = () => {
    if (!selectedTask) return
    setIsTracking(true)
    // TODO: optionally trigger API call to start time entry
  }

  const handlePause = () => {
    setIsTracking(false)
    // TODO: optionally trigger API call to pause
  }

  const handleStop = () => {
    setIsTracking(false)
    setCurrentTime(0)
    // TODO: optionally trigger API call to stop + log time
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />
      case 'timer': return (
        <Timer
          currentTime={currentTime}
          isTracking={isTracking}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
        />
      )
      case 'analytics': return <Analytics />
      case 'admin': return <Admin />
      default: return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="pt-20 pb-10">
        {renderView()}
      </main>
    </div>
  )
}

export default MainLayout
