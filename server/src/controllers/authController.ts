// File where registration and login requests are handled
import { Request, Response } from "express"
import * as authService from "../services/authService"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" })
    }

    await authService.registerUser(name, email, password)

    res.status(201).json({ message: "User registered successfully" })
  } catch (err: unknown) {
    console.error(err)

    const message = err instanceof Error ? err.message : "Registration failed"

    res.status(400).json({ error: message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const token = await authService.loginUser(email, password)

    res.status(200).json({ message: "Login successful", token })
  } catch (err: unknown) {
    console.error(err)

    const message = err instanceof Error ? err.message : "Login failed"

    res.status(400).json({ error: message })
  }
}
