import { toast } from "sonner";

function handleInvalidToken() {
  // Clear the token from localStorage
  localStorage.removeItem("token");

  toast.error("Your session has expired. Please log in again.");
  window.location.href = "/login";
}

export default handleInvalidToken;
