import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import tokenReducer from "./features/tokenSlice";
import userDetailsReducer from "./features/userDetailsSlice";
import postReducer from "./features/postsSlice";
import connectionReducer from "./features/connectionSlice";

const rootReducer = combineReducers({
  user: userDetailsReducer,
  token: tokenReducer,
  posts: postReducer,
  connection: connectionReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
