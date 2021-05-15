import React,{useState,useEffect} from "react";
import axios from "axios";
import Toolbar from './Toolbar'
import Foot from './Foot'
import Select from "react-select";
import moment from "moment";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { eventNames } from "process";

const AddPatient=()=>{

    if(localStorage.getItem("admin")==0)
    {
      window.location.href="/"
    }
  const paperStyle = {
    padding: 20,
    height: "90vh",
    width: 600,
    margin: "20px auto",
    
  };
  
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "30px 0" };
  const lableText = { marginTop:'20px',}

    const[state1,setState1]=useState({
      ids:[],
      gender:[
        {
          label:"male",
         name:"gender"

        },
        {
          label:"female",
          name:"gender"
        },
        {
          label:"other",
          name:"gender"
        }
      ]
    })
  
    // useEffect(()=>{
    //   axios.get("http://localhost:4000/doctor").then(res=>{
    //     const arr=res.data.map(data=>({
    //       "label" : data.regno,
    //       "name":"regno"
    //     }))
    //     setState1({
    //       ids:arr
    //     })
    //     console.log(state1.ids)
    //   })
    // })

    useEffect(()=>{
      getOption()
    },[])
    async function getOption(){
      const res=await axios.get("http://localhost:4000/doctor");
     const arr=res.data.map(data=>({
       "label":`${data.name}(${data.regno})`,
       "regno":data.regno,
       "name":"regno"
      
     }))
     setState1({
       ...state1,
       ids:arr
     })
     
    }
    
    const[state,setState]=useState({
        name:"",
        dob:"",
        patientno:"",
        disease:"",
        regno:"",
        detail:[],
        gender:"",
        age:""
    })
    const change=(e)=>{
     
      const{name,value}=e.target
        setState({
            ...state,
            [name]:value,
        })
       

    }
    const doctor=(e)=>{
      const{name,regno}=e;
      setState({
        ...state,
        [name]:regno
      })
    
    }
    const gen=(e)=>{
      
      const{name,label}=e;
     
      setState({
        ...state,
        [name]:label
      })
      console.log(state)
    }
    const date=(e)=>{
        const name=e.target.name;
        const value=moment(e.target.value).format("MM/DD/YYYY")
       setState({
         ...state,
         [name]:value
       })
    }
    const submit=(e)=>{
      console.log(state)
      if(state.name && state.dob && state.patientno && state.disease && state.regno  && state.gender && state.age)
      {
        axios.post("http://localhost:4000/patient",{
          name:state.name,
          dob:state.dob,
          patientno:state.patientno,
          disease:state.disease,
          regno:state.regno,
          detail:state.detail,
          gender:state.gender,
          age:state.age
      })
      alert("successfully data inserted")
      window.location.reload()
      }
      else
      {
         if(!state.name)
         {
           alert("Please enter the name")
         }
         else if(!state.dob)
         {
           alert("Please select the date")
         }
         else if(!state.patientno)
         {
           alert("Please enter the patient no")
         }
         else if(!state.disease)
         {
           alert("Please enter the disease")
         }
         else if(!state.regno)
         {
           alert("Please select the doctor")
         }
         else if(!state.gender)
         {
           alert("Please select the gender")
         }
         else if(!state.age)
         {
           alert("Please enter the age")
         }
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
              <h2>Add New Patient</h2>
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
                label="Age"
                placeholder="Age"
                fullWidth
                name="age" onChange={change}
                fullWidth
                required
              />
      
      
              
                  <Typography style ={lableText}>
              <InputLabel id="demo-simple-select-helper-label">Admission Date</InputLabel>
              <TextField
                id="date"
                type="date"
                name="dob"
                fullWidth
                required
                onChange={date}

              />
              </Typography>
            <TextField
              label="Patient No"
              placeholder="Patient No"
              fullWidth
              required
              name="patientno" onChange={change}
            />
      
            <TextField label="Disease" 
            placeholder="Disease" 
            fullWidth 
            required
            name="disease"
            onChange={change}
            
            />
            <Typography variant="body2" style={lableText} required>
            <InputLabel id="demo-simple-select-helper-label">Select gender</InputLabel>   
          <Select labelId="demo-simple-select-helper-label" options={state1.gender}  onChange={gen}/>
            
          </Typography>
            
            <Typography variant="body2" style={lableText} required>
            <InputLabel id="demo-simple-select-helper-label">Select Doctor</InputLabel>   
          <Select labelId="demo-simple-select-helper-label" options={state1.ids}  onChange={doctor}/>
            
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
        <Foot/>
      </div>
      </div>
      </>
    )
}
export default AddPatient;