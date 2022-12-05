import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Footer } from "./components/site-parts/footer";
import { Header } from "./components/site-parts/header";
import { Welcome } from "./components/welcome-page/welcome-page";
import { EditProfile } from "./components/edit-profile";
import SignUp from "./components/signIn-signUp/signUp";
import SignIn from "./components/signIn-signUp/signIn";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ToastWindow from "./components/toast-window/toast-window";
import {
  openToast,
  useAppDispatch,
  useAppSelector,
} from "./globalStore/globalStore";
import { changeAuth } from "./features/reduxAuth";
import welcomePicture from "./media/pics/welcome-pic.png";
import nickPhoto from "./media/pics/nick-photo.jpg";
import { BoardPage } from "./components/board-page/board-page";
import MainRoute from './components/main-route/main-route';
const FIFTEEN_MINUTES: number = 900000;

function App() {
  const dispatch = useAppDispatch();
  const reduxAuth = useAppSelector((state) => state.auth);
  async function tokenCheck() {
    if (localStorage.getItem("token")) {
      let res;
      try {
        res = await fetch(
          "https://kanban-server-production.up.railway.app/users",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (res.ok != false) {
          dispatch(changeAuth(true));
        } else {
          dispatch(changeAuth(false));
          localStorage.clear();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(changeAuth(false));
      localStorage.clear();
    }
  }

  React.useEffect(() => {
    setInterval(tokenCheck, FIFTEEN_MINUTES);
    if (localStorage.getItem("token")) {
      dispatch(changeAuth(true));
      openToast(`Hello ${localStorage.getItem("login")}`);
    }
  }, []);
  return (
    <BrowserRouter>
      <ToastWindow />
      <Routes>
        <Route path="*" element={<Unknown />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/SignIn"
          element={
            localStorage.getItem("token") ? <Navigate to="/MainRoute" /> : <SignIn />
          }
        />
        <Route
          path="/SignUp"
          element={
            localStorage.getItem("token") ? <Navigate to="/MainRoute" /> : <SignUp />
          }
        />
        <Route
          path="/EditProfile"
          element={
            localStorage.getItem("token") ? <EditProfile />  : <Navigate to="/" />
          }
        />
        <Route
          path="/Boards"
          element={
            localStorage.getItem("token") ? <BoardPage />  : <Navigate to="/" />
          }
        />
        <Route
          path="/MainRoute"
          element={
            localStorage.getItem("token") ? <MainRoute />  : <Navigate to="/" />
          }
          />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

function Home() {
  const reduxAuth = useAppSelector((state) => state.auth);
  const reduxLang = useAppSelector((state) => state.lang);
  return (
    <div className="App">
      <Welcome>
        <main>
          <div className="title">
            {reduxLang.lang === "Russian" && <h1>Канбан</h1>}
            {reduxLang.lang === "English" && <h1>Kanban</h1>}
            <div className="title-content">
              {reduxLang.lang === "Russian" && (
                <h3>
                  Наиудобнейшая программа для улучшшения взаимодействия в
                  команде, а также развится командного духа коллектива путем
                  создания карточек на досках
                </h3>
              )}
              {reduxLang.lang === "English" && (
                <h3>
                  The most convenient program for improving team interaction, as
                  well as developing the team spirit of the team by creating
                  cards on the boards
                </h3>
              )}
              <img src={welcomePicture} className="welcome-picture-class"></img>
            </div>
          </div>
          {reduxLang.lang === "Russian" && <h2>Как работать с приложением</h2>}
          {reduxLang.lang === "English" && <h2>How to work with App</h2>}
          <div className="video">
            <iframe
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
                  всякая информация--всякая информация--всякая
                  информация--всякая информация--всякая информация--всякая
                  информация-- всякая информация--всякая информация
                </p>
              </div>
              <div className="member-card"></div>
            </div>
          </div>
        </main>
      </Welcome>
    </div>
  );
}
function Unknown() {
  return (
    <div className="App">
      <Header></Header>
      <h1>There is an error in path</h1>
      <Footer></Footer>
    </div>
  );
}
