import { useState, useEffect } from "react";

import axios from "../../axios/axios";
import IAds from "../../types/IAds";

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

  return { totalPages, ads };
};

export default useFetchAd;
