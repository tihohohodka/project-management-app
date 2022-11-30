import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface authState {
  Auth: boolean;
}
const initialState: authState = {
  Auth: false,
};
export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.Auth = action.payload;
    },
  },
});
export const { changeAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
