import { Request, Response } from "express";
import AdRepository from "../repositories/AdRepository";

const adRepository = new AdRepository();

export const fetchAllAds = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 3;
    const ads = await adRepository.fetchAllAds(page, limit);
    const totalAds = await adRepository.fetchTotalAdsCount();

    const totalPages = Math.ceil(totalAds / limit);

    res.status(200).json({ success: true, ads, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for create new ad
export const createNewAd = async (req: Request, res: Response) => {
  try {
    const ad = await adRepository.createNewAd(req.body);
    res.status(200).json({ success: true, message: "Ad created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for edit existing ad
export const editAd = async (req: Request, res: Response) => {
  try {
    const { adId } = req.params;
    const { adTitle, adDescription, adImageUrl, adLink } = req.body;
    const ad = await adRepository.editAd(
      adId,
      adTitle,
      adDescription,
      adImageUrl,
      adLink
    );
    res.status(200).json({ success: true, ad, message: "Ad updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for delete ad
export const deleteAd = async (req: Request, res: Response) => {
  try {
    const { adId } = req.params;
    await adRepository.deleteAd(adId);
    res.status(200).json({ success: true, message: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function for fetch single ad  
export const fetchSingleAd = async (req: Request, res: Response) => {
  try {
    const { adId } = req.params;
    const ad = await adRepository.fetchSingleAd(adId);
    res.status(200).json({ success: true, ad });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
