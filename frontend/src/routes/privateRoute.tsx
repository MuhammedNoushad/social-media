import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { ReactElement } from "react";

interface PrivateRouteProps {
  children: ReactElement;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.token.token);

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;