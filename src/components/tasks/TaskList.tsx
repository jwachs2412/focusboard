import TaskItem from "./TaskItem"
import type { Task } from "../../types/Task"

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} title={task.title} completed={task.completed} onToggle={() => onToggle(task.id)} onDelete={() => onDelete(task.id)} />
      ))}
    </ul>
  )
}

export default TaskList
