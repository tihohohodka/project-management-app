import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/reduxAuth';
import langReducer from '../features/reduxLang';
import toastReducer, { descriptionToastChange, visibilityToastChange } from './toastState';
export const SignInSignUpSlice = createSlice({
  name: 'appstorage',
  initialState: {
    isSignUp: true,
    _id: '',
    nameInputVal: '',
    loginInputVal: '',
    passwordInputVal: '',
    titletextSign: '',
    askSign: '',
    hrefSignUp: '',
    buttonSignBtn: '',
    autoComp: '',
    RequsetFunc: { value: () => undefined },
    hiddenNameInp: true
  },
  reducers: {
    isSignUpChange: (state, action) => {
      state.isSignUp = action.payload;
    },
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



export const { nameInputValChange, loginInputValChange, passwordInputValChange, titletextSignChange, askSignChange, hrefSignUpChange, autoCompChange, buttonSignBtnChange, RequsetFuncChange, hiddenNameInpChange, isSignUpChange } = SignInSignUpSlice.actions

export const store = configureStore({
  reducer: {
    registrwindw: SignInSignUpSlice.reducer,
    auth: AuthReducer,
    lang: langReducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export function openToast(message: string) {
  store.dispatch(visibilityToastChange('toast toast-start'));
  store.dispatch(descriptionToastChange(message));
  setTimeout(store.dispatch, 3000, visibilityToastChange('toast toast-end'))
  setTimeout(store.dispatch, 4000, visibilityToastChange('toast-hidden'));
  setTimeout(store.dispatch, 4000, descriptionToastChange(''));
}


export function closeToast() {
  store.dispatch(visibilityToastChange('toast toast-end'))
  setTimeout(store.dispatch, 1000, visibilityToastChange('toast-hidden'));
  setTimeout(store.dispatch, 1000, descriptionToastChange(''));
}

interface ressign {
  statusCode: number;
  message: string;
}

export const signUpRequest = async (evt: Event) => {
  evt.preventDefault();
  const bodyRequest = {
    "name": store.getState().registrwindw.nameInputVal,
    "login": store.getState().registrwindw.loginInputVal,
    "password": store.getState().registrwindw.passwordInputVal
  }
  try {
    const res = await fetch('https://kanban-server-production.up.railway.app/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    })

    console.log(res);
    if(res.status === 409){
      console.log('dfdfdfdfdfd');
      throw Error('Error 409: login already exist')
    }
    if(res.status === 400){
      console.log('dfdfdfdfdfd');
      throw Error('Error 400: Bad Request')
    }
    if(!res.ok){
      throw Error('Unknown error')
    }
    const data = await res.json()
      console.log(data);
      if(data._id){
        store.dispatch(nameInputValChange(''));
        store.dispatch(loginInputValChange(''));
        store.dispatch(passwordInputValChange(''));
        window.location.reload();
      } else {
        openToast('Error ' + data.statusCode + ':\n' + data.message)
      }
      console.log(data);
    } catch(e) {
      openToast((e as ressign).message);
    }
}

export const signInRequest = async (evt: Event) => {
  evt.preventDefault();
  const bodyRequest = {
    login: store.getState().registrwindw.loginInputVal,
    password: store.getState().registrwindw.passwordInputVal
  }
  console.log(store.getState().registrwindw.loginInputVal);
  try{
    const res = await fetch('https://kanban-server-production.up.railway.app/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    });
    if(res.status === 409){
      throw Error('Error 409: login already exist')
    }
    if(res.status === 400){
      throw Error('Error 400: Bad Request')
    }
    if(!res.ok){
      throw Error('Unknown error')
    }
    const data = await res.json();
    console.log(data);
    if(data.token){
      openToast("Successful sign in!");
      localStorage.setItem('token', data.token);
      localStorage.setItem('login', bodyRequest.login);
      store.dispatch(loginInputValChange(''));
      store.dispatch(passwordInputValChange(''));
      window.location.reload();
    } else {
      openToast('Error ' + data.statusCode + ':\n' + data.message);
    }
    console.log(data);
  } catch (e) {
    openToast((e as ressign).message);
  }
}

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('login');
  localStorage.clear();
  window.location.reload();
}

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;


store.subscribe(() => console.log(store.getState()))
