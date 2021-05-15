import axios from "axios";
import React, { useEffect, useState } from "react";
import Toolbar from './Toolbar'
import Foot from './Foot'
import Select from "react-select";
import { useHistory } from "react-router-dom";
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

const ChangeDoctor = () => {
    const history = useHistory()
    if (localStorage.getItem("admin") == 0) {
        history.push("/")
    }
   
  
    const [state, setState] = useState({
        email: "",
        
        password: "",
    })
    const[state1,setState1]=useState({
        password1:"",
        password2:"",
        password3:"",
        regno: "",
    })
    const change = (e) => {
        const { name, value } = e.target;
        setState1({
            ...state1,
            [name]: value,
        })

    }

    const submit = () => {

        console.log("regno is",state1.regno)
        axios.get(`http://localhost:4000/user/${state1.regno}`).then(res => {

           setState({
               ...state,
               email:res.data.email,
               regno:res.data.regno,
               password:res.data.password
           })
           
        })
       
       
      
            if (state1.password1  && state1.password2  && state1.password3 ) {
                axios.post(`http://localhost:4000/user/${state1.regno}`, {
                    regno: state1.regno,
                    email: state.email,
                    password: state1.password2,
                   
                })
             history.push("/")
            }
            else {
                if (!state1.password1) {
                    alert("Please enter the old password")
                }
                else if (!state1.password2) {
                    alert("Please enter the new password")
                }
                else if (!state.password3) {
                    alert("Please enter the confirm password")
                }
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
            <Toolbar />
            <div class="bg_image">
                <div class="container">
                    <Grid>
                        <Paper elevation={30} style={paperStyle}>
                            <Grid align="center">
                                <Avatar style={avatarStyle}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <h2>Change password</h2>
                            </Grid>

                            <TextField label='Registration no'
                                placeholder='Registration no'
                                type='' fullWidth required
                                name="regno"

                                onChange={change}
                            />
                            
                            <TextField label='old Password'
                                placeholder='old password'
                                type='password' fullWidth required
                                name="password1"

                                onChange={change}
                            />



                           
                            <TextField label='new Password'
                                placeholder='new password'
                                type='password' fullWidth required
                                name="password2"

                                onChange={change}
                            />
                             <TextField label='confirm password'
                                placeholder='confirm password'
                                type='password' fullWidth required
                                name="password3"

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
                    <Foot />
                </div>
            </div>
        </>
    )
}
export default ChangeDoctor;