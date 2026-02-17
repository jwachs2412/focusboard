import { v4 as uuid } from "uuid"

export type Task = {
  id: string
  title: string
  completed: boolean
}

export let tasks: Task[] = []

export const addTask = (title: string) => {
  const newTask: Task = { id: uuid(), title, completed: false }
  tasks.push(newTask)
  return newTask
}
