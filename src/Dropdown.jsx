import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { BrowserRouter } from "react-router-dom";
import { useHistory, Link } from "react-router-dom"
import logo from "./img/dropdown.png";

//import './Details.css'
import Foot from './Foot'

import Select from "react-select";
import axios from "axios";

import NavLog from "./NavLog";



const Doctor = (props) => {
  const history = useHistory();
  if (localStorage.getItem("active") == 0) {
    history.push("/")
  }
  const [state1, setState1] = useState({
    name: ""
  })
  const [state, setState] = useState({
    patient: [],
    patientno: "",

  })

  let options


  useEffect(() => {
    axios.get(`http://localhost:4000/doctor/${props.regno}`).then(res => {
      console.log("name is", res.data.name)
      setState1({
        ...state1,
        name: res.data.name,
      })
    })
    axios.get(" http://localhost:4000/patient ").then(res => {

      const option = res.data.filter(d => d.regno == props.regno)
      options = option.map(data => ({
        "label": data.name,
        "value": data.patientno,
        "regno": data.regno
      }))
      console.log(options)
      setState({
        ...state,
        patient: options
      })

    })
  }, [])
  const change = (e) => {


    history.push(`/patient/${e.value}`)
  }

  return (
    <>


      <div stlye={{}}>
        <div class="bg_image">
          <NavLog />
          <Card
            style={{
              width: 600,
              height: 400,
              backgroundColor: "#ebddb9",
              marginLeft: 50,
              marginTop: 100
            }}
          >
            <CardContent>
              <Typography
                style={{ fontSize: 14 }}
                color="textSecondary"
                gutterBottom
              >
                <h4 class='top'><center>{state1.name}</center></h4>
              </Typography>
              <Typography variant="h5" component="h2">
                Hey doc! How are you doing?
          </Typography>
              <Typography
                style={{
                  marginBottom: 12,
                }}
                color="textSecondary"
              >
                Stay Motivated!
          </Typography>
              <Typography variant="body2" component="p">
                <Select options={state.patient} onChange={change} />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">You are our new soldier's of this medical war so... Stay Safe...</Button>
            </CardActions>
            <img src={logo} alt="" className="patient" />
          </Card>
          <Foot />
        </div>
      </div>

  );

    </>
  )
}
export default Doctor;