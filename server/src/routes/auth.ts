import express from "express"
import { User } from "../models/UserModel"

const router = express.Router()

// POST /register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" })
    }

    // Create user
    const newUser = new User({ name, email, password })
    await newUser.save() // password will be hashed in pre-save hook

    res.status(201).json({ message: "User registered successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to register user" })
  }
})

export default router
