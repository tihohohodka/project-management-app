import { createSlice } from '@reduxjs/toolkit';

export const idClickedBoardSlice = createSlice({
  name: 'idClickedCard',
  initialState: {
    idBoradVal: '',
  },
  reducers: {
    idBoardChange: (state, action) => {
      state.idBoradVal = action.payload;
    },
  }
})

export const { idBoardChange } = idClickedBoardSlice.actions


export default idClickedBoardSlice.reducer;