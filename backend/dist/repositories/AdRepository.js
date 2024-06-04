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
const ad_model_1 = __importDefault(require("../models/ad.model"));
class AdRepository {
    // Function for fetch all ads
    fetchAllAds(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ads = yield ad_model_1.default.find()
                    .skip((page - 1) * limit)
                    .limit(limit);
                return ads;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //   Function for create new ad
    createNewAd(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAd = yield ad_model_1.default.create(data);
                return newAd;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for edit ad
    editAd(adId, title, description, image, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ad = yield ad_model_1.default.findOneAndUpdate({
                    _id: adId,
                }, {
                    $set: {
                        adTitle: title,
                        adDescription: description,
                        adImageUrl: image,
                        adLink: link,
                    },
                }, { new: true });
                return ad;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetch the total count of ads
    fetchTotalAdsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalAds = yield ad_model_1.default.countDocuments();
                return totalAds;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for delete ad
    deleteAd(adId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ad_model_1.default.findByIdAndDelete(adId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Function for fetch a single ad 
    fetchSingleAd(adId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ad = yield ad_model_1.default.findById(adId);
                return ad;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AdRepository;
