import type { Task } from "../../types/Task"

type TaskItemProps = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? "task-item--completed" : ""}`}>
      <span onClick={() => onToggle(task.id)}>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  )
}

export default TaskItem
