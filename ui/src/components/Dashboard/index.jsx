import { Clock, BarChart3, Users, TrendingUp, Eye } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { name: 'Total Hours Tracked', value: '142.5', icon: <Clock className="w-6 h-6" />, change: '+12%' },
    { name: 'Productivity Score', value: '87%', icon: <BarChart3 className="w-6 h-6" />, change: '+5%' },
    { name: 'Active Employees', value: '24', icon: <Users className="w-6 h-6" />, change: '+3' },
    { name: 'Projects Completed', value: '8', icon: <TrendingUp className="w-6 h-6" />, change: '+2' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">📊 Dashboard Overview</h2>
        <p className="opacity-90">Welcome back! Here's what's happening with your team today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Recent Activity</h3>
          <Eye className="w-6 h-6 text-gray-500" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <span className="font-bold">JD</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">John Doe completed a task</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <div className="text-sm text-indigo-600 font-medium">View</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard