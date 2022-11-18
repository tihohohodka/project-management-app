import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  nameInputValChange,
  loginInputValChange,
  passwordInputValChange,
  titletextSignChange,
  askSignChange,
  hrefSignUpChange,
  autoCompChange,
  buttonSignBtnChange,
  RequsetFuncChange,
  hiddenNameInpChange,
  signUpRequest
} from '../globalStore/globalStore';
import './signIn-signUp.css';

interface StateIntr {
  registrwindw: {
    nameInputVal: string;
    loginInputVal: string;
    passwordInputVal: string;
    titletextSign: string;
    askSign: string;
    hrefSignUp: string;
    buttonSignBtn: string;
    autoComp: string;
    RequsetFunc: {value: () => void};
    hiddenNameInp: boolean;
  }
}



function SignInSignUp() {
  const { nameInputVal, loginInputVal, passwordInputVal, titletextSign, askSign, hrefSignUp, buttonSignBtn, autoComp, RequsetFunc, hiddenNameInp} = useSelector((state: StateIntr) => state.registrwindw)

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(RequsetFuncChange({value: signUpRequest}))
  }, [])

  function signInRequest(evt: Event) {
    evt.preventDefault();
    console.log("Login");
    return undefined;
  }

  function signTabToggle() {
    if(titletextSign === 'Sign In'){
      dispatch(titletextSignChange('Sign Up'));
      dispatch(askSignChange('Already registered?  '));
      dispatch(hrefSignUpChange('Click here to go to Sign In tab'));
      dispatch(autoCompChange('new-password'));
      dispatch(buttonSignBtnChange('Sign Up'));
      dispatch(RequsetFuncChange({value: signUpRequest}));
    } else {
      dispatch(titletextSignChange('Sign In'));
      dispatch(askSignChange('Not registered?  '));
      dispatch(hrefSignUpChange('Click here to go to Sign Up page'));
      dispatch(autoCompChange('current-password'));
      dispatch(buttonSignBtnChange('Sign In'));
      dispatch(RequsetFuncChange({value: signInRequest}));
    }
    return undefined;
  }

  return (
    <div className="modalsign">
      <h2>{titletextSign}</h2>
      <form>
        <div className="name">
          <label>Enter name: </label><input placeholder="Name" type="text" autoComplete="username" value={nameInputVal} onChange={(e) => dispatch(nameInputValChange(e.target.value))}></input>
        </div>
        <div className="login">
          <label>Enter login: </label><input placeholder="Login" type="text" autoComplete="username" value={loginInputVal} onChange={(e) => dispatch(loginInputValChange(e.target.value))}></input>
        </div>
        <div className="password">
          <label>Enter password: </label><input placeholder="Password" type="password" autoComplete={autoComp} value={passwordInputVal} onChange={(e) => dispatch(passwordInputValChange(e.target.value))}></input>
        </div>
        <button onClick={RequsetFunc.value as unknown as React.MouseEventHandler<HTMLButtonElement>}>{buttonSignBtn}</button>
        <div className="go-sign-up-tab"><span>{askSign}</span><span className="href-sign-up" onClick={signTabToggle}>{hrefSignUp}</span></div>
      </form>

    </div>
  );
}

export default SignInSignUp;
