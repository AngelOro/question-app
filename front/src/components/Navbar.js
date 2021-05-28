import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/question.png"

export const PublicNavbar = ({children}) => (
  <nav className="navbar navbar-expand-lg nav">
    <div className="container-fluid">
      <div>
        <img className="logo" src={logo} alt="logo"/>
        <Link to="/">Home</Link>
        <Link to="/questions">Questions</Link>
      </div>
      <div className="sesion">
        {children}
      </div>
    </div>
  </nav>
);

export const PrivateNavbar = ({children}) => (
  <nav className="navbar navbar-expand-lg nav">
    <div className="container-fluid">
      <div>
        <img className="logo" src={logo} alt="logo"/>
        <Link to="/">Home</Link>
        <Link to="/questions">Questions</Link>
        <Link to="/new">New</Link>
        <Link to="/list"> My Questions</Link>
      </div>
      <div className="sesion">
        {children}
      </div>
    </div>  
  </nav>
);
