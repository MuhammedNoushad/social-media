import { model, Schema } from "mongoose";

const connectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followers: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
});

const Connection = model("Connection", connectionSchema);

export default Connection;
