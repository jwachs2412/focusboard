import { Request, Response } from "express"
import * as taskService from "../services/taskService"
import { ITask } from "../models/TaskModel"

interface CreateTaskBody {
  title: string
}

interface UpdateTaskBody {
  title?: string
  completed?: boolean
}

// GET /tasks
export const getTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tasks: ITask[] = await taskService.getAllTasks()
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
export const createTask = async (req: Request<unknown, unknown, CreateTaskBody>, res: Response): Promise<Response> => {
  const { title } = req.body
  if (!title) return res.status(400).json({ error: "Title is required" })

  try {
    const savedTask: ITask = await taskService.createTask(title)
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
export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  // Use type assertion to satisfy TypeScript
  const { id } = req.params as { id: string }
  const { title, completed } = req.body as UpdateTaskBody

  try {
    const updatedTask: ITask = await taskService.updateTask(id, { title, completed })
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
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as { id: string }

  try {
    await taskService.deleteTaskById(id)
    return res.status(204).send()
  } catch (error: unknown) {
    console.error(error)
    return res.status(500).json({ error: "Failed to delete task" })
  }
}
