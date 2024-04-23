import { model, Schema } from "mongoose";
import IOtp from "../interfaces/IOtp";

const otpSchema = new Schema<IOtp>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

const Otp = model("Otp", otpSchema);

export default Otp;
