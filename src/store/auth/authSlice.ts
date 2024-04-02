import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthType } from "../../types";

interface AuthState {
  auth: AuthType | undefined;
}
const initialState: AuthState = { auth: undefined };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (_, action: PayloadAction<AuthState>) => ({ ...action.payload }),
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
