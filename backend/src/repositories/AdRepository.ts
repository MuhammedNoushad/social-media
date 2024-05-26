import IAd from "../interfaces/IAd";
import Ad from "../models/ad.model";

class AdRepository {
  // Function for fetch all ads
  async fetchAllAds(page: number, limit: number) {
    try {
      const ads = await Ad.find()
        .skip((page - 1) * limit)
        .limit(limit);
      return ads;
    } catch (error) {
      throw error;
    }
  }

  //   Function for create new ad
  async createNewAd(data: IAd) {
    try {
      const newAd = await Ad.create(data);
      return newAd;
    } catch (error) {
      throw error;
    }
  }

  // Function for edit ad
  async editAd(
    adId: string,
    title: string,
    description: string,
    image: string,
    link: string
  ) {
    try {
      const ad = await Ad.findOneAndUpdate(
        {
          _id: adId,
        },
        {
          $set: {
            adTitle: title,
            adDescription: description,
            adImageUrl: image,
            adLink: link,
          },
        },
        { new: true }
      );
      return ad;
    } catch (error) {
      throw error;
    }
  }

  // Function for fetch the total count of ads
  async fetchTotalAdsCount() {
    try {
      const totalAds = await Ad.countDocuments();
      return totalAds;
    } catch (error) {
      throw error;
    }
  }

  // Function for delete ad
  async deleteAd(adId: string) {
    try {
      await Ad.findByIdAndDelete(adId);
    } catch (error) {
      throw error;
    }
  }

  // Function for fetch a single ad 
  async fetchSingleAd(adId: string) {
    try {
      const ad = await Ad.findById(adId);
      return ad;
    } catch (error) {
      throw error;
    }
  }
}

export default AdRepository;
