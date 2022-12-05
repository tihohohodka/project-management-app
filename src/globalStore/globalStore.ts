import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import AuthReducer, { changeAuth } from '../features/reduxAuth'
import langReducer from '../features/reduxLang'
import { useNavigate } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import toastReducer, { descriptionToastChange, visibilityToastChange } from './toastState';
import idClickedBoardReducer from './idClickedBoardState';
import BoardsContainerSlice, { changeBoardsInfSync, modalCrUpdBrdDescChange, modalCrUpdBrdTitleChange, modalviewChange } from './boardsState';
import changeBoardsInfAsync from './asyncChangeBoards';
export const SignInSignUpSlice = createSlice({
  name: 'appstorage',
  initialState: {
    nameInputVal: '',
    loginInputVal: '',
    passwordInputVal: '',
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
  }
})



export const { nameInputValChange, loginInputValChange, passwordInputValChange } = SignInSignUpSlice.actions

export const store = configureStore({
  reducer: {
    registrwindw: SignInSignUpSlice.reducer,
    auth: AuthReducer,
    lang: langReducer,
    toast: toastReducer,
    BoardsContainer: BoardsContainerSlice.reducer,
    idClickedBoard: idClickedBoardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


let oneTimeOut: NodeJS.Timeout | undefined;
let secondTimeOut: NodeJS.Timeout | undefined;
let thirdTimeOut: NodeJS.Timeout | undefined;

export function openToast(message: string) {
  store.dispatch(visibilityToastChange('toast toast-start'));
  store.dispatch(descriptionToastChange(message));
  oneTimeOut = setTimeout(store.dispatch, 3000, visibilityToastChange('toast toast-end'))
  secondTimeOut = setTimeout(store.dispatch, 4000, visibilityToastChange('toast-hidden'));
  thirdTimeOut = setTimeout(store.dispatch, 4000, descriptionToastChange(''));
}


export function closeToast() {
  store.dispatch(visibilityToastChange('toast toast-end'))
  clearTimeout(oneTimeOut);
  clearTimeout(secondTimeOut);
  clearTimeout(thirdTimeOut);
  setTimeout(store.dispatch, 1000, visibilityToastChange('toast-hidden'));
  setTimeout(store.dispatch, 1000, descriptionToastChange(''));
}

export interface ressign {
  statusCode: number;
  message: string;
}

export const signUpRequest = async () => {

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

    const data = await res.json()
      if(data.login){
        store.dispatch(nameInputValChange(''));
        store.dispatch(loginInputValChange(''));
        store.dispatch(passwordInputValChange(''));
        openToast('Successful registration')
        setTimeout(window.location.reload, 3000);
      } else {
        openToast('Error ' + data.statusCode + ':\n' + data.message)
      }
    } catch(e) {
      openToast((e as ressign).message);
    }
}

export const signInRequest = async () => {
  const bodyRequest = {
    login: store.getState().registrwindw.loginInputVal,
    password: store.getState().registrwindw.passwordInputVal
  }
  try{
    const res = await fetch('https://kanban-server-production.up.railway.app/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    });

    const data = await res.json();
    if(data.token){
      openToast("Successful sign in!");
      localStorage.setItem('token', data.token);
      localStorage.setItem('login', bodyRequest.login);
      store.dispatch(loginInputValChange(''));
      store.dispatch(passwordInputValChange(''));
      store.dispatch(changeAuth(true));
      setTimeout(function(){
        window.location.reload();
      }, 3000);
    } else {
      openToast('Error ' + data.statusCode + ':\n' + data.message);
    }
  } catch (e) {
    openToast((e as ressign).message);
  }
}


export const createBoardAsync = async () => {
  try{
    const resArrUsers = await fetch('https://kanban-server-production.up.railway.app/users', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
      },
    });

    const dataArrUsers = await resArrUsers.json();

    let userId = '';
    for(let i = 0; i < dataArrUsers.length; i++){
      if(dataArrUsers[i].login === localStorage.getItem('login')){
        userId = dataArrUsers[i]._id;
        break;
      }
    }
    const bodyRequest = {
      title: JSON.stringify({ title: store.getState().BoardsContainer.modalCrUpdBrdTitleVal, desc: store.getState().BoardsContainer.modalCrUpdBrdDescVal}),
      owner: userId,
      users: []
    }
    const res = await fetch('https://kanban-server-production.up.railway.app/boards', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    });

    const data = await res.json();
      store.dispatch(modalCrUpdBrdTitleChange(''));
      store.dispatch(modalCrUpdBrdDescChange(''));
      if(data._id){
        type dataType = ReturnType<typeof data>;
        const boarditem = JSON.parse(data.title);
        boarditem.id = data._id
        store.dispatch(modalviewChange(''));
        store.dispatch(changeBoardsInfSync(boarditem));
        openToast("Successful create board!");
      }
      else{
        openToast('Error ' + data.statusCode + ':\n' + data.message);
      }
  } catch (e) {
    openToast((e as ressign).message);
  }
}


export const updateBoardAsync = async () => {
  const idOfBoard = store.getState().idClickedBoard.idBoradVal;
  try{
    const resArrUsers = await fetch('https://kanban-server-production.up.railway.app/users', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
      },
    });

    const dataArrUsers = await resArrUsers.json();

    let userId = '';
    for(let i = 0; i < dataArrUsers.length; i++){
      if(dataArrUsers[i].login === localStorage.getItem('login')){
        userId = dataArrUsers[i]._id;
        break;
      }
    }
    const bodyRequest = {
      "title": JSON.stringify({ title: store.getState().BoardsContainer.modalCrUpdBrdTitleVal, desc: store.getState().BoardsContainer.modalCrUpdBrdDescVal}),
      "owner": userId,
      "users": []
    }
    const res = await fetch('https://kanban-server-production.up.railway.app/boards/' + idOfBoard, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    });
    const data = await res.json();
      store.dispatch(modalCrUpdBrdTitleChange(''));
      store.dispatch(modalCrUpdBrdDescChange(''));
      if(data._id){
        type dataType = ReturnType<typeof data>;
        const boarditem = JSON.parse(data.title);
        boarditem.id = data._id
        store.dispatch(modalviewChange(''));
        store.dispatch(changeBoardsInfAsync());
        openToast("Successful update board!");
      }
      else{
        openToast('Error ' + data.statusCode + ':\n' + data.message);
      }
  } catch (e) {
    openToast((e as ressign).message);
  }
}

export const deleteBoardAsync = async (evt: Event) => {
  evt.preventDefault();

  const idOfBoard = store.getState().idClickedBoard.idBoradVal;
  try{
    const res = await fetch(`https://kanban-server-production.up.railway.app/boards/${idOfBoard}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    const data = await res.json();

      if(data._id){
        type dataType = ReturnType<typeof data>;
        const boarditem = JSON.parse(data.title);
        boarditem.id = data._id;
        store.dispatch(modalviewChange(''));
        store.dispatch(changeBoardsInfAsync());
        openToast("Successful delete board!");
      }
      else{
        openToast('Error ' + data.statusCode + ':\n' + data.message);
      }
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
export type storeType = ReturnType<typeof store.getState>;
