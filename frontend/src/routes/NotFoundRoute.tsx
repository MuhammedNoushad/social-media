import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

function NotFoundRoute({ children }: { children: ReactElement }) {
  const isAuthenticated = !!useSelector(
    (state: RootState) => state.token.token
  );

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default NotFoundRoute;
