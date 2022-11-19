import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import AuthReducer from '../features/reduxAuth'
import langReducer from '../features/reduxLang'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
