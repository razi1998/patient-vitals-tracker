import React,{useState,useEffect} from "react"
import axios from "axios";
import {Link, useHistory} from "react-router-dom";

import Foot from './Foot'
import Toolbar from "./Toolbar";
const Delete=()=>{
  const history=useHistory()
  if(localStorage.getItem("admin")==0)
  {
    history.push("/")
  }
  
  const[state,setState]=useState({
      patient:[]
  })
  useEffect(()=>{
      axios.get("http://localhost:4000/patient").then(res=>{
          setState({
              ...state,
              patient:res.data
          })
      })
  },[])
  
    const confirm=()=>{
      axios.delete(`http://localhost:4000/patient/${state.patientno}`)
    }
    return(
      <>
      <Toolbar/>
        <div class="bg_image">     
          <div class="container">
               <div class="classtable">
                
               <table class="table table-success table-striped">
                <thead>
                  <tr>
                    <th scope="col">Patient no</th>
                    <th scope="col">Patient Name</th>
                    
                    
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {state.patient.map(data=>
            <tr>
            <th scope="row">{data.patientno}</th>
            <td>{data.name}</td>
            <td>
               <Link to={`/updatepatient/${data.patientno}`}><button onClick={confirm}>Update detail</button></Link>&nbsp;&nbsp;
                <Link to={`/delete/${data.patientno}`}><button onClick={confirm}>Delete</button></Link>
            </td>
            
          </tr>
    )}
                </tbody>
              </table>
               </div>
          </div>
          <Foot/>
          </div>
          
          </>
    )
}
export default Delete;