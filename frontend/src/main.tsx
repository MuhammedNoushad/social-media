import ReactDOM from "react-dom";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";


ReactDOM.render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID!}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster richColors position="top-right" />
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
