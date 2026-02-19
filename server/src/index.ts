import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { tasks, addTask, Task } from "./tasks"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/tasks", (req, res) => {
  try {
    const { title } = req.body

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    const newTask = addTask(title)
    res.status(201).json(newTask)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add task" })
  }
})

app.get("/", (req, res) => {
  try {
    res.send("Server is running 🚀")
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server failed to respond" })
  }
})

app.get("/tasks", (req, res) => {
  try {
    res.json(tasks)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body

  const task = tasks.find(t => t.id === id)

  if (!task) {
    return res.status(404).json({ error: "Task not found" })
  }

  if (title !== undefined) task.title = title
  if (completed !== undefined) task.completed = completed

  res.status(200).json(task)
})

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params

  const index = tasks.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" })
  }

  tasks.splice(index, 1)

  res.status(204).send()
})

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
