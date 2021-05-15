import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import logo from "./img/first_aid.jpg"
import logo1 from "./img/BrandLogo.png"

import './homef.css'
import './App.css'
const NavLog = () => {
  const logout=()=>{
    localStorage.setItem("active",0)
    window.location.href="/"
  }
  return (
    <BrowserRouter>
    <nav className="navbar navbar-expand-lg navbar-hover bg-dark">
      <div className="container-fluid">
      <img src={logo1} alt="" className="" />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
         
            <li className="nav-item">
              <Link to="/dropdown/12" className="nav-link active">&nbsp;&nbsp;&nbsp;Home&nbsp;<i class="fas fa-user"></i></Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={logout}>Logout</button>
            </li>
          </ul>
          <div class="img"><img src={logo} alt="" className="first_aid" /></div>
        </div>
      </div>
    </nav>
    </BrowserRouter>
  )
}
export default NavLog ;