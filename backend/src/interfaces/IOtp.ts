import { Document } from "mongoose";

export default interface IOtp extends Document {
    email:string,
    otp:string,
    createdAt:Date
}