import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./features/userDetailsSlice";
import tokenReducer from "./features/tokenSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import usersReducer from "../store/features/usersSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserDetailsReducer = persistReducer(
  persistConfig,
  userDetailsReducer
);
const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);
// const persistedUsersReducer = persistReducer(persistConfig, usersReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserDetailsReducer,
    token: persistedTokenReducer,
    // users: persistedUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
