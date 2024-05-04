import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RestrictedAuthRoute({ children }: any) {
  const location = useLocation();
  const verified = location.state?.verified;

  if (!verified) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default RestrictedAuthRoute;
