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
    // Checking if the user email exists
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
    // Checking if the username exists
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
                return userData || null;
            }
            catch (error) {
                console.error("Error from findUser in UserRepository", error);
                throw error;
            }
        });
    }
    // For update the profile of the user
    updateProfile(userDetails, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(userId).select("-password");
                if (!user) {
                    console.error("User not found");
                    return null;
                }
                if (!userDetails.username ||
                    !userDetails.firstName ||
                    !userDetails.lastName) {
                    console.error("Incomplete user details provided");
                    return null;
                }
                user.username = userDetails.username;
                user.firstName = userDetails.firstName;
                user.lastName = userDetails.lastName;
                if (userDetails.bio) {
                    user.bio = userDetails.bio;
                }
                if (userDetails.dob) {
                    user.dob = userDetails.dob;
                }
                if (userDetails.phone) {
                    user.phone = userDetails.phone;
                }
                if (userDetails.profileimg) {
                    user.profileimg = userDetails.profileimg;
                }
                yield user.save();
                return user;
            }
            catch (error) {
                console.error("Error from updateProfile in UserRepository", error);
                throw error;
            }
        });
    }
    // Funcion to fetch all the users from the user collection
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find({ isAdmin: false }).select("-password");
                return users;
            }
            catch (error) {
                console.error("Error from getUsers in UserRepository", error);
                return null;
            }
        });
    }
    // Function for block a specified user
    toggleBlock(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(userId);
                if (!user) {
                    console.error("User not found");
                    return null;
                }
                user.isBlock = !user.isBlock;
                yield user.save();
                return user.toObject();
            }
            catch (error) {
                // Handle error
                console.error("Error from blockUser in UserRepository", error);
                throw error;
            }
        });
    }
    // Function for deleting the user profile data
    removeProfileImage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(userId);
                if (!user) {
                    console.error("User not found");
                    return null;
                }
                user.profileimg = "";
                yield user.save();
                return user.toObject();
            }
            catch (error) {
                // Handle error
                console.error("Error from removeProfileImage in UserRepository", error);
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield user_model_1.default.findById(id).select("-password");
                if (!userData) {
                    return null;
                }
                return userData;
            }
            catch (error) {
                console.error("Error from updatePassword in UserRepository", error);
                throw error;
            }
        });
    }
    // Function for update password
    updatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield user_model_1.default.findOne({ email });
                if (userData) {
                    userData.password = password;
                    yield userData.save();
                    return userData.toObject();
                }
                return null;
            }
            catch (error) {
                console.error("Error from updatePassword in UserRepository", error);
                throw error;
            }
        });
    }
    // Function for fetch users data with pagination
    fetchUsersDataWithPagination(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find({ isAdmin: false })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .select("-password");
                return users;
            }
            catch (error) {
                console.error("Error from fetchUsersDataWithPagination in UserRepository", error);
                return null;
            }
        });
    }
    // Function for fetch total users count
    fetchTotalUsersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalUsers = yield user_model_1.default.countDocuments({ isAdmin: false });
                return totalUsers;
            }
            catch (error) {
                console.error("Error from fetchTotalUsers in UserRepository", error);
            }
        });
    }
    // Function for fetch latest registered user
    fetchLatestUsers(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find({ isAdmin: false })
                    .sort({ createdAt: -1 })
                    .limit(limit)
                    .select("-password");
                return users;
            }
            catch (error) {
                console.error("Error from fetchLatestUsers in UserRepository", error);
                return null;
            }
        });
    }
    // Function for fetch data for chart
    fetchDataForChart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield user_model_1.default.aggregate([
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m",
                                    date: "$createdAt",
                                },
                            },
                            count: { $sum: 1 },
                        },
                    },
                    { $sort: { _id: 1 } },
                    {
                        $group: {
                            _id: null,
                            users: { $push: "$count" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            success: { $literal: true },
                            chartData: "$users",
                        },
                    },
                ]);
                return userData;
            }
            catch (error) {
                console.error("Error from fetchLatestUsers in UserRepository", error);
            }
        });
    }
    // Function for verify the user account
    verifyUserAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.default.findByIdAndUpdate(userId, { isVerified: true }, { upsert: true });
            }
            catch (error) {
                console.error("Error from verifyUserAccount in UserRepository", error);
                throw error;
            }
        });
    }
}
exports.default = UserRepository;
