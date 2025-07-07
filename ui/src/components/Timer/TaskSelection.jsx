const TaskSelection = ({ selectedTask, onSelectTask, tasks, loading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Select Task</h3>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onSelectTask(task)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedTask?.id === task.id
                  ? 'bg-indigo-100 border-2 border-indigo-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <h4 className="font-semibold">{task.name}</h4>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tasks available for this project</p>
      )}
    </div>
  )
}

export default TaskSelection