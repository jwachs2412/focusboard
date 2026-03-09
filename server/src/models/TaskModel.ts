import mongoose, { Schema, Document, Types } from "mongoose"

export interface ITask extends Document {
  title: string
  completed: boolean
  user: Types.ObjectId
}

const TaskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

export const Task = mongoose.model<ITask>("Task", TaskSchema)
