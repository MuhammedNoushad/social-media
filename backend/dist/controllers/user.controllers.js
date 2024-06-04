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
exports.suggestUsers = exports.fetchCountUsers = exports.fetchSigleUser = exports.fetchAllUsers = exports.deleteProfilePic = exports.updateProfile = void 0;
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const ConnectionRepository_1 = __importDefault(require("../repositories/ConnectionRepository"));
const userRepository = new UserRepository_1.default();
const connectionRepository = new ConnectionRepository_1.default();
// Function for updating user profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = req.body;
        const { userId } = req.params;
        // Updating the profile of the user
        const updatedProfile = yield userRepository.updateProfile(userDetails, userId);
        if (updatedProfile) {
            res.status(200).json({ success: true, updatedProfile });
        }
    }
    catch (error) {
        // Handle errors
        console.error("Error from updateProfile user controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateProfile = updateProfile;
// Function for deleting the profile picture of user
const deleteProfilePic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedProfile = yield userRepository.removeProfileImage(userId);
        if (updatedProfile) {
            res.status(200).json({ success: true, updatedProfile });
        }
    }
    catch (error) {
        // Handle errors
        console.error("Error from delteProfilePic user controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteProfilePic = deleteProfilePic;
// Function for fetch all users
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = yield userRepository.getUsers();
        if (!usersData) {
            return res.status(400).json({ error: "Something went wrong" });
        }
        return res.status(200).json({ success: true, usersData });
    }
    catch (error) {
        // Handle errors
        console.error("Error from fetchAllUsers user controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllUsers = fetchAllUsers;
// Function for fetch single user
const fetchSigleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userData = yield userRepository.findById(userId);
        if (!userData) {
            return res.status(400).json({ error: "User not found" });
        }
        return res.status(200).json({ success: true, userData });
    }
    catch (error) {
        // Handle errors
        console.error("Error from fetchSigleUser user controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchSigleUser = fetchSigleUser;
// Function for count all the users in the database
const fetchCountUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield userRepository.fetchTotalUsersCount();
        return res.status(200).json({ success: true, totalUsers });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchCountUsers = fetchCountUsers;
// Function for suggest users for the logged in users
const suggestUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const users = yield connectionRepository.suggestUsers(userId);
        return res.status(200).json({ success: true, users });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.suggestUsers = suggestUsers;
