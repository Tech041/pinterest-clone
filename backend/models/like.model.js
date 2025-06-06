import mongoose from "mongoose";
import { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    pin: {
      type: Schema.Types.ObjectId,
      ref: "Pin",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Like = mongoose.model("Like", likeSchema);
export default Like;
