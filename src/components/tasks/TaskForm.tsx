import { useState } from "react"

type TaskFormProps = {
  onAddTask: (title: string, priority: "low" | "medium" | "high") => void
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [input, setInput] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return

    onAddTask(input.trim(), priority)
    setInput("")
    setPriority("medium")
  }

  return (
    <form onSubmit={handleSubmit} className="task-form" aria-label="Add new task">
      <label htmlFor="task-input" className="sr-only">
        Task title
      </label>
      <input id="task-input" type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Add a task..." aria-required="true" />

      <label htmlFor="priority-select" className="sr-only">
        Task Priority
      </label>
      <select id="priority-select" value={priority} onChange={e => setPriority(e.target.value as "low" | "medium" | "high")}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit" disabled={!input.trim()} aria-disabled={!input.trim()} aria-label="Add task">
        Add
      </button>
    </form>
  )
}

export default TaskForm
