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
    modalCrUpdBrdTitleVal: '',
    modalCrUpdBrdDescVal: '',
    loadingboards: true,
  },
  reducers: {
    changeBoardsInfSync: (state, action) => {
      state.boardsInf = [...state.boardsInf, action.payload];
    },
    modalCrUpdBrdTitleChange: (state, action) => {
      state.modalCrUpdBrdTitleVal = action.payload;
    },
    modalCrUpdBrdDescChange: (state, action) => {
      state.modalCrUpdBrdDescVal = action.payload;
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

export const { changeBoardsInfSync, modalCrUpdBrdTitleChange, modalCrUpdBrdDescChange, modalviewChange } = BoardsContainerSlice.actions;

export default BoardsContainerSlice;
