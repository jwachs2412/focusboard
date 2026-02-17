import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { tasks, addTask, Task } from "./tasks"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/tasks", (req, res) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ error: "Title is required" })
  }

  const newTask = addTask(title)
  res.status(201).json(newTask)
})

app.get("/", (req, res) => {
  res.send("Server is running 🚀")
})

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks)
})

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
