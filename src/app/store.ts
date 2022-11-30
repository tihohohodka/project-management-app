import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import appReducer, { appSlice } from '../features/counter/counterSlice';
import AuthReducer from '../features/reduxAuth'
import langReducer from '../features/reduxLang'
export const store = configureStore({
  reducer: {
    counte: appReducer,
    reducer: appSlice.reducer,
    auth: AuthReducer,
    lang: langReducer
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
