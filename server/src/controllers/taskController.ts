// This file is where user tasks are created/updated/deleted and where task input is validated
import { Response } from "express"
import * as taskService from "../services/taskService"
import { ITask } from "../models/TaskModel"
import { AuthRequest } from "../middleware/auth"

interface UpdateTaskBody {
  title?: string
  completed?: boolean
}

// GET /tasks
export const getTasks = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user!._id.toString()
    if (!userId) return res.status(401).json({ error: "User not authenticated" })

    const tasks: ITask[] = await taskService.getAllTasks(userId)
    return res.status(200).json(
      tasks.map(t => ({
        id: t._id.toString(),
        title: t.title,
        completed: t.completed
      }))
    )
  } catch (error: unknown) {
    console.error(error)
    return res.status(500).json({ error: "Failed to fetch tasks" })
  }
}

// POST /tasks
export const createTask = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { title } = req.body
  if (!title || typeof title !== "string" || !title.trim()) return res.status(400).json({ error: "Valid title is required" })
  if (title.length > 100) return res.status(400).json({ error: "Title must be under 100 characters" })

  const userId = req.user!._id.toString()

  try {
    if (!req.user) return res.status(401).json({ error: "User not authenticated" })
    const savedTask: ITask = await taskService.createTask(title, userId)
    return res.status(201).json({
      id: savedTask._id.toString(),
      title: savedTask.title,
      completed: savedTask.completed
    })
  } catch (error: unknown) {
    console.error(error)
    return res.status(500).json({ error: "Failed to create task" })
  }
}

// PUT /tasks/:id
export const updateTask = async (req: AuthRequest, res: Response): Promise<Response> => {
  // Use type assertion to satisfy TypeScript
  const { id } = req.params as { id: string }
  const { title, completed } = req.body as UpdateTaskBody

  const userId = req.user!._id.toString()

  try {
    if (!req.user) return res.status(401).json({ error: "User not authenticated" })
    const updatedTask: ITask = await taskService.updateTask(id, { title, completed }, userId)
    return res.status(200).json({
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      completed: updatedTask.completed
    })
  } catch (error: unknown) {
    console.error(error)
    return res.status(500).json({ error: "Failed to update task" })
  }
}

// DELETE /tasks/:id
export const deleteTask = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { id } = req.params as { id: string }

  const userId = req.user!._id.toString()

  try {
    if (!req.user) return res.status(401).json({ error: "User not authenticated" })
    await taskService.deleteTaskById(id, userId)
    return res.status(204).send()
  } catch (error: unknown) {
    console.error(error)
    return res.status(500).json({ error: "Failed to delete task" })
  }
}
