import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLocalFavorites,
  clearLocalFavorites,
  getUserFavorites,
  saveUserFavorites,
} from "../services/favoritesService";

export const loadFavorites = createAsyncThunk(
  "favorites/loadFavorites",
  async (uid) => {
    if (!uid) {
      return getLocalFavorites(); 
    }
    return await getUserFavorites(uid);
  }
);

export const mergeFavorites = createAsyncThunk(
  "favorites/mergeFavorites",
  async (uid) => {
    const local = getLocalFavorites();
    const server = await getUserFavorites(uid);
    const merged = Array.from(new Set([...local, ...server]));

    await saveUserFavorites(uid, merged);
    clearLocalFavorites();

    return { merged, showMessage: local.length > 0 };
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    mergedMessage: false,
  },
  reducers: {
    addFavorite(state, action) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.items = state.items.filter(
        (id) => id !== action.payload
      );
    },
    clearMergeMessage(state) {
      state.mergedMessage = false;
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(mergeFavorites.fulfilled, (state, action) => {
        if (action.payload.merged.length > 0) {
          state.items = action.payload.merged;
        }
        state.mergedMessage = action.payload.showMessage;
      });
      
  },
});

export const {
  addFavorite,
  removeFavorite,
  clearMergeMessage,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;