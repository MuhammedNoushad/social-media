import { toast } from "sonner";

import IAds from "../../types/IAds";
import axios from "../../axios/axios";
import { useState } from "react";

// Function for post ads
const usePostAds = () => {
  const [loading, setLoading] = useState(false);
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

  return { postAds, loading };
};

export default usePostAds;
