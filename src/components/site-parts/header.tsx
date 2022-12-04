import React, { useEffect } from "react";
import { changeLang } from "../../features/reduxLang";
import logo from "../../media/pics/logo.png";
import { Routes, Route, Link } from "react-router-dom";
import { modalviewChange } from '../../globalStore/boardsState';
import "./header.css";
import {
  useAppDispatch,
  useAppSelector,
  logOut,
} from "../../globalStore/globalStore";
let YOffset = 0;
const token = localStorage.getItem("token");
export function Header() {
  const dispatch = useAppDispatch();
  const reduxAuth = useAppSelector((state) => state.auth);
  const reduxLang = useAppSelector((state) => state.lang);
  useEffect(() => {
    console.log("auth = " + reduxAuth.Auth);
  }, []);
  document.addEventListener("scroll", (event) => {
    if (window.pageYOffset >= 300) {
      document.querySelector("header")?.classList.add("scrolled");
    } else {
      document.querySelector("header")?.classList.remove("scrolled");
    }
  });
  return (
    <header>
      <Link to="/">
        <img src={logo} className="header-logo"></img>
      </Link>
      <h1>Project Management System</h1>
      {reduxAuth.Auth && (
        <div className="header-button-holder">
          {reduxLang.lang === "Russian" && (
            <>
              <Link to="/MainRoute">
                <div className="header-button">Главная страница</div>
              </Link>
              <Link to="/EditProfile">
                <div className="header-button">Редактировать профиль</div>
              </Link>
              <div className="header-button" onClick={() => dispatch(modalviewChange('create'))}>Создать борду</div>
              <div className="header-button" onClick={logOut}>
                Выйти
              </div>
            </>
          )}

          {reduxLang.lang === "English" && (
            <>
              <Link to="/MainRoute">
                <div className="header-button">Main page</div>
              </Link>
              <div className="header-button">Edit Profile</div>
              <div className="header-button" onClick={() => dispatch(modalviewChange('create'))}>Create new Board</div>
              <div className="header-button">Sign Out</div>
            </>
          )}
          <select
            id="genderSelect"
            onChange={(e) => {
              dispatch(changeLang(e.target.value));
            }}
          >
            <option value="Russian">Русский</option>
            <option value="English">English</option>
          </select>
        </div>
      )}
      {!reduxAuth.Auth && (
        <div className="header-button-holder">
          {reduxLang.lang === "Russian" && (
            <>
              <Link to="/SignIn">
                <div className="header-button">Войти</div>
              </Link>
              <Link to="/SignUp">
                <div className="header-button">Зарегистрироваться</div>
              </Link>
            </>
          )}
          {reduxLang.lang === "English" && (
            <>
              <Link to="/SignIn">
                <div className="header-button">Sign In</div>
              </Link>
              <Link to="/SignUp">
                <div className="header-button">Sing Up</div>
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
      )}
    </header>
  );
}
