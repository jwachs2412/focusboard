// index.ts
import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth"
import tasksRouter from "./routes/tasks"

export const app = express()

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/tasks", tasksRouter)

// Don't call mongoose.connect() or app.listen() here
