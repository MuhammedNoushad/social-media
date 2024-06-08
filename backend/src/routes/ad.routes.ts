import express from "express";
import {
  createNewAd,
  deleteAd,
  editAd,
  fetchAllAds,
  fetchSingleAd,
} from "../controllers/ad.controller";
import verifyUser from "../middleware/verifyToken";

const adRoute = express.Router();

adRoute.get("/", verifyUser, fetchAllAds);
adRoute.get("/:adId", verifyUser, fetchSingleAd);
adRoute.post("/", verifyUser, createNewAd);
adRoute.put("/:adId", verifyUser, editAd);
adRoute.delete("/:adId", verifyUser, deleteAd);

export default adRoute;
