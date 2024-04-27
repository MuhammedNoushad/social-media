import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./feactures/userDetailsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage is localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserDetailsReducer = persistReducer(persistConfig, userDetailsReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
