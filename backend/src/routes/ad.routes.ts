import express from 'express';
import { createNewAd, editAd, fetchAllAds } from '../controllers/ad.controller';

const adRoute = express.Router();

adRoute.get('/',fetchAllAds);
adRoute.post('/',createNewAd)
adRoute.put('/:adId',editAd)


export default adRoute