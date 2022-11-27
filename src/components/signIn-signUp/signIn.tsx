import React from 'react';
import { Link } from 'react-router-dom';
import {
  loginInputValChange,
  passwordInputValChange,
  signInRequest,
  useAppSelector,
  useAppDispatch,
} from '../../globalStore/globalStore';
import './signIn-signUp.css';



function SignIn() {
  const { loginInputVal, passwordInputVal } = useAppSelector((state) => state.registrwindw)

  const dispatch = useAppDispatch();

  return (
    <div className="authpage">
      <div className="modalsign">
        <h2>Sign In</h2>
        <form>
          <div className="loginInp">
            <label>Enter login: </label><input placeholder="Login" type="text" autoComplete="username" value={loginInputVal} onChange={(e) => dispatch(loginInputValChange(e.target.value))}></input>
          </div>
          <div className="passwordInp">
            <label>Enter password: </label><input placeholder="Password" type="password" autoComplete="current-password" value={passwordInputVal} onChange={(e) => dispatch(passwordInputValChange(e.target.value))}></input>
          </div>
          <button onClick={signInRequest as unknown as React.MouseEventHandler<HTMLButtonElement>}>Sign In</button>
          <div className="go-sign-up-tab"><span>Not registered?   </span>
          <Link to="/SignUp">
            <span className="href-sign-up">Click here to go to Sign Up page</span>
          </Link>
          </div>
        </form>
      </div>
    </div>

  );
}

export default SignIn;