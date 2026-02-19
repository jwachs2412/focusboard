import { useTasks } from "../../hooks/useTasks"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

function TaskBoard() {
  const { tasks, loading, addTask, toggleTask, deleteTask, activeCount, error, fetchTasks } = useTasks()

  if (loading) {
    return <p>Loading tasks...</p>
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={fetchTasks}>Retry</button>
      </div>
    )
  }

  return (
    <section className="task-board">
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      <p>{activeCount} tasks remaining</p>
    </section>
  )
}

export default TaskBoard
