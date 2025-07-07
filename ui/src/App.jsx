import { useState } from 'react'
import MainLayout from './components/MainLayout'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  
  return (
    <MainLayout currentView={currentView} setCurrentView={setCurrentView} />
  )
}

export default App