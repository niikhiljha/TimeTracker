import { Play, Pause, Square } from 'lucide-react'

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const TimerDisplay = ({ currentTime, isTracking, selectedTask, onStart, onPause, onStop }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl text-center">
      <div className="text-6xl font-mono font-bold text-indigo-700 mb-4">
        {formatTime(currentTime)}
      </div>
      <div className="text-lg text-indigo-600 mb-6">
        {isTracking 
          ? `Working on: ${selectedTask?.name || 'No task selected'}` 
          : 'Not tracking'}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onStart}
          disabled={!selectedTask || isTracking}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Play className="w-5 h-5" />
          <span>Start</span>
        </button>
        <button
          onClick={onPause}
          disabled={!isTracking}
          className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Pause className="w-5 h-5" />
          <span>Pause</span>
        </button>
        <button
          onClick={onStop}
          disabled={!isTracking}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Square className="w-5 h-5" />
          <span>Stop</span>
        </button>
      </div>
    </div>
  )
}

export default TimerDisplay