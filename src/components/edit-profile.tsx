import React, { useEffect, useState } from "react";
import "./signIn-signUp/signIn-signUp.css";
import {
  nameInputValChange,
  loginInputValChange,
  passwordInputValChange,
  useAppSelector,
  useAppDispatch,
} from "../globalStore/globalStore";
import { useNavigate } from "react-router-dom";
import { changeAuth } from "../features/reduxAuth";
import { Header } from "./site-parts/header";
import { Footer } from "./site-parts/footer";
import "./edit-profile.css";
const token = localStorage.getItem("token");
const login = localStorage.getItem("login");
interface response {
  _id: string;
  name: string;
  login: string;
}
let profile: response;
export function EditProfile() {
  const { nameInputVal, loginInputVal, passwordInputVal } = useAppSelector(
    (state) => state.registrwindw
  );
  const reduxLang = useAppSelector((state) => state.lang);
  let navigate = useNavigate();

  const [refresh, setRefresh] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(async () => {
      try {
        const res = await fetch(
          "https://kanban-server-production.up.railway.app/users",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await res.json();
        for (let i = 0; i < data.length; i++) {
          if (data[i].login === login) {
            profile = data[i];
          }
        }
        dispatch(nameInputValChange(profile.name));
        dispatch(loginInputValChange(profile.login));
      } catch (err) {
        console.log(err);
      }
      setRefresh(refresh + 1);
    }, 0);
  }, []);

  async function onClickHandler() {
    const bodyRequest = {
      name: nameInputVal,
      login: loginInputVal,
      password: passwordInputVal,
    };
    console.log(JSON.stringify(bodyRequest));
    try {
      await fetch(
        `https://kanban-server-production.up.railway.app/users/${profile._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyRequest),
        }
      );
      localStorage.setItem("login", bodyRequest.login);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteHandler() {
    setDeleteModal(true);
  }
  async function cancelDelFunction() {
    setDeleteModal(false);
  }
  async function delFunction() {
    try {
      await fetch(
        `https://kanban-server-production.up.railway.app/users/${profile._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/");
      dispatch(changeAuth(false));
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="page-holder">
      <Header></Header>
      <main>
        {reduxLang.lang === "Russian" && (
          <h1 className="edit-pr-h1">Имя: {profile && profile.name}</h1>
        )}
        {reduxLang.lang === "Russian" && (
          <h1 className="edit-pr-h1">Логин: {profile && profile.login}</h1>
        )}
        {reduxLang.lang === "Russian" && (
          <h1 className="edit-pr-h1">Айди: {profile && profile._id}</h1>
        )}
        {reduxLang.lang === "English" && (
          <h1 className="edit-pr-h1">Name: {profile && profile.name}</h1>
        )}
        {reduxLang.lang === "English" && (
          <h1 className="edit-pr-h1">Login: {profile && profile.login}</h1>
        )}
        {reduxLang.lang === "English" && (
          <h1 className="edit-pr-h1">Id: {profile && profile._id}</h1>
        )}

        <div className="nameInp">
          {reduxLang.lang === "English" && <label>Enter name: </label>}
          {reduxLang.lang === "Russian" && <label>Введите Имя: </label>}
          <input
            placeholder="Name"
            type="text"
            autoComplete="username"
            value={nameInputVal}
            onChange={(e) => dispatch(nameInputValChange(e.target.value))}
          ></input>
        </div>
        <div className="loginInp">
          {reduxLang.lang === "English" && <label>Enter login: </label>}
          {reduxLang.lang === "Russian" && <label>Введите логин: </label>}
          <input
            placeholder="Login"
            type="text"
            autoComplete="username"
            value={loginInputVal}
            onChange={(e) => dispatch(loginInputValChange(e.target.value))}
          ></input>
        </div>
        <div className="passwordInp">
          {reduxLang.lang === "English" && <label>Enter password: </label>}
          {reduxLang.lang === "English" && <label>Введите пароль: </label>}
          <input
            placeholder="Password"
            type="password"
            value={passwordInputVal}
            onChange={(e) => dispatch(passwordInputValChange(e.target.value))}
          ></input>
        </div>
        <div className="button-handler">
          <button onClick={onClickHandler}>Change</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
        {deleteModal && (
          <div className="modalsign">
            {reduxLang.lang === "English" && (
              <p>Are you sure you want to delete your account?</p>
            )}
            {reduxLang.lang === "Russian" && (
              <p>Вы уверены, что хотите удалить свой аккаунт?</p>
            )}
            {reduxLang.lang === "English" && (
              <button onClick={delFunction}>Delete</button>
            )}
            {reduxLang.lang === "English" && (
              <button onClick={cancelDelFunction}>Cancel</button>
            )}
            {reduxLang.lang === "Russian" && (
              <button onClick={delFunction}>Удалить</button>
            )}
            {reduxLang.lang === "Russian" && (
              <button onClick={cancelDelFunction}>Отмена</button>
            )}
          </div>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}
