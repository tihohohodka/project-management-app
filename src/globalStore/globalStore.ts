import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'appstorage',
  initialState: {
    _id: '',
    nameInputVal: '',
    loginInputVal: '',
    passwordInputVal: '',
    titletextSign: 'Sign Up',
    askSign: 'Already registered?  ',
    hrefSignUp: 'Click here to go to Sign In tab',
    buttonSignBtn: 'Sign Up',
    autoComp: '',
    RequsetFunc: { value: () => undefined },
  },
  reducers: {
    nameInputValChange: (state, action) => {
      state.nameInputVal = action.payload;
    },
    loginInputValChange: (state, action) => {
      state.loginInputVal = action.payload;
    },
    passwordInputValChange: (state, action) => {
      state.passwordInputVal = action.payload;
    },
    titletextSignChange: (state, action) => {
      state.titletextSign = action.payload;
    },
    askSignChange: (state, action) => {
      state.askSign = action.payload;
    },
    hrefSignUpChange: (state, action) => {
      state.hrefSignUp = action.payload;
    },
    autoCompChange: (state, action) => {
      state.autoComp = action.payload;
    },
    buttonSignBtnChange: (state, action) => {
      state.buttonSignBtn = action.payload;
    },
    RequsetFuncChange: (state, action) => {
      state.RequsetFunc = action.payload;
    },
  }
})



export const { nameInputValChange, loginInputValChange, passwordInputValChange, titletextSignChange, askSignChange, hrefSignUpChange, autoCompChange, buttonSignBtnChange, RequsetFuncChange } = appSlice.actions

export const store = configureStore({
  reducer: {
    registrwindw: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})




store.subscribe(() => console.log(store.getState()))
