import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    img: {
      type: String,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
