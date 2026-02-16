import { useState } from "react"

type TaskFormProps = {
  onAddTask: (title: string) => void
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return

    onAddTask(input)
    setInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Add a task..." />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm
