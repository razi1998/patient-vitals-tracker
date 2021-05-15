import React from "react";
import "./App.css";
import DrPortal from "./DoctorsPortal";
import PatientsPortal from "./PatientsPortal";
import Foot from './Foot'
import Toolbars from './Toolbars'

function App() {
    if(localStorage.getItem("admin")==0)
    {
        window.location.href="/";
    }
    return (
        <div class="float-container">
            <div><Toolbars /></div>
            <div class="bg_image">
                <div class="float-child green">
                    <DrPortal />
                </div>
                <div class="float-child blue">
                    <PatientsPortal />
                </div>
            </div>
            <Foot /> 
        </div>
    );
}

export default App;