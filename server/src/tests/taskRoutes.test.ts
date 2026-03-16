import request from "supertest"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { app } from "../index" // note: index.ts must export app without connecting
import { IUser } from "../models/UserModel"
import { AuthRequest } from "../middleware/auth"
import { Response, NextFunction } from "express"

jest.setTimeout(20000) // increase timeout for in-memory Mongo startup

// In-memory MongoDB
let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

// Mock auth middleware to inject a fake user
const mockUser: IUser = {
  _id: new mongoose.Types.ObjectId(),
  name: "Test User",
  email: "test@example.com",
  password: "hashedpassword"
  // Mongoose Document properties are optional here; TS is happy
} as unknown as IUser

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
  it("POST /tasks should create a new task", async () => {
    const res = await request(app).post("/tasks").send({ title: "Test Task" })

    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe("Test Task")
    expect(res.body.completed).toBe(false) // if default is false
    expect(res.body.id).toBeDefined()
  })
})
