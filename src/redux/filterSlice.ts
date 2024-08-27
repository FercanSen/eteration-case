import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  sortBy: string | null;
  brand: string[] | null;
  model: string[] | null;
}

const initialState: FilterState = {
  sortBy: null,
  brand: null,
  model: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string | null>) => {
      state.sortBy = action.payload;
    },
    setBrand: (state, action: PayloadAction<string[] | null>) => {
      state.brand = action.payload;
    },
    setModel: (state, action: PayloadAction<string[] | null>) => {
      state.model = action.payload;
    },
    clearFilters: (state) => {
      state.sortBy = null;
      state.brand = null;
      state.model = null;
    },
  },
});

export const { setSortBy, setBrand, setModel, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
