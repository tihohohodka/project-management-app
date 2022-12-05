import { createSlice } from '@reduxjs/toolkit';

export const idClickedBoardSlice = createSlice({
  name: 'idClickedCard',
  initialState: {
    idBoradVal: localStorage.getItem('boardId') as string,
  },
  reducers: {
    idBoardChange: (state, action) => {
      state.idBoradVal = action.payload;
    },
  }
})

export const { idBoardChange } = idClickedBoardSlice.actions


export default idClickedBoardSlice.reducer;