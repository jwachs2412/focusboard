import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Task } from "./models/TaskModel"

dotenv.config()

const mongoUri = process.env.MONGO_URI || "mongodb+srv://taskappuser:Cleveland1974!Cleveland1974!@cluster0.ppkgava.mongodb.net/taskapp?appName=Cluster0"

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => {
    console.error("MongoDB connection error:", err)
    process.exit(1) // stops server if DB fails to connect
  })

const app = express()

app.use(cors())
app.use(express.json())

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    const newTask = new Task({ title })
    await newTask.save()

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

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(
      tasks.map(task => ({
        id: task._id.toString(),
        title: task.title,
        completed: task.completed
      }))
    )
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body

  try {
    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    if (title !== undefined) task.title = title
    if (completed !== undefined) task.completed = completed

    await task.save()
    res.status(200).json(task)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update task" })
  }
})

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params
  try {
    const result = await Task.findByIdAndDelete(id)
    if (!result) return res.status(404).json({ error: "Task not found" })

    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete task" })
  }
})

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
