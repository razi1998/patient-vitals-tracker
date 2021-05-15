import React from "react";
import "./App.css";
import DoctorLogin from "./DoctorLogin";
import AdminLogin from "./AdminLogin";
import Foot from './Foot'
import Toolbar from './Toolbar'

function App() {
  console.log("===========",localStorage.getItem("active"))
  return (
    <div class="float-container">
      <div><Toolbar/></div>
      <div class="bg_image">
        <div class="float-child green">
          <DoctorLogin />
        </div>

        <div class="float-child blue">
          <AdminLogin/>
        </div>
      </div>
      <Foot/>
      </div>
  );
}

export default App;