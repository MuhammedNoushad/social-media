import { model, Schema } from "mongoose";
import IStory from "../interfaces/IStory";

const storySchema = new Schema <IStory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  story: [
    {
      storyImg: String,
      viewed: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      createdOn: {
        type: Date,
        default: Date.now,
      },
      expiredOn: {
        type: Date,
      },
      isExpired: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Story = model("Story", storySchema);

export default Story;
