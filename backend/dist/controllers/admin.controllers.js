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
exports.fetchChartDataPost = exports.fetchChartData = exports.fetchLatestUsers = exports.blockUser = exports.getUsers = void 0;
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const PostRepository_1 = __importDefault(require("../repositories/PostRepository"));
const userRepository = new UserRepository_1.default();
const postRespository = new PostRepository_1.default();
// For fetch all the users that are not admin from the database
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const usersData = yield userRepository.fetchUsersDataWithPagination(page, limit);
        const totalUsers = yield userRepository.fetchTotalUsersCount();
        const totalPages = Math.ceil(totalUsers / limit);
        if (!usersData) {
            return res.status(400).json({ error: "Something went wrong" });
        }
        return res.status(200).json({ success: true, usersData, totalPages });
    }
    catch (error) {
        // Handle errors
        console.error("Error from getUsers admin controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUsers = getUsers;
// For block specified users in the database
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const blockedUser = yield userRepository.toggleBlock(userId);
        if (!blockedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ success: true, blockedUser });
    }
    catch (error) {
        // Handle errors
        console.error("Error from blockUser controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.blockUser = blockUser;
// Function for fetch all latest registered users from the database
const fetchLatestUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = 5;
        const usersData = yield userRepository.fetchLatestUsers(limit);
        if (!usersData) {
            return res.status(400).json({ error: "Something went wrong" });
        }
        return res.status(200).json({ success: true, usersData });
    }
    catch (error) {
        // Handle errors
        console.error("Error from fetchLatestUsers admin controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchLatestUsers = fetchLatestUsers;
// Function for fetch data for chart
const fetchChartData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chartData = yield userRepository.fetchDataForChart();
        if (!chartData) {
            return res.status(400).json({ error: "Something went wrong" });
        }
        return res.status(200).json({
            success: true,
            chartData: chartData[0].chartData,
        });
    }
    catch (error) {
        // Handle errors
        console.error("Error from fetchChartData admin controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchChartData = fetchChartData;
// Function for fetch data for chart post
const fetchChartDataPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chartData = (yield postRespository.fetchDataForChartPost()) || [];
        if (!chartData) {
            return res.status(400).json({ error: "Something went wrong" });
        }
        return res.status(200).json({
            success: true,
            chartData: chartData[0].chartData,
        });
    }
    catch (error) {
        // Handle errors
        console.error("Error from fetchChartDataPost admin controller", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchChartDataPost = fetchChartDataPost;
