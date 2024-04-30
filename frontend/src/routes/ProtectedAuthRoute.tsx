import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProtectedAuthRoute({ children }: { children: any }) {
  const isAuthenticated = !!useSelector(
    (state: RootState) => state.token.token
  );
  const role = useSelector((state: RootState) => state.token.role);
  if (isAuthenticated) {
    if (role === "admin") return <Navigate to="/admin" />;
    else return <Navigate to="/home" />;
  } else {
    return children;
  }
}

export default ProtectedAuthRoute;
