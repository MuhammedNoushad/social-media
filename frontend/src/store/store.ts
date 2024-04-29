import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./features/userDetailsSlice";
import tokenReducer from "./features/tokenSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserDetailsReducer = persistReducer(
  persistConfig,
  userDetailsReducer
);
const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserDetailsReducer,
    token: persistedTokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
