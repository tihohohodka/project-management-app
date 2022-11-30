import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Footer } from "./components/site-parts/footer";
import { Header } from "./components/site-parts/header";
import SignInSignUp from "./components/signIn-signUp";
import { Routes, Route, Link } from "react-router-dom";
import { Welcome } from "./components/welcome-page/welcome-page";
import { EditProfile } from "./components/edit-profile";
function App() {
  return (
    <Routes>
      <Route path="*" element={<Unknown />} />
      <Route path="/" element={<Home />} />
      <Route path="SignIn" element={<SignInSignUp />} />
      <Route path="EditProfile" element={<EditProfile />} />
    </Routes>
  );
}
export default App;

function Home() {
  return (
    <div className="App">
      <Welcome></Welcome>
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
