import { useTasks } from "../../hooks/useTasks"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
import TaskSkeleton from "./TaskSkeleton"
import EmptyState from "./EmptyState"

function TaskBoard() {
  const { tasks, loading, addTask, toggleTask, deleteTask, activeCount, error, fetchTasks } = useTasks()

  return (
    <section className="task-board" aria-label="Task board">
      <TaskForm onAddTask={addTask} />

      {loading ? (
        <ul className="task-list">
          {[...Array(4)].map((_, i) => (
            <TaskSkeleton key={i} />
          ))}
        </ul>
      ) : error ? (
        <div role="alert">
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={fetchTasks}>Retry</button>
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} loading={loading} />
          {!loading && tasks.length > 0 && <p aria-live="polite">{activeCount} tasks remaining</p>}
        </>
      )}
    </section>
  )
}

export default TaskBoard
