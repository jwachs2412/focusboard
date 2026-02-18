import { useTasks } from "../../hooks/useTasks"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

function TaskBoard() {
  const { tasks, loading, addTask, toggleTask, deleteTask, activeCount } = useTasks()

  if (loading) {
    return <p>Loading tasks...</p>
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
