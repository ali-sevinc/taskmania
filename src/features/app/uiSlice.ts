import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  style: "list" | "grid";
}
const initialState: AppState = {
  style: "list",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    list: (state) => {
      state.style = "list";
    },
    grid: (state) => {
      state.style = "grid";
    },
  },
});

export const { grid, list } = appSlice.actions;
export default appSlice.reducer;
