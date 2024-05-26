import { toast } from "sonner";

import IAds from "../../types/IAds";
import axios from "../../axios/axios";
import { useState } from "react";

// Function for post ads
const usePostAds = () => {
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const postAds = async (formData: IAds) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/ad", formData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        return true;
      }
    } catch (error) {
      toast.error("Error posting ads");
    } finally {
      setLoading(false);
    }
  };

  // Function for edit ads
  const editAds = async (formData: IAds , adId:string) => {
    try {
      setEditLoading(true);
      const response = await axios.put(`/api/ad/${adId}`, formData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        return true;
      }
    } catch (error) {
      toast.error("Error editing ads");
    } finally {
      setEditLoading(false);
    }
  };

  return { postAds, loading , editAds, editLoading};
};

export default usePostAds;
