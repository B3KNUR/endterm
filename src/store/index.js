import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import itemsReducer from "./itemsSlice";
import favoritesReducer from "./favoritesSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    favorites: favoritesReducer,
    profile: profileReducer,
  },
});
