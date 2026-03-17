import TaskItem from "./TaskItem"
import type { Task } from "../../types/Task"
import EmptyState from "./EmptyState"

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  loading?: boolean
}

function TaskList({ tasks, onToggle, onDelete, loading }: TaskListProps) {
  if (loading) {
    return (
      <ul className="task-list" aria-label="Loading tasks" role="status">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="task-item skeleton">
            <div className="skeleton-checkbox" />
            <div className="skeleton-text" />
            <div className="skeleton-delete" />
          </li>
        ))}
      </ul>
    )
  }

  if (!tasks.length && !loading) {
    return <EmptyState />
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={() => onToggle(task.id, task.completed)} onDelete={() => onDelete(task.id)} />
      ))}
    </ul>
  )
}

export default TaskList
