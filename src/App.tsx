import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Footer } from "./components/site-parts/footer";
import { Header } from "./components/site-parts/header";
import SignInSignUp from "./components/signIn-signUp";
import { Routes, Route, Link } from "react-router-dom";
import MainRoute from './components/main-route/main-route';
function App() {
  return (
    <Routes>
      <Route path="*" element={<Unknown />} />
      <Route path="/" element={<Home />} />
      <Route path="SignIn" element={<SignInSignUp />} />
      <Route path="/MainRoute" element={<MainRoute />} />
    </Routes>
  );
}
export default App;

function Home() {
  return (
    <div className="App">
      <Header></Header>
      help
      <Link to="SignIn">Sign In</Link>
      <Footer></Footer>
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
