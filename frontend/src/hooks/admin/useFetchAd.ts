import { useState, useEffect } from "react";

import axios from "../../axios/axios";
import IAds from "../../types/IAds";
import { toast } from "sonner";

// Function for fetching all ads
const useFetchAd = (currentPage: number) => {
  const [totalPages, setTotalPages] = useState(1);
  const [ads, setAds] = useState<IAds[]>([]);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`/api/ad?page=${currentPage}`);
        const data = response.data;
        if (data.success) {
          setTotalPages(data.totalPages);
          setAds(data.ads);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAd();
  }, [currentPage]);

  // Function for delete ad
  const deleteAd = async (adId: string | undefined) => {
    try {
      const response = await axios.delete(`/api/ad/${adId}`);
      const data = response.data;
      if (data.success) {
        setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Error deleting ad");
      console.error("Error deleting ad:", error);
    }
  };

  // Function for fetch a single ad  
  const fetchSingleAd = async (adId: string | undefined) => {
    try {
      const response = await axios.get(`/api/ad/${adId}`);
      const data = response.data;
      if (data.success) {
        return data.ad;
      }
    } catch (error) {
      console.error("Error fetching single ad:", error);
    }
  };

  return { totalPages, ads, deleteAd , fetchSingleAd };
};

export default useFetchAd;
