// index.ts
import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth"
import tasksRouter from "./routes/tasks"

export const app = express()

const allowedOrigins = ["https://usertaskboard.netlify.app", "http://localhost:5173"]

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
)

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/tasks", tasksRouter)
