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
  signUpRequest,
  signInRequest,
} from '../../globalStore/globalStore';
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

  function signTabToggle() {
    if(titletextSign === 'Sign In'){
      dispatch(titletextSignChange('Sign Up'));
      dispatch(askSignChange('Already registered?  '));
      dispatch(hrefSignUpChange('Click here to go to Sign In tab'));
      dispatch(autoCompChange('new-password'));
      dispatch(buttonSignBtnChange('Sign Up'));
      dispatch(RequsetFuncChange({value: signUpRequest}));
      dispatch(hiddenNameInpChange(true));
    } else {
      dispatch(titletextSignChange('Sign In'));
      dispatch(askSignChange('Not registered?  '));
      dispatch(hrefSignUpChange('Click here to go to Sign Up page'));
      dispatch(autoCompChange('current-password'));
      dispatch(buttonSignBtnChange('Sign In'));
      dispatch(RequsetFuncChange({value: signInRequest}));
      dispatch(hiddenNameInpChange(false));
    }
    return undefined;
  }

  return (
    <div className="authpage">
      <div className="modalsign">
        <h2>{titletextSign}</h2>
        <form>
          {hiddenNameInp ? (
            <div className="nameInp">
              <label>Enter name: </label><input placeholder="Name" type="text" autoComplete="username" value={nameInputVal} onChange={(e) => dispatch(nameInputValChange(e.target.value))}></input>
            </div>
          ) : undefined}
          <div className="loginInp">
            <label>Enter login: </label><input placeholder="Login" type="text" autoComplete="username" value={loginInputVal} onChange={(e) => dispatch(loginInputValChange(e.target.value))}></input>
          </div>
          <div className="passwordInp">
            <label>Enter password: </label><input placeholder="Password" type="password" autoComplete={autoComp} value={passwordInputVal} onChange={(e) => dispatch(passwordInputValChange(e.target.value))}></input>
          </div>
          <button onClick={RequsetFunc.value as unknown as React.MouseEventHandler<HTMLButtonElement>}>{buttonSignBtn}</button>
          <div className="go-sign-up-tab"><span>{askSign}</span><span className="href-sign-up" onClick={signTabToggle}>{hrefSignUp}</span></div>
        </form>
      </div>
    </div>

  );
}

export default SignInSignUp;
