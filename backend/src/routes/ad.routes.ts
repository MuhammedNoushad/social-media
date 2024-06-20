import express from "express";
import {
  createNewAd,
  deleteAd,
  editAd,
  fetchAllAds,
  fetchSingleAd,
} from "../controllers/ad.controller";
import verifyUser from "../middleware/verifyToken";
import isBlock from "../middleware/isBlock";

const adRoute = express.Router();

adRoute.get("/", verifyUser, isBlock, fetchAllAds);
adRoute.get("/:adId", verifyUser, isBlock, fetchSingleAd);
adRoute.post("/", verifyUser, isBlock, createNewAd);
adRoute.put("/:adId", verifyUser, isBlock, editAd);
adRoute.delete("/:adId", verifyUser, isBlock, deleteAd);

export default adRoute;
