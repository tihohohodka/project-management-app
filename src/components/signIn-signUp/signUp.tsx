import React from 'react';
import { Link } from 'react-router-dom';
import {
  nameInputValChange,
  loginInputValChange,
  passwordInputValChange,
  signUpRequest,
  useAppSelector,
  useAppDispatch,
} from '../../globalStore/globalStore';
import './signIn-signUp.css';



function SignUp() {
  const { nameInputVal, loginInputVal, passwordInputVal} = useAppSelector((state) => state.registrwindw)

  const dispatch = useAppDispatch();

  return (
    <div className="authpage">
      <div className="modalsign">
        <h2>Sign Up</h2>
        <form>
          <div className="nameInp">
            <label>Enter name: </label><input placeholder="Name" type="text" autoComplete="username" value={nameInputVal} onChange={(e) => dispatch(nameInputValChange(e.target.value))}></input>
          </div>
          <div className="loginInp">
            <label>Enter login: </label><input placeholder="Login" type="text" autoComplete="username" value={loginInputVal} onChange={(e) => dispatch(loginInputValChange(e.target.value))}></input>
          </div>
          <div className="passwordInp">
            <label>Enter password: </label><input placeholder="Password" type="password" autoComplete="new-password" value={passwordInputVal} onChange={(e) => dispatch(passwordInputValChange(e.target.value))}></input>
          </div>
          <button onClick={signUpRequest as unknown as React.MouseEventHandler<HTMLButtonElement>}>Sign Up</button>
          <div className="go-sign-up-tab"><span>Already registered?  </span>
            <Link to="/SignIn">
              <span className="href-sign-up">Click here to go to Sign In page</span>
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
}

export default SignUp;
