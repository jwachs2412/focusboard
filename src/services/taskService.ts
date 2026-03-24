import { apiFetch } from "./api"
import type { Task } from "../types/Task"

export const getTasks = (token: string) => apiFetch("/tasks", {}, token)

export const createTask = (title: string, priority: "low" | "medium" | "high", token: string) =>
  apiFetch(
    "/tasks",
    {
      method: "POST",
      body: JSON.stringify({ title, priority })
    },
    token
  )

export const updateTask = (id: string, data: Partial<Task>, token: string) =>
  apiFetch(
    `/tasks/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data)
    },
    token
  )

export const deleteTask = (id: string, token: string) =>
  apiFetch(
    `/tasks/${id}`,
    {
      method: "DELETE"
    },
    token
  )
