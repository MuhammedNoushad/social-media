// components/HandleInvalidTokenComponent.tsx
import { useEffect } from "react";
import { setupInterceptors } from "../../axios/axios";

const HandleInvalidTokenComponent = () => {
  useEffect(() => {
    setupInterceptors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default HandleInvalidTokenComponent;
