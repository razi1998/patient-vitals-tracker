import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Avatar } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import DoctorsLogo from './img/Doctors.jpg';
import { BrowserRouter, Link } from "react-router-dom";

const DrPortal = (props) => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  let users = '';
  const change = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    })
  }
  const submit = () => {

    axios.get("http://localhost:4000/login").then(res => {

      users = res.data

      //history.push("/home"); 
      console.log(res.data)
      let e = true
      let a = 0
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].email == state.email) {
          a++
          if (res.data[i].password == state.password) {
            console.log(res.data[i].email, res.data[i].password, state.email, state.password)
            e = false
            //history.push("/home"); 
            alert("Sucessfully")
          }
        }
      }
      if (e == true && a != 0) {
        alert("Invalid")
      }
    })
  }

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#3B5FA5' }
  const textStyle = { borderBottom: '5px solid #3B5FA5', paddingBottom: 10 }
  const formStyle = { paddingBottom: 15 }
  const spacing = { marginBottom: 50 }
  const textDecor = { textDecoration: 'none', color:'#3B5FA5'}
  return (
    <Grid align='center'>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
          <br />
          <h2 style={textStyle} >Doctor's Portal</h2>
        </Grid>
        <FormControl style={formStyle}>
          <InputLabel htmlFor="grouped-select">Doctors</InputLabel>
          <Select defaultValue="" id="grouped-select">
            <ListSubheader>Select </ListSubheader>
            <Link to="/adddoctor" style={textDecor}><MenuItem value={1}><PersonAddIcon />&nbsp;&nbsp;Add New Doctor</MenuItem></Link>
            
          </Select>
          <FormHelperText style={spacing}>Select Operation to make changes</FormHelperText>
        </FormControl>
        <img src={DoctorsLogo} alt="Doctors-Image" className="doctors" />
      </Paper>
    </Grid>
  )
}
export default DrPortal;


