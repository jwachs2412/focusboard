import request from "supertest"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { app } from "../index" // note: index.ts must export app without connecting
import { IUser } from "../models/UserModel"
import { AuthRequest } from "../middleware/auth"
import { Response, NextFunction } from "express"
import { Task } from "../models/TaskModel"

jest.setTimeout(20000) // increase timeout for in-memory Mongo startup

// In-memory MongoDB
let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

// Clean DB between tests
beforeEach(async () => {
  await Task.deleteMany({})
})

// Mock auth middleware to inject a fake user
const mockUser: IUser = {
  _id: new mongoose.Types.ObjectId(),
  name: "Test User",
  email: "test@example.com",
  password: "hashedpassword"
  // Mongoose Document properties are optional here; TS is happy
} as unknown as IUser

// Mock auth middleware
jest.mock("../middleware/auth", () => ({
  authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => {
    req.user = mockUser
    next()
  }
}))

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
})

describe("Tasks API", () => {
  // -------------------------
  // CREATE TASK
  // -------------------------
  it("POST /tasks should create a new task", async () => {
    const res = await request(app).post("/tasks").send({ title: "Test Task" })

    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe("Test Task")
    expect(res.body.completed).toBe(false) // if default is false
    expect(res.body.id).toBeDefined()
  })

  it("POST /tasks should fail if title is missing", async () => {
    const res = await request(app).post("/tasks").send({})

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe("Title is required")
  })

  // -------------------------
  // GET TASKS
  // -------------------------
  it("GET /tasks should return all tasks for the user", async () => {
    await Task.create({ title: "Task 1", user: mockUser._id })
    await Task.create({ title: "Task 2", user: mockUser._id })

    const res = await request(app).get("/tasks")

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(2)
    expect(res.body[0].title).toBe("Task 1")
    expect(res.body[1].title).toBe("Task 2")
  })

  it("GET /tasks should return empty array when no tasks exist", async () => {
    const res = await request(app).get("/tasks")

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
  })

  // -------------------------
  // UPDATE TASK
  // -------------------------
  it("PUT /tasks/:id should update a task", async () => {
    const task = await Task.create({
      title: "Old Task",
      user: mockUser._id
    })

    const res = await request(app).put(`/tasks/${task._id}`).send({ title: "Updated Task", completed: true })

    expect(res.statusCode).toBe(200)
    expect(res.body.title).toBe("Updated Task")
    expect(res.body.completed).toBe(true)
  })

  it("PUT /tasks/:id should fail if task does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId()

    const res = await request(app).put(`/tasks/${fakeId}`).send({ title: "Updated Task " })

    expect(res.statusCode).toBe(500)
  })

  // -------------------------
  // DELETE TASK
  // -------------------------
  it("DELETE /tasks/:id should delete a task", async () => {
    const task = await Task.create({
      title: "Delete Me",
      user: mockUser._id
    })

    const res = await request(app).delete(`/tasks/${task._id}`)

    expect(res.statusCode).toBe(204)

    const deletedTask = await Task.findById(task._id)
    expect(deletedTask).toBeNull()
  })

  it("DELETE /tasks/:id should fail if task does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId()

    const res = await request(app).delete(`/tasks/${fakeId}`)

    expect(res.statusCode).toBe(500)
  })
})
