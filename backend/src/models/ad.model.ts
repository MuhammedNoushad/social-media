import { model, Schema } from "mongoose";

const adSchema = new Schema(
  {
    adImageUrl: String,
    adLink: String,
    adTitle: String,
    adDescription: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Ad = model("Ad", adSchema);

export default Ad;
