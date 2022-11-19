import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../features/counter/counterSlice';
import { appSlice } from '../globalStore/globalStore';

export const store = configureStore({
  reducer: {
    counte: appReducer,
    reducer: appSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
