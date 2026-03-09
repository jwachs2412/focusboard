import { Task } from "../models/TaskModel"

export const getAllTasks = async () => {
  return Task.find()
}

export const createTask = async (title: string) => {
  const task = new Task({ title })
  return task.save()
}

export const updateTask = async (id: string, updateData: Partial<{ title: string; completed: boolean }>) => {
  const task = await Task.findById(id)
  if (!task) throw new Error("Task not found")

  Object.assign(task, updateData)
  return task.save()
}

export const deleteTaskById = async (id: string) => {
  const result = await Task.findByIdAndDelete(id)
  if (!result) throw new Error("Task not found")
}
