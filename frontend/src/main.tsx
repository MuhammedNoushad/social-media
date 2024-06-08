import ReactDOM from "react-dom";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import { SocketProvider } from "./Context/SocketContext.tsx";
import { APP_GOOGLE_CLIENT_ID } from "./config/config.ts";

ReactDOM.render(
  <GoogleOAuthProvider clientId={APP_GOOGLE_CLIENT_ID!}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster richColors position="top-right" />
        <SocketProvider>
          <div className="bg-white min-h-screen">
            <App />
          </div>
        </SocketProvider>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
