import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"
import moment from "moment";
import { useHistory } from "react-router-dom"
import Toolbar from './Toolbar'
import Foot from './Foot'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  InputLabel,
  Typography,
  Link,
} from "@material-ui/core";
const UpdatePatient = (props) => {
  const history = useHistory();
  if (localStorage.getItem("admin") == 0) {
    history.push("/")
  }

  const lableText = { marginTop: '20px', }
  const [state, setState] = useState({

    name: "",
    patientno: "",
    dob: "",
    disease: "",
    regno: "",
    detail: [],
    gender: "",
    age: ""
  })
  const [state1, setState1] = useState({
    doctor: [],
    gender: [
      {
        label: "male",
        name: "gender"
      },
      {
        label: "female",
        name: "gender"
      },
      {
        label: "other",
        name: "gender"
      }
    ]
  })
  useEffect(() => {

    axios.get(`http://localhost:4000/patient/${props.patientno}`).then(res => {
      console.log("date is", res.data.dob)
      setState({
        ...state,
        name: res.data.name,
        patientno: res.data.patientno,
        dob: moment(res.data.dob).format("YYYY-MM-DD"),
        disease: res.data.disease,
        detail: res.data.detail,
        regno: res.data.regno,
        gender: res.data.gender,
        age: res.data.age

      })
      axios.get("http://localhost:4000/doctor").then(res => {

        const doctors = res.data.map(data => ({
          "label": `${data.name}(${data.regno})`,
          "regno": data.regno,
          "name": "regno"
        }))
        setState1({
          ...state1,
          doctor: doctors
        })
      })
    })
  }, [])

  const change = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value

    })

  }
  const doctor = (e) => {
    const { name, regno } = e;
    setState({
      ...state,
      [name]: regno
    })
  }
  const date = (e) => {

    const name = e.target.name;
    const value = moment(e.target.value).format("YYYY-MM-DD");
    setState({
      ...state,
      [name]: value
    })
  }
  const gen = (e) => {
    const label = e.label;
    const name = e.name;
    setState({
      ...state,
      [name]: label
    })
  }
  const submit = (e) => {

    if (state.name && state.dob && state.disease && state.regno && state.age && state.gender) {
      axios.post(` http://localhost:4000/patient/${props.patientno}`, {
        name: state.name,
        dob: moment(state.dob).format("MM/DD/YYYY"),
        disease: state.disease,
        regno: state.regno,
        detail: state.detail,
        patientno: state.patientno,
        gender: state.gender,
        age: state.age
      })
      alert("Details updated sucessfully")
    }
    else {
      if (!state.name) {
        alert("Please enter the name")
      }
      else if (!state.dob) {
        alert("Please select the date")
      }
      else if (!state.disease) {
        alert("Please enter the disease")
      }
      else if (!state.regno) {
        alert("Please select the doctor")
      }
      else if (!state.gender) {
        alert("Please select gender")
      }
      else if (!state.age) {
        alert("Please ente the age")
      }
    }
  }
  const paperStyle = {
    padding: 20,
    height: "85vh",
    width: 600,
    margin: "20px auto",

  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "30px 0" };

  return (
    <>
      <Toolbar />
      <div class="bg_image">
        <div class="container">
          <Grid>
            <Paper elevation={30} style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}>
                  <LockOutlinedIcon />
                </Avatar>
                <h2>Patient no:{state.patientno}</h2>
                <h2>Update patient details</h2>
              </Grid>

              <TextField
                label="Name"
                placeholder="Name"
                fullWidth
                value={state.name}
                name="name" onChange={change}
                fullWidth
                required
              />

              <TextField
                label="Age"
                placeholder="Age"
                fullWidth
                value={state.age}
                name="age" onChange={change}
                fullWidth
                required
              />

              <TextField
                id="date"
                type="date"
                name="dob"

                fullWidth
                value={state.dob}
                onChange={date}

              />

              <Typography variant="body2" style={lableText} required>
                <InputLabel id="demo-simple-select-helper-label">Select gender</InputLabel>
                <Select labelId="demo-simple-select-helper-label" options={state1.gender} onChange={gen} />

              </Typography>


              <TextField label="Disease"
                placeholder="Disease"
                fullWidth
                required
                value={state.disease}
                name="disease"
                onChange={change}

              />

              <Typography variant="body2" style={lableText} required>
                <InputLabel id="demo-simple-select-helper-label">Select Doctor</InputLabel>
                <Select labelId="demo-simple-select-helper-label" options={state1.doctor} onChange={doctor} />
              </Typography>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                onClick={submit}
              >
                Submit
              </Button>
            </Paper>
          </Grid>
          <Foot />
        </div>
      </div>
    </>
  )
}
export default UpdatePatient;