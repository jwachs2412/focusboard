// server/src/services/taskService.ts
import { Task, ITask } from "../models/TaskModel"

export const getAllTasks = async (): Promise<ITask[]> => {
  return Task.find()
}

export const createTask = async (title: string): Promise<ITask> => {
  const task = new Task({ title })
  return task.save()
}

export const updateTask = async (id: string, updateData: Partial<{ title: string; completed: boolean }>): Promise<ITask> => {
  const task = await Task.findById(id)
  if (!task) throw new Error("Task not found")
  Object.assign(task, updateData)
  return task.save()
}

export const deleteTaskById = async (id: string): Promise<void> => {
  const result = await Task.findByIdAndDelete(id)
  if (!result) throw new Error("Task not found")
}