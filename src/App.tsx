import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Footer } from "./components/site-parts/footer";
import { Header } from "./components/site-parts/header";
export function App() {
  return (
    <div className="App">
      <Header></Header>
      <Footer></Footer>{" "}
    </div>
  );
}
