import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProfile,
  updateProfile,
  uploadProfilePictureBase64,
} from "../services/profileService";

export const loadProfile = createAsyncThunk(
  "profile/loadProfile",
  async (uid) => {
    const data = await getProfile(uid);
    return data;
  }
);

export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async ({ uid, data }) => {
    await updateProfile(uid, data);
    return data;
  }
);

export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadProfilePicture",
  async ({ file, uid }) => {
    const photoURL = await uploadProfilePictureBase64(file, uid);
    return photoURL;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateProfileData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          ...state.data,
          ...action.payload,
        };
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.data = {
          ...state.data,
          photoURL: action.payload,
        };
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
