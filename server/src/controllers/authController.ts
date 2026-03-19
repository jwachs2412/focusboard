// File where registration and login requests are handled
import { Request, Response } from "express"
import * as authService from "../services/authService"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

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

    const token = await authService.loginUser(email, password)

    res.status(200).json({ message: "Login successful", token })
  } catch (err: unknown) {
    console.error(err)

    const message = err instanceof Error ? err.message : "Login failed"

    res.status(400).json({ error: message })
  }
}
