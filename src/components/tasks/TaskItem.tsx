import type { Task } from "../../types/Task"

type TaskItemProps = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? "task-item--completed" : ""}`}>
      <label className="task-label">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`} />
        <span>
          {task.title}
          <span className={`priority priority--${task.priority}`}> ({task.priority})</span>
        </span>
      </label>
      <button onClick={() => onDelete(task.id)} aria-label={`Delete task "${task.title}"`}>
        ❌
      </button>
    </li>
  )
}

export default TaskItem
