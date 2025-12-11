import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharacters, fetchCharacterById } from "../services/apiService";

export const loadCharacters = createAsyncThunk(
  "items/loadCharacters",
  async ({ page, name, perPage }, thunkAPI) => {
    try {
      const data = await fetchCharacters({ page, name, perPage });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadCharacterDetails = createAsyncThunk(
  "items/loadCharacterDetails",
  async (id, thunkAPI) => {
    try {
      const data = await fetchCharacterById(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    selectedItem: null,
    page: 1,
    perPage: 5,            
    totalPages: 1,
    search: "",
    loading: false,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setPerPage(state, action) {   
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
        state.totalPages = action.payload.info.pages;
      })
      .addCase(loadCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loadCharacterDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCharacterDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(loadCharacterDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setSearch, setPerPage } = itemsSlice.actions;
export default itemsSlice.reducer;
