import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Footer } from "./components/site-parts/footer";
import { Header } from "./components/site-parts/header";
import SignUp from "./components/signIn-signUp/signUp";
import SignIn from "./components/signIn-signUp/signIn";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ToastWindow from './components/toast-window/toast-window';
import { openToast, useAppDispatch } from './globalStore/globalStore';
import { changeAuth } from './features/reduxAuth';
import MainRoute from './components/main-route/main-route';
function App() {
  const dispatch = useAppDispatch();
  React.useEffect (() => {
    if(localStorage.getItem('token')){
      dispatch(changeAuth(true))
      openToast(`Hello ${localStorage.getItem('login')}`);
    }
  }, []);
  return (
    <BrowserRouter>
      <ToastWindow />
      <Routes>
        <Route path="*" element={<Unknown />} />
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={ localStorage.getItem('token') ? <Navigate to="/" /> : <SignIn /> } />
        <Route path="/SignUp" element={ localStorage.getItem('token') ? <Navigate to="/" /> : <SignUp /> } />
        <Route path="/MainRoute" element={<MainRoute />} />
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;

function Home() {
  return (
    <div className="App">
      <Header></Header>
      help
      <Link to="/SignIn">Sign In</Link>
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
