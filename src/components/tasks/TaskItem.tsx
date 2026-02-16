type TaskItemProps = {
  title: string
  completed: boolean
  onToggle: () => void
  onDelete: () => void
}

function TaskItem({ title, completed, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item ${completed ? "task-item--completed" : ""}`} onClick={onToggle}>
      <span onClick={onToggle}>{title}</span>
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}

export default TaskItem
