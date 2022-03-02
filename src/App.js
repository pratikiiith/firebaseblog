import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
     <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Home</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {!isAuth ? (
                <li className="nav-item"> <Link className="nav-link" to="/Login">Sign in</Link> </li>
                )
                :
                (
                  <>
                    <li className="nav-item"> <Link className="nav-link" to="/createpost">Create Post</Link> </li>
                    <button onClick={signUserOut}> Log Out</button>
                  </>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
      <div className="outter">
        <div className="inner">
          <Routes>
            <Route path="/" element={<Home isAuth={isAuth} />} />
            <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
            <Route path="/Login" element={<Login setIsAuth={setIsAuth} />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;