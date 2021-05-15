import React,{useState,useEffect} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo from "./img/admin.jpg"
import axios from "axios";
import {useHistory} from "react-router-dom";
import PortalHome from "./PortalHome.jsx";

const Login=()=>{
    const history=useHistory()
    const[state,setState]=useState({
        email:"",
        password:"",
        email1:"",
        password1:"",
    })
    useEffect(()=>{
        axios.get("http://localhost:4000/admin").then(res=>{
          
                setState({
                    ...state,
                    email1:res.data[0].email,
                    password1:res.data[0].password,
                })
        })
    },[])
    
    const change=(e)=>{
            const{name,value}=e.target;
            setState({
                ...state,
                [name]:value
            })
           
    }
    
    const submit=()=>{
        
      if(state.email && state.password)
      {
        if(state.email===state.email1 && state.password==state.password1)
        {
            localStorage.setItem("admin",1)
            history.push("/portal");
        }
        else{
            alert("Invalid credentials")
        }
      }
      else
      {
          if(state.email)
          {
              alert("Please enter the password")
          }
          else
          {
              alert("Please enter the email")
          }
      }
            

    }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e',marginBottom:'10px'}
    const btnstyle={margin:'8px 0'}
    return(
        

        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Admin</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter Email' fullWidth required name="email" onChange={change}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required  name="password" onChange={change}/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                  <Typography> <Link href={`/changeadmin`}>Change Password</Link></Typography>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={submit} fullWidth>Sign in</Button>
                
                <img src={logo} alt="" className="admin" /> 
                
            </Paper>
            </Grid>
            

     
            
        
        
        
    )
}
export default Login;


