"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ad_controller_1 = require("../controllers/ad.controller");
const adRoute = express_1.default.Router();
adRoute.get('/', ad_controller_1.fetchAllAds);
adRoute.get('/:adId', ad_controller_1.fetchSingleAd);
adRoute.post('/', ad_controller_1.createNewAd);
adRoute.put('/:adId', ad_controller_1.editAd);
adRoute.delete("/:adId", ad_controller_1.deleteAd);
exports.default = adRoute;
