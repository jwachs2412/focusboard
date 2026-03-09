import { Router } from "express"
import * as taskController from "../controllers/taskController"
import { authMiddleware } from "../middleware/auth"

const router = Router()

router.get("/", authMiddleware, taskController.getTasks)
router.post("/", authMiddleware, taskController.createTask)
router.put("/:id", authMiddleware, taskController.updateTask)
router.delete("/:id", authMiddleware, taskController.deleteTask)

export default router
