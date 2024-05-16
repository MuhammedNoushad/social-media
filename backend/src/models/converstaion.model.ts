import { model, Schema } from "mongoose";
import IConversation from "../interfaces/IConversation";

const converstaionSchema = new Schema<IConversation>(
  {
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
    },
    messages: {
      type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Conversation = model("Converstaion", converstaionSchema);

export default Conversation;
