import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TaskForm from "./TaskForm"

test("adds a task when form is submitted", async () => {
  const user = userEvent.setup()

  const mockAddTask = vi.fn()

  render(<TaskForm onAddTask={mockAddTask} />)

  const input = screen.getByPlaceholderText("Add a task...")
  const button = screen.getByRole("button", { name: /add/i })

  await user.type(input, "Learn testing")
  await user.click(button)

  expect(mockAddTask).toHaveBeenCalledWith("Learn testing")
})

test("does not submit empty tasks", async () => {
  const user = userEvent.setup()

  const mockAddTask = vi.fn()

  render(<TaskForm onAddTask={mockAddTask} />)

  const button = screen.getByRole("button", { name: /add/i })

  await user.click(button)

  expect(mockAddTask).not.toHaveBeenCalled()
})
