

import React, { Component, useContext } from 'react'
import axios from 'axios'
import { Link, } from "react-router-dom";
import NavLog from "./NavLog";
import "./App.css";
import Foot from "./Foot.jsx";

export default class Patient extends Component {

  constructor(props) {

    if (localStorage.getItem("active") == 0) {
      window.location.href = "/"
    }
    super(props);
    this.state = {
      s: [],
      patientno: props.patientno,
      name: "",
    };
  }
  gettodosData() {
    axios.get(`http://localhost:4000/patient/${this.state.patientno}`).then(res => {
      console.log("data is", res.data)
      this.setState({
        ...this.state,
        name: res.data.name,
      })
    })


  }
  componentDidMount() {
    this.gettodosData()
  }
  render() {

    return (
      <>
        <NavLog />
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
                  {

                    <tr>
                      <th scope="row">{this.state.patientno}</th>
                      <td>{this.state.name}</td>
                      <td>
                        <Link to={`/view/${this.state.patientno}`}><button class="btn btn-info">View Details</button></Link>&nbsp;&nbsp;&nbsp;
                     <Link to={`/update/${this.state.patientno}`}><button class="btn btn-warning">Update Vitals</button></Link>&nbsp;&nbsp;&nbsp;
                    </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
          <Foot />
        </div>
      </>
    )
  }
}