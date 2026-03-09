import express from "express"
import * as taskController from "../controllers/taskController"
import { authMiddleware } from "../middleware/auth"
import { ParamsDictionary } from "express-serve-static-core"

interface TaskParams extends ParamsDictionary {
  id: string
}

const router = express.Router()

router.get("/", authMiddleware, taskController.getTasks)
router.post("/", authMiddleware, taskController.createTask)
router.put<TaskParams>("/:id", authMiddleware, taskController.updateTask)
router.delete<TaskParams>("/:id", authMiddleware, taskController.deleteTask)

export default router
