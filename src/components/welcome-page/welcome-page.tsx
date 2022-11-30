import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Routes, Route, Link } from "react-router-dom";
import welcomePicture from "../../media/pics/welcome-pic.png";
import nickPhoto from "../../media/pics/nick-photo.jpg";
import "./welcome-page.css";
import { Header } from "../site-parts/header";
import { Footer } from "../site-parts/footer";
import { changeAuth } from "../../features/reduxAuth";
let YOffset = 0;

export function Welcome() {
  const dispatch = useAppDispatch();
  const reduxLang = useAppSelector((state) => state.lang);
  const reduxAuth = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (localStorage.getItem("login")) {
      dispatch(changeAuth(true));
    }
  }, []);
  return (
    <div className="page-holder">
      <Header></Header>
      <main>
        <div className="title">
          {reduxLang.lang === "Russian" && <h1>Канбан</h1>}
          {reduxLang.lang === "English" && <h1>Kanban</h1>}
          <div className="title-content">
            {reduxLang.lang === "Russian" && (
              <h3>
                Наиудобнейшая программа для улучшшения взаимодействия в команде,
                а также развится командного духа коллектива путем создания
                карточек на досках
              </h3>
            )}
            {reduxLang.lang === "English" && (
              <h3>
                The most convenient program for improving team interaction, as
                well as developing the team spirit of the team by creating cards
                on the boards
              </h3>
            )}
            <img src={welcomePicture} className="welcome-picture-class"></img>
          </div>
        </div>
        {reduxLang.lang === "Russian" && <h2>Как работать с приложением</h2>}
        {reduxLang.lang === "English" && <h2>How to work with App</h2>}
        <div className="video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="Team">
          {reduxLang.lang === "Russian" && <h2>Команда</h2>}
          {reduxLang.lang === "English" && <h2>Team</h2>}
          <div className="member-holder">
            <div className="member-card">
              <img src={nickPhoto} className="welcome-picture-class"></img>
              {reduxLang.lang === "Russian" && <h3>Никита Гордеев</h3>}
              {reduxLang.lang === "English" && <h2>Nikita Gordeev</h2>}
              <p>
                всякая информация--всякая информация--всякая информация--всякая
                информация--всякая информация--всякая информация-- всякая
                информация--всякая информация
              </p>
            </div>
            <div className="member-card"></div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
