import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/UserModel"

interface AuthRequest extends Request {
  user?: any
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error("JWT_SECRET is not defined")

    const decoded = jwt.verify(token, secret) as { id: string }

    const user = await User.findById(decoded.id).select("-password")
    if (!user) return res.status(401).json({ error: "User not found" })

    req.user = user
    next() // continue to the next middleware / route handler
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: "Invalid token" })
  }
}
