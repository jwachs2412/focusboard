import TaskItem from "./TaskItem"
import type { Task } from "../../types/Task"

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  loading?: boolean
}

function TaskList({ tasks, onToggle, onDelete, loading }: TaskListProps) {
  if (loading) {
    return (
      <ul className="task-list">
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
    return (
      <ul className="task-list empty">
        <li>No tasks yet! Add your first task above ✨</li>
      </ul>
    )
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
