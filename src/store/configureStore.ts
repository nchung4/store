import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import favoriteSlice from "./favorite/favoriteSlice";
import cartSlice from "./cart/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", 'cart'],
  blacklist: ["fav"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  fav: favoriteSlice,
  cart: cartSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ...

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
