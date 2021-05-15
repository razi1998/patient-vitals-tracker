import React,{useState,useEffect} from "react";
import moment from "moment";
import axios from "axios";
import NavLog from './NavLog'
import Foot from './Foot'
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { KeyboardDatePicker } from '@material-ui/pickers'
const UpdateVital = (props) => {
  const history=useHistory()
  if(localStorage.getItem("active")==0)
  {
    history.push("/")
  }

  useEffect(()=>{
    axios.get(`http://localhost:4000/patient/${props.patientno}`).then(res=>{
      const detail1=res.data.detail.map(data=>({
        "date":data.date,
        "ol":data.ol,
        "bp":data.bp,
        "temp":data.temp,
        "remark":data.remark
      }))
      setState({
            ...state,
            detail:detail1,
         
            name: res.data.name,
            dob:res.data.dob,
            patientno:res.data.patientno,
            disease:res.data.disease,
            regno:res.data.regno,
            gender:res.data.gender,
            age:res.data.age

      })
      
    })
                    
    
    
  },[])

  const[state,setState]=useState({
        vital:{
          date:"",
          ol:"",
          bp:"",
          temp:"",
          remark:""
        },
        detail:[],
        name:"",
        dob:"",
        patientno:"",
        disease:"",
        regno:"",
        gender:"",
        age:""
  })

  const change=(e)=>{
      const{name,value}=e.target;
      setState({
        ...state,
         vital:{
           ...state.vital,
           [name]:value
         }
      })
     
  }
  const date=(e)=>{
    const name=e.target.name;
   
    const value=moment(e.target.value).format("MM-DD-YYYY");
   
    setState({
      ...state,
      vital:{
        ...state.vital,
        [name]:value
      }
    })
  }
   
  const submit=()=>{
   
    
      if(state.vital.date && state.vital.ol && state.vital.bp && state.vital.temp && state.vital.remark)
      {
        let data=state.detail.filter(data=>data.date!==state.vital.date);
     
        data.push(state.vital)
       
        axios.post(`http://localhost:4000/patient/${state.patientno}`,{
          name:state.name,
          dob:state.dob,
          patientno:state.patientno,
          detail:data,
          disease:state.disease,
          regno:state.regno,
          gender:state.gender,
          age:state.age
        })
        alert("Vitals updated successfully")
        window.location.reload()
      }
      else{
       ;

        alert("Please enter the data")
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
  return (
    <>
    <NavLog/>
    <div class="bg_image">
      <div class="container">
      <Grid>
        <Paper elevation={30} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2> Vital Data</h2>
          </Grid>

          <TextField
              id="date"
              type="date"
              name="date"
              fullWidth
              onChange={date}
              
            />

          <TextField
            label="Oxygen Level"
            placeholder="Oxygen Level(%)"
            fullWidth
            name="ol"
            type="number"
            onChange={change}
            
          />
          <TextField
            label="Body Temp"
            placeholder="Body Temp(c)"
            fullWidth
            required
            type="number"
            name="temp"
            onChange={change}
          />
          <TextField label="BP" 
          placeholder="Blood prssure(mmHg)" 
          fullWidth 
          required
          name="bp"
          
          onChange={change}
          
          />
          <TextField
            label="Remarks"
            placeholder="Temark"
            fullWidth
            required
            name="remark"
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
  );
};
export default UpdateVital;