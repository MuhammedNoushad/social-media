"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otp_model_1 = __importDefault(require("../models/otp.model"));
class OtpRepository {
    // Create new user
    createNewUser(otp, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Remove the existing otp
                yield otp_model_1.default.deleteMany({ email });
                // Crete a new otp
                const newOtp = new otp_model_1.default({ otp, email });
                yield newOtp.save();
                return newOtp.toObject();
            }
            catch (error) {
                console.error("Error from createOtp in OtpRepository", error);
                return null;
            }
        });
    }
    // Find existing otp
    findOtpByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingOtp = yield otp_model_1.default.findOne({ email });
                return existingOtp ? existingOtp.toObject() : null;
            }
            catch (error) {
                console.error("Error from findOtpByEmail in OtpRepository", error);
                return null;
            }
        });
    }
}
exports.default = OtpRepository;
