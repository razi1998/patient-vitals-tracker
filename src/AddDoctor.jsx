import React,{useState,useEffect} from "react";
import axios from "axios";
import Toolbar from './Toolbar'
import Foot from './Foot';
import {useHistory} from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,

  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";


const AddDoctor=()=>{
  const history=useHistory();
  if(localStorage.getItem("admin")==0)
  {
    history.push("/")
  }

  const[state1,setState1]=useState({
    doctor:[]
  })
 useEffect(()=>{
    axios.get("http://localhost:4000/doctor").then(res=>{
      const doctors=res.data.map(data=>({
        "regno":data.regno
      }))
      setState1({
        ...state1,
        doctor:doctors
      })
    })
 })



  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 600,
    margin: "20px auto",
    
  };
  
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "30px 0" };
    const[state,setState]=useState({
        name:"",
        specialization:"",
        regno:"",
        degree:"",
        mob:"",
    })
    const change=(e)=>{
        const{name,value}=e.target;
        setState({
          ...state,
          [name]:value
        })
    }
    const submit=()=>{

      const data=state1.doctor.find(data=> data.regno==state.regno)
      if(typeof data == 'undefined')
      {
        if(state.name && state.specialization && state.regno && state.degree && state.mob)
        {
         axios.post("http://localhost:4000/doctor",{
           name:state.name,
           specialization:state.specialization,
           regno:state.regno,
           degree:state.degree,
           mob:state.mob
       })
       history.push("/create")
        }
        else
        {
          if(!state.name)
          {
            alert("Please enter name")
          }
          else if(!state.specialization)
          {
            alert("Please enter specialization")
          }
          else if(!state.regno)
          {
            alert("Please enter registration no")
          }
          else if(!state.degree)
          {
            alert("Please enter the degree")
          }
          else if(!state.mob)
          {
            alert("Please enter the mob no")
          }
        }
      }
      else{
        alert("Please enter new Doctors ID")
      }
    
    }

    return(
        <>
        <Toolbar/>
    <div class="bg_image">
      <div class="container">
      <Grid>
        <Paper elevation={30} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Add New Doctor</h2>
          </Grid>

          <TextField
              label="Name"
              placeholder="Name"
              fullWidth
              name="name" onChange={change}
              fullWidth
              required
            />

          <TextField
            label="Specialization"
            placeholder="Specialization"
            fullWidth
            name="specialization" onChange={change}
            required
          />
          <TextField
            label="Doctor id"
            placeholder="Doctor id"
            fullWidth
            required
            name="regno" onChange={change}
          />

          <TextField label="Degree" 
          placeholder="Degree" 
          fullWidth 
          required
          name="degree"
          onChange={change}
          
          />
          <TextField
            label="Mob No"
            placeholder="Mob No"
            fullWidth
            required
            name="mob"
            onChange={change}
          />
         {/* <TextField
          select
          label="Choose Doctor"
          helperText="Doctor Name"
          fullWidth
        /> */}

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
      <Foot/>
    </div>
    </div>
    </>
    )
}

export default AddDoctor;
