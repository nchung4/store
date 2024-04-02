import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: number[] = [];

const favoriteSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    setFav: (_, action: PayloadAction<number[]>) => action.payload,
    addFav: (state, action: PayloadAction<number>) => [
      ...state,
      action.payload,
    ],
    removeFav: (state, action: PayloadAction<number>) =>
      state.filter((item) => item !== action.payload),
  },
});

export const { setFav, addFav, removeFav } = favoriteSlice.actions;
export default favoriteSlice.reducer;
