"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    story: [
        {
            storyImg: String,
            viewed: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
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
const Story = (0, mongoose_1.model)("Story", storySchema);
exports.default = Story;
