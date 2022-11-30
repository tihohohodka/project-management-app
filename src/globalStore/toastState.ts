import { createSlice } from '@reduxjs/toolkit';
import ToastWindow from '../components/toast-window/toast-window';

export const toastSlice = createSlice({
  name: 'toaststorage',
  initialState: {
    hideToastVal: 'toast-hidden',
    descriptionToastVal: 'Successful'
  },
  reducers: {
    visibilityToastChange: (state, action) => {
      state.hideToastVal = action.payload;
    },
    descriptionToastChange: (state, action) => {
      state.descriptionToastVal = action.payload;
    },
  }
})

export const { visibilityToastChange, descriptionToastChange } = toastSlice.actions


export default toastSlice.reducer;