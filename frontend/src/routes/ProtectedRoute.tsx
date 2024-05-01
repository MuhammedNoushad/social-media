import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { ReactElement } from "react";

interface PrivateRouteProps {
  children: ReactElement;
  role: string;
}

function PrivateRoute({ children ,role }: PrivateRouteProps) {
  const isAuthenticated = !!useSelector(
    (state: RootState) => state.token.token
  );
  const userRole = useSelector((state: RootState) => state.token.role);


  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    if (userRole === "admin" && role !== "admin") {
      return <Navigate to="/admin" />;
    } else if(userRole === "user" && role !== "user") {
      return <Navigate to="/home" />;
    }
    else{
      return children
    }
  }
}

export default PrivateRoute;