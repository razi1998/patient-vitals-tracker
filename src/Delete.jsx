
import axios from "axios";
import React,{useState,useEffect} from "react";
import {useHistory,Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Toolbar from "./Toolbar";
import Foot from './Foot'
import logo from "./img/delete.png"
import './App.css'
const Delete=(props)=>{
        const history=useHistory();
        if(localStorage.getItem("admin")==0)
        {
          history.push("/")
        }
        const[state,setState]=useState({
            id:"",
            name:"",
            
        })
        useEffect(()=>{
            axios.get(` http://localhost:4000/patient/${props.patientno}`).then(res=>{
                
                console.log("id is",res.data._id)
                setState({
                    ...state,
                    id:res.data._id,
                    name:res.data.name,
                    patientno:res.data.patientno


                })
                
            })
        },[])
       const submit=()=>{
        
            axios.delete(`http://localhost:4000/patient/${state.id}`)
            history.push("/delete")

       }

    return(
        <>
           <div >
        <div class="bg_image">
        <Toolbar/>
        <Card
          style={{
            width: 600,
            height:400,
            backgroundColor: "#b7c6c7",
            marginLeft:50,
            marginTop:100
          }}
        >
          <CardContent>
          <img src={logo} alt="" className="delete" />
            <Typography
              style={{ fontSize: 14 }}
              color="textSecondary"
              gutterBottom
            >
          
            </Typography>
            <Typography variant="h5" component="h2">
            <center><h2>Patient No:{state.patientno}</h2></center>
            <center><h2>Patient Name:{state.name}</h2></center>
            <center><button class="btn btn-success" onClick={submit}>Confirm</button></center>
            </Typography>
            <Typography
              style={{
                marginBottom: 12,
              }}
              color="textSecondary"
            >
              
              
            </Typography>
            <Typography variant="body2" component="p">
            
            <center>Keep Motivated!
              Kepp Safe</center>
              
            </Typography>
          </CardContent>
          
        </Card>
        <Foot/>
      </div>
      </div>
      
    ); 
            
            
        </>
    )
}
export default Delete;














































// import axios from "axios";




// import React,{useState,useEffect} from "react";
// import {useHistory,Link} from "react-router-dom";

// const Delete=(props)=>{
//         const history=useHistory();
//         const[state,setState]=useState({
//             id:"",
//             name:"",
            
//         })
//         useEffect(()=>{
//             axios.get(` http://localhost:4000/patient/${props.patientno}`).then(res=>{
                
//                 console.log("id is",res.data._id)
//                 setState({
//                     ...state,
//                     id:res.data._id,
//                     name:res.data.name,
//                     patientno:res.data.patientno


//                 })
                
//             })
//         },[])
//        const submit=()=>{
        
//             axios.delete(`http://localhost:4000/patient/${state.id}`)
//             history.push("/delete")

//        }

//     return(
//         <>
//             <center><h2>patientno:{state.patientno}</h2></center>
//             <center><h2>patient name:{state.name}</h2></center>
//             <center><button onClick={submit}>Confirm</button></center>
//         </>
//     )
// }
// export default Delete;