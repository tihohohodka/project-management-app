import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "../app/hooks";
import {
  nameInputValChange,
  loginInputValChange,
  passwordInputValChange,
  signInRequest,
  useAppSelector,
  useAppDispatch,
} from "../globalStore/globalStore";
import "./signIn-signUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "./site-parts/header";
import { Footer } from "./site-parts/footer";
export interface StateIntr {
  registrwindw: {
    nameInputVal: string;
    loginInputVal: string;
    passwordInputVal: string;
    titletextSign: string;
    askSign: string;
    hrefSignUp: string;
    buttonSignBtn: string;
    autoComp: string;
    RequsetFunc: { value: () => void };
    hiddenNameInp: boolean;
  };
}

function SignInSignUp() {
  const {
    nameInputVal,
    loginInputVal,
    passwordInputVal,
    titletextSign,
    askSign,
    hrefSignUp,
    buttonSignBtn,
    autoComp,
    RequsetFunc,
    hiddenNameInp,
  } = useSelector((state: StateIntr) => state.registrwindw);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxAuth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (reduxAuth.Auth) {
      return navigate("/");
    }
  });

  return (
    <div className="page-holder">
      <Header></Header>
      <div className="modalsign">
        <h2>{titletextSign}</h2>
        <form>
          {hiddenNameInp ? (
            <div className="nameInp">
              <label>Enter name: </label>
              <input
                placeholder="Name"
                type="text"
                autoComplete="username"
                value={nameInputVal}
                onChange={(e) => dispatch(nameInputValChange(e.target.value))}
              ></input>
            </div>
          ) : undefined}
          <div className="loginInp">
            <label>Enter login: </label>
            <input
              placeholder="Login"
              type="text"
              autoComplete="username"
              value={loginInputVal}
              onChange={(e) => dispatch(loginInputValChange(e.target.value))}
            ></input>
          </div>
          <div className="passwordInp">
            <label>Enter password: </label>
            <input
              placeholder="Password"
              type="password"
              autoComplete={autoComp}
              value={passwordInputVal}
              onChange={(e) => dispatch(passwordInputValChange(e.target.value))}
            ></input>
          </div>
          <button
            onClick={
              RequsetFunc.value as unknown as React.MouseEventHandler<HTMLButtonElement>
            }
          >
            {buttonSignBtn}
          </button>
          <div className="go-sign-up-tab">
            <span>{askSign}</span>
            <span className="href-sign-up">{hrefSignUp}</span>
          </div>
        </form>
        <Link to="/">Вернуться назад</Link>
      </div>
      <div className="background">1</div>
      <Footer></Footer>
    </div>
  );
}

export default SignInSignUp;
