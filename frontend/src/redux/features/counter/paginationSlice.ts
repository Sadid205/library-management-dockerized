import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
export interface PaginationState {
  page: number;
}
const initialState: PaginationState = {
  page: 1,
};

export const paginatoinSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    increment: (state) => {
      state.page += 1;
    },
    decrement: (state) => {
      if (state.page > 0) {
        state.page -= 1;
      }
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const selectPage = (state: RootState) => state.pagination;

export const { increment, decrement } = paginatoinSlice.actions;

export default paginatoinSlice.reducer;
