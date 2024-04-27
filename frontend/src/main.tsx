import ReactDOM from "react-dom";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "./index.css";

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster richColors />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
