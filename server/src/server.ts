// server.ts
import mongoose from "mongoose"
import dotenv from "dotenv"
import { app } from "./index"

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

const PORT = process.env.PORT || 5050
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
