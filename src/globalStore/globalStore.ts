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
    hiddenNameInp: true
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
    hiddenNameInpChange: (state, action) => {
      state.hiddenNameInp = action.payload;
    },
  }
})



export const { nameInputValChange, loginInputValChange, passwordInputValChange, titletextSignChange, askSignChange, hrefSignUpChange, autoCompChange, buttonSignBtnChange, RequsetFuncChange,hiddenNameInpChange } = appSlice.actions

export const store = configureStore({
  reducer: {
    registrwindw: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const signUpRequest = createAsyncThunk(
  'appstorage/sigup',
  async (evt: Event) => {
    evt.preventDefault();
    try{
      const res = await fetch('https://kanban-server-production.up.railway.app/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{
          "name": ${store.getState().registrwindw.nameInputVal},
          "login": ${store.getState().registrwindw.loginInputVal},
          "password": ${store.getState().registrwindw.passwordInputVal}
        }`
      });
      const data = await res.json();

      if(data._id){
        alert("Successful registration!");
        store.dispatch(nameInputValChange(''));
        store.dispatch(loginInputValChange(''));
        store.dispatch(passwordInputValChange(''));
      } else {
        alert(`Error ${data.statusCode}: ${data.message}`);
      }
      console.log(data);
    } catch {
      alert( `Error: reason unknown`);
    }
    
  }
);

export const signInRequest = createAsyncThunk(
  'appstorage/sigin',
  async (evt: Event) => {
    evt.preventDefault();
    try{
      const res = await fetch('https://kanban-server-production.up.railway.app/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{
          "login": ${store.getState().registrwindw.loginInputVal},
          "password": ${store.getState().registrwindw.passwordInputVal}
        }`
      });
      const data = await res.json();

      if(data.token){
        alert("Successful sign in!");
        localStorage.setItem('token', data.token);
        store.dispatch(loginInputValChange(''));
        store.dispatch(passwordInputValChange(''));
      } else {
        alert(`Error ${data.statusCode}: ${data.message}`);
      }
      console.log(data);
    } catch {
      alert( `Error: reason unknown`);
    }
    
  }
);


store.subscribe(() => console.log(store.getState()))
