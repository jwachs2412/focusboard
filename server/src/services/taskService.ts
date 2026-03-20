// server/src/services/taskService.ts
import { Task, ITask } from "../models/TaskModel"

export const getAllTasks = async (userId: string): Promise<ITask[]> => {
  return Task.find({ user: userId })
}

export const createTask = async (title: string, userId: string): Promise<ITask> => {
  const cleanTitle = title.trim()
  const task = new Task({ title: cleanTitle, user: userId })
  return task.save()
}

export const updateTask = async (id: string, updateData: Partial<ITask>, userId: string): Promise<ITask> => {
  const sanitizedData: Partial<ITask> = {}

  if (updateData.title !== undefined) {
    sanitizedData.title = updateData.title.trim()
  }

  if (updateData.completed !== undefined) {
    sanitizedData.completed = updateData.completed
  }

  const task = await Task.findOneAndUpdate({ _id: id, user: userId }, sanitizedData, { new: true })
  if (!task) throw new Error("Task not found")
  return task
}

export const deleteTaskById = async (id: string, userId: string): Promise<void> => {
  const result = await Task.deleteOne({ _id: id, user: userId })
  if (result.deletedCount === 0) throw new Error("Task not found")
}
