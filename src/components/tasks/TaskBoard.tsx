import { useState } from "react"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
import type { Task } from "../../types/Task"

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const activeCount = tasks.filter(task => !task.completed).length

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    setTasks(prev => [...prev, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
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
