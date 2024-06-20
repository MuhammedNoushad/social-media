import { ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import axios from "../axios/axios";
import { toast } from "sonner";

interface PrivateRouteProps {
  children: ReactElement;
  role: string;
}

function PrivateRoute({ children, role }: PrivateRouteProps) {
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = useSelector((state: RootState) => state.token.role);

  // Function for check the user is blocked or not
  const userId = useSelector((state: RootState) => state.user._id);

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/user/${userId}`)
        .then((res) => {
          if (res.data.blocked) {
            toast.error("Your account has been blocked");
            
            localStorage.clear();
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    if (userRole === "admin" && role !== "admin") {
      return <Navigate to="/admin" />;
    } else if (userRole === "user" && role !== "user") {
      return <Navigate to="/home" />;
    } else {
      return children;
    }
  }
}

export default PrivateRoute;
