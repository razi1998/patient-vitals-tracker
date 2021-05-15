import axios from "axios";
import React,{useEffect, useState} from "react";
import Toolbar from './Toolbar'
import Foot from './Foot'
import Select from "react-select";
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

const Create=()=>{
  const history=useHistory()
  if(localStorage.getItem("admin")==0)
  {
   history.push("/")
  }
      const[state1,setState1]=useState({
        email:[]
      })
    useEffect(()=>{
      axios.get("http://localhost:4000/user").then(res=>{
       
        const emails=res.data.map(data=>({
          "email":data.email
        }))
        setState1({
          ...state1,
          email:emails
        })
      
      })
    },[])
        const[state,setState]=useState({
            email:"",
            regno:"",
            password:"",
        })
        const change=(e)=>{
            const{name,value}=e.target;
            setState({
                ...state,
                [name]:value,
            })
        }
      
        const submit=()=>{
          const data=state1.email.find(data=> data.email==state.email)
         if(typeof data =='undefined')
         {
          if(state.email && state.regno && state.password)
          {
            axios.post("http://localhost:4000/user",{
              regno:state.regno,
              email:state.email,
              password:state.password,
              location:window.location.origin
            })
            history.push("/adddoctor")
          }
          else
          {
            if(!state.regno)
            {
                alert("Please enter the registration no.")
            }
            else if(!state.email)
            {
              alert("Please enter the email")
            }
            else if(!state.password)
            {
              alert("Please enter the password")
            }
          }
         }
         else {
           alert("This email is already existed")
         }
           

          
        }
        const paperStyle = {
          padding: 20,
          height: "70vh",
          width: 600,
          margin: "20px auto",
          
        };
        
        const avatarStyle = { backgroundColor: "#1bbd7e" };
        const btnstyle = { margin: "30px 0" };
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
          <h2>Add New Register Doctor</h2>
        </Grid>

        

        <TextField
          label="Regno"
          placeholder="Regno"
          fullWidth
          name="regno" onChange={change}
          required
        />
        <TextField
            label="Email"
            placeholder="Email"
            fullWidth
            name="email" onChange={change}
            fullWidth
            required
          />
        <TextField label='Password'
         placeholder='Enter password'
          type='password' fullWidth required 
          name="password"
                     
             onChange={change}
                     />

        

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
export default Create;