import express from 'express';
import { createNewAd, deleteAd, editAd, fetchAllAds, fetchSingleAd } from '../controllers/ad.controller';

const adRoute = express.Router();

adRoute.get('/',fetchAllAds);
adRoute.get('/:adId',fetchSingleAd)
adRoute.post('/',createNewAd)
adRoute.put('/:adId',editAd)
adRoute.delete("/:adId", deleteAd)


export default adRoute