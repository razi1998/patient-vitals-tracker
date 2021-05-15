import React, {useState,useEffect} from 'react';
import { useHistory} from "react-router-dom";
import axios from "axios";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import logo from "./img/doctor.png"
const Login=(props)=>{
    
    const[state,setState]=useState({
        email:"",
        password:"",
       
       
        
    });
    const[state1,setState1]=useState({
      regno:""
    })
    
  
  const change=(e)=>{
      e.preventDefault();
      const{name,value}=e.target;
      setState({
          ...state,
          [name]:value
      })
      
  }
  let history=useHistory();
  const submit=()=>{
     
      axios.get("http://localhost:4000/user").then(res=>{
        
          // users=res.data,
          console.log("reg data is==",res.data[0].regno)
         
          
         //history.push("/home"); 
         console.log(res.data)
       let e=true 
      
      if(state.email && state.password)
      {
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].email==state.email)
          {
            
            if(res.data[i].password==state.password)
            {
              console.log(res.data[i].email,res.data[i].password,state.email,state.password)
              e=false
                  localStorage.setItem("active",1)
                  
                history.push(`/dropdown/${res.data[i].regno}`);
             // alert("Sucessfully")
 
            }
           
          }
        }
       if(e==true )
       {
         alert("Invalid email or password")
         
       }
      }
      else{
       if(state.email)
       {
         alert("please enter the password")
       }
       else{
         alert("please enter the email")
       }
      }  

     })
     
    
  }
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e', marginBottom:'10px'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Doctor</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter Email' fullWidth required name="email"
                       value={state.email}
                       onChange={change}/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required name="password"
                       value={state.password}
                       onChange={change}
                        placeholder="Password" />
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Typography> <Link href={`/changedoctor`}>Change Password</Link></Typography>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick = {submit}>Sign in</Button>
                
                <img src={logo} alt="" className="doctor" />
            </Paper>
            
            </Grid>
       
        
    )
}
export default Login;
