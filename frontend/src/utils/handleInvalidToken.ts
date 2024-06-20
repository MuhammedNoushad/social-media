// utils/handleInvalidToken.ts
import { toast } from "sonner";

export const handleInvalidToken = () => {
  // Clear the token from localStorage
  toast.error("Your session has expired. Please log in again.");

  localStorage.clear();
  window.location.reload();
};
