import { createSlice } from '@reduxjs/toolkit';

export const taskLoadingSlice = createSlice({
  name: 'taskLoading',
  initialState: {
    loading: false,
  },
  reducers: {
    taskLoadingChange: (state, action) => {
      state.loading = action.payload;
    },
  }
})

export const { taskLoadingChange } = taskLoadingSlice.actions


export default taskLoadingSlice.reducer;