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

const ChangeAdmin = () => {
    const history = useHistory()
    if (localStorage.getItem("admin") == 0) {
        history.push("/")
    }
   
    useEffect(() => {
        axios.get("http://localhost:4000/admin/").then(res => {
            console.log("admin===",res.data[0])

           setState({
               ...state,
               email:res.data[0].email,
                id:res.data[0]._id,
               password:res.data[0].password
           })
           
        })
    }, [])
    const [state, setState] = useState({
        email: "",
        id:"",
        password: "",
    })
    const[state1,setState1]=useState({
        password1:"",
        password2:"",
        password3:""
    })
    const change = (e) => {
        const { name, value } = e.target;
        setState1({
            ...state1,
            [name]: value,
        })
    }

    const submit = () => {

       
       console.log("state1==",state1)
       console.log("state==",state)
      
            if (state1.password1  && state1.password2  && state1.password3 ) {
               if(state1.password1==state.password)
               {
                        if(state1.password2==state1.password3)
                        {
                            axios.post(`http://localhost:4000/admin/${state.id}`, {
                   
                                email: state.email,
                                password: state1.password2,
                               
                            })
                              history.push("/")
                        }
                        else
                        {
                            alert("Confirm password does not match")
                        }
               }
               else
               {
                   alert("Old password does not match")
               }
               
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
export default ChangeAdmin;