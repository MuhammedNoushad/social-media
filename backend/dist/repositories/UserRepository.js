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
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = require("mongoose");
// Creating the UserRepository
class UserRepository {
    // Checking the user email is existing or not
    existingEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ email });
                return !!user;
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    console.error("Mongoose Error from existingEmail in UserRepository", error);
                }
                else {
                    console.error("Error from existingEmail in UserRepository", error);
                }
                return false;
            }
        });
    }
    // Checking the user name is existing or not
    existingUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ username });
                return !!user;
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    console.error("Mongoose Error from existingUsername in UserRepository", error);
                }
                else {
                    console.error("Error from existingUsername in UserRepository", error);
                }
                return false;
            }
        });
    }
    // Create new user
    createNewUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new user_model_1.default(userDetails);
                yield newUser.save();
                return newUser.toObject();
            }
            catch (error) {
                console.error("Error from createNewUser in UserRepository", error);
                return null;
            }
        });
    }
    // Find user by email
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield user_model_1.default.findOne({ email });
                return userData || null; // Return null if user is not found
            }
            catch (error) {
                console.error("Error from findUser in UserRepository", error);
                throw error;
            }
        });
    }
}
exports.default = UserRepository;
