"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adSchema = new mongoose_1.Schema({
    adImageUrl: String,
    adLink: String,
    adTitle: String,
    adDescription: String,
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const Ad = (0, mongoose_1.model)("Ad", adSchema);
exports.default = Ad;
