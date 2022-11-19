import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface langState {
  lang: string;
}
const initialState: langState = {
  lang: "Russian",
};
export const langSlice = createSlice({
  name: "Lang",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});
export const { changeLang } = langSlice.actions;

export default langSlice.reducer;
