import mongoose, { HydratedDocument } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser {
  name: string
  email: string
  password: string
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

UserSchema.pre("save", async function () {
  const user = this as HydratedDocument<IUser>

  if (!user.isModified("password")) return

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
})

export const User = mongoose.model<IUser>("User", UserSchema)
