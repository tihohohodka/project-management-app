import React, { useEffect, ReactNode } from "react";
import { useAppSelector, useAppDispatch } from "../../globalStore/globalStore";
import { Routes, Route, Link } from "react-router-dom";
import welcomePicture from "../../media/pics/welcome-pic.png";
import nickPhoto from "../../media/pics/nick-photo.jpg";
import "./welcome-page.css";
import { Header } from "../site-parts/header";
import { Footer } from "../site-parts/footer";
import { changeAuth } from "../../features/reduxAuth";
let YOffset = 0;
type myProps = {
  children: ReactNode;
};
export function Welcome(props: myProps) {
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
      {props.children}

      <Footer></Footer>
    </div>
  );
}
