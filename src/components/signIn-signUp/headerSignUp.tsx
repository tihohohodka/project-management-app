import React from "react";
import { changeLang } from "../../features/reduxLang";
import logo from "../../media/pics/logo.png";
import { Routes, Route, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector, logOut } from '../../globalStore/globalStore';
let YOffset = 0;

function HeaderSignUp() {
  const dispatch = useAppDispatch();
  const reduxAuth = useAppSelector((state) => state.auth);
  const reduxLang = useAppSelector((state) => state.lang);
  document.addEventListener("scroll", (event) => {
    if (window.pageYOffset >= 300) {
      document.querySelector("header")?.classList.add("scrolled");
    } else {
      document.querySelector("header")?.classList.remove("scrolled");
    }
  });
  return (
    <header>
      <img src={logo} className="header-logo"></img>
      <h1>Project Management System</h1>
      <div className="header-button-holder">
        {reduxLang.lang === "Russian" && (
          <>
            <Link to="/SignIn">
              <div className="header-button">Войти</div>
            </Link>
          </>
        )}
        {reduxLang.lang === "English" && (
          <>
            <Link to="/SignIn">
              <div className="header-button">Sign In</div>
            </Link>
          </>
        )}
        <select
          id="genderSelect"
          value={reduxLang.lang}
          onChange={(e) => {
            dispatch(changeLang(e.target.value));
          }}
        >
          <option value="Russian">Русский</option>
          <option value="English">English</option>
        </select>
      </div>
    </header>
  );
}

export default HeaderSignUp;
