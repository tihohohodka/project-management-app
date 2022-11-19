import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeLang } from "../../features/reduxLang";
import logo from "../../media/pics/logo192.png";
import "./header.css";
let YOffset = 0;

export function Header() {
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
      <img src={logo}></img>
      <h1>Project Management System</h1>
      {reduxAuth.Auth && (
        <div className="header-button-holder">
          {reduxLang.lang === "Russian" && (
            <div className="header-button">Редактировать профиль</div>
          )}
          {reduxLang.lang === "Russian" && (
            <div className="header-button">Создать борду</div>
          )}
          {reduxLang.lang === "Russian" && (
            <div className="header-button">Выйти</div>
          )}
          {reduxLang.lang === "English" && (
            <div className="header-button">Edit Profile</div>
          )}
          {reduxLang.lang === "English" && (
            <div className="header-button">Create new Board</div>
          )}
          {reduxLang.lang === "English" && (
            <div className="header-button">Sign Out</div>
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
            <div className="header-button">Войти</div>
          )}
          {reduxLang.lang === "Russian" && (
            <div className="header-button">Зарегистрироваться</div>
          )}
          {reduxLang.lang === "English" && (
            <div className="header-button">Sign In</div>
          )}
          {reduxLang.lang === "English" && (
            <div className="header-button">Sing Up</div>
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
    </header>
  );
}
