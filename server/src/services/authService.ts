import { User } from "../models/UserModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) throw new Error("Email already exists")

  const cleanName = name.trim()
  const cleanEmail = email.toLowerCase().trim()

  const user = new User({ name: cleanName, email: cleanEmail, password })

  return user.save()
}

export const loginUser = async (email: string, password: string) => {
  const normalizedEmail = email.toLowerCase().trim()
  const user = await User.findOne({ email: normalizedEmail })
  if (!user) throw new Error("Invalid email or password")

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error("Invalid email or password")

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1h" })
  return token
}
