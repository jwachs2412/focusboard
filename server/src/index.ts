import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth"
import tasksRouter from "./routes/tasks"

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`
})

const mongoUri = process.env.MONGO_URI as string

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/tasks", tasksRouter) // authMiddleware is already applied inside tasksRouter

const PORT = process.env.PORT || 5050
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
