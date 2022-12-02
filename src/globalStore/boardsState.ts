import { createSlice } from '@reduxjs/toolkit';
import changeBoardsInfAsync from './asyncChangeBoards';



const BoardsContainerSlice = createSlice({
  name: 'appstorage',
  initialState: {
    boardsInf: [
      {
        title: '',
        desc: '',
        id: '',
      },
    ],
    loadingboards: true,
  },
  reducers: {
    boardInfChangeSync: (state, action) => {
      state.boardsInf = [action.payload, ...state.boardsInf];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeBoardsInfAsync.pending, (state) => {
        state.loadingboards = true;
      })
      .addCase(changeBoardsInfAsync.fulfilled, (state, action) => {
        state.loadingboards = false;
        state.boardsInf = action.payload;
      });
  },
})

export default BoardsContainerSlice;
