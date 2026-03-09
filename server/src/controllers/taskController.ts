import { Request, Response } from "express"
import { Task } from "../models/TaskModel"
import * as taskService from "../services/taskService"
import { ParamsDictionary } from "express-serve-static-core"

interface CreateTaskBody {
  title: string
}

interface TaskParams {
  id: string
}

interface UpdateTaskBody {
  title?: string
  completed?: boolean
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks()
    res.status(200).json(
      tasks.map(t => ({
        id: t._id.toString(),
        title: t.title,
        completed: t.completed
      }))
    )
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
}

export const createTask = async (req: Request<ParamsDictionary, unknown, CreateTaskBody>, res: Response) => {
  try {
    const { title } = req.body

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    const newTask = new Task({ title })
    const savedTask = await newTask.save()

    res.status(201).json({
      id: savedTask._id.toString(),
      title: savedTask.title,
      completed: savedTask.completed
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add task" })
  }
}

export const updateTask = async (req: Request<TaskParams, unknown, UpdateTaskBody>, res: Response) => {
  const { id } = req.params
  const { title, completed } = req.body

  try {
    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    if (title !== undefined) task.title = title
    if (completed !== undefined) task.completed = completed

    const updatedTask = await task.save()

    res.status(200).json({
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      completed: updatedTask.completed
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update task" })
  }
}

export const deleteTask = async (req: Request<TaskParams>, res: Response) => {
  const { id } = req.params

  try {
    const result = await Task.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete task" })
  }
}
