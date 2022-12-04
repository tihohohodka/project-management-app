import { createSlice } from '@reduxjs/toolkit';
import ModalCreateBoard from '../components/main-route/modalCreateBoard';
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
    modalview: '',
    modalCreateBrdTitleVal: '',
    modalCreateBrdDescVal: '',
    loadingboards: true,
  },
  reducers: {
    changeBoardsInfSync: (state, action) => {
      state.boardsInf = [...state.boardsInf, action.payload];
    },
    modalCreateBrdTitleChange: (state, action) => {
      state.modalCreateBrdTitleVal = action.payload;
    },
    modalCreateBrdDescChange: (state, action) => {
      state.modalCreateBrdDescVal = action.payload;
    },
    modalviewChange: (state, action) => {
      state.modalview = action.payload;
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

export const { changeBoardsInfSync, modalCreateBrdTitleChange, modalCreateBrdDescChange, modalviewChange } = BoardsContainerSlice.actions;

export default BoardsContainerSlice;
