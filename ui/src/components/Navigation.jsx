import { Clock, BarChart3, Users, Settings } from 'lucide-react'

const Navigation = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', icon: <Clock size={20} />, label: 'Dashboard' },
    { id: 'timer', icon: <Clock size={20} />, label: 'Timer' },
    { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { id: 'admin', icon: <Settings size={20} />, label: 'Admin' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-indigo-600">TimeTrack</span>
          </div>
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${
                  currentView === item.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation