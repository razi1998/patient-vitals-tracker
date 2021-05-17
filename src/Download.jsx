import React, { useState, useEffect } from "react";
import axios from "axios";
import NavLog from "./NavLog";
import { Button } from "@material-ui/core"
import jsPDF from "jspdf";

import { renderToString } from "react-dom/server";
 import 'jspdf-autotable'

const Download = (props) => {
    let s;
   

    const Prints1=()=>(

     
      <>
            <div class="container">
        <h2> Patient Name:{state.name}</h2>
        <h2> Patient No:{state.patientno}</h2>
       
        <div class="card">
          <div class="card-body">
            <table class="table table-success table-striped">
              
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">temperature</th>
                  <th scope="col">Oxygen level</th>
                  <th scope="col">Blood pressure</th>
                  <th scope="col">Remarks</th>
                  <th scope="col">Report</th>
                </tr>
              </thead>
              <tbody>
                {state.vitals.map(data =>
                  <tr>
                    <th scope="row">{data.date}</th>
                    <td>{data.temp}</td>
                    <td>{data.ol}</td>
                    <td>{data.bp}</td>
                    <td>{data.remark}</td>
                    <td>
                      
                    </td>
                  </tr>
                ) 
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
    )
  const Prints = () => (
    
    <>
   
    <h2> Patient Name:{state.name}</h2>
    <h2> Patient No:{state.patientno}</h2>
    
    <div class="card">
      <div class="card-body">
        <table class="table ">
          
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">temperature</th>
              <th scope="col">Oxygen level</th>
              <th scope="col">Blood pressure</th>
              <th scope="col">Remarks</th>
              <th scope="col">Report</th>
            </tr>
          </thead>
          <tbody>
          <tr>
                  <th scope="row">{s.date}</th>
                  <td>{s.temp}</td>
                  <td>{s.ol}</td>
                  <td>{s.bp}</td>
                  <td>{s.remark}</td>
                  <td>
                    <Button onClick={pdfGenerate}>Download</Button>
                  </td>
                </tr>
            
            
          </tbody>
        </table>
      </div>
    </div>
    </>
  
  )



 
  const pdfGenerate = (d) => {
     s=state.vitals.find(data=>data.date==d);
   
    
   
   
    const string = renderToString(<Prints />)
    const pdf = new jsPDF("p","mm","a2");
    pdf.fromHTML(string);
    pdf.save("pdf");
   
   
  }
  const [state, setState] = useState({
    vitals: [],
    name: "",
    patientno: props.patientno,
    
   

  });
  const generateAll=()=>{
    const string = renderToString(<Prints1 />)
    const pdf = new jsPDF("p","mm","a2");
    pdf.fromHTML(string);
    pdf.save("pdf");
  }
   
  useEffect(() => {
    axios.get(`http://localhost:4000/patient/10`).then(res => {
     
      const detail = res.data.detail.map(data => ({
        "date": data.date,
        "bp": data.bp,
        "ol": data.ol,
        "temp": data.temp,
        "remark": data.remark,
      }))
      setState({
        ...state,
        name: res.data.name,
        vitals: detail,
        patientno:res.data.patientno,
      })
     

     })

  }, [])

  return (
    <>
      <NavLog />
      <div class="container">
        <h2> Patient Name:{state.name}</h2>
        <h2> Patient No:{state.patientno}</h2>
        <div class="bbtn"> <button class="btn btn-success" onClick={generateAll}>Download All Data</button></div>
        <div class="card">
          <div class="card-body">
            <table class="table table-success table-striped">
              
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">temperature</th>
                  <th scope="col">Oxygen level</th>
                  <th scope="col">Blood pressure</th>
                  <th scope="col">Remarks</th>
                  <th scope="col">Report</th>
                </tr>
              </thead>
              <tbody>
                {state.vitals.map(data =>
                  <tr>
                    <th scope="row">{data.date}</th>
                    <td>{data.temp}</td>
                    <td>{data.ol}</td>
                    <td>{data.bp}</td>
                    <td>{data.remark}</td>
                    <td>
                      <Button onClick={()=>pdfGenerate(data.date)}>Download</Button>
                    </td>
                  </tr>
                ) 
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default Download;