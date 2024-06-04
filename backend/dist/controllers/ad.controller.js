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
exports.fetchSingleAd = exports.deleteAd = exports.editAd = exports.createNewAd = exports.fetchAllAds = void 0;
const AdRepository_1 = __importDefault(require("../repositories/AdRepository"));
const adRepository = new AdRepository_1.default();
const fetchAllAds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 3;
        const ads = yield adRepository.fetchAllAds(page, limit);
        const totalAds = yield adRepository.fetchTotalAdsCount();
        const totalPages = Math.ceil(totalAds / limit);
        res.status(200).json({ success: true, ads, totalPages });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllAds = fetchAllAds;
// Function for create new ad
const createNewAd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ad = yield adRepository.createNewAd(req.body);
        res.status(200).json({ success: true, message: "Ad created successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createNewAd = createNewAd;
// Function for edit existing ad
const editAd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adId } = req.params;
        const { adTitle, adDescription, adImageUrl, adLink } = req.body;
        const ad = yield adRepository.editAd(adId, adTitle, adDescription, adImageUrl, adLink);
        res.status(200).json({ success: true, ad, message: "Ad updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.editAd = editAd;
// Function for delete ad
const deleteAd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adId } = req.params;
        yield adRepository.deleteAd(adId);
        res.status(200).json({ success: true, message: "Ad deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteAd = deleteAd;
// Function for fetch single ad  
const fetchSingleAd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adId } = req.params;
        const ad = yield adRepository.fetchSingleAd(adId);
        res.status(200).json({ success: true, ad });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchSingleAd = fetchSingleAd;
