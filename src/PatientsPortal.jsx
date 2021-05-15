import React, { useState } from 'react'
import { Grid, Paper, Avatar, Button, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import PatientLogo from './img/Patients.jpg'
import { BrowserRouter, Link } from "react-router-dom";
const PatientsPortal = () => {

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
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#3B5FA5' }
    const textStyle = { borderBottom: '5px solid #3B5FA5', paddingBottom: 10 }
    const formStyle = { paddingBottom: 15 }
    const spacing = { marginBottom: 50 }
    const textDecor = { textDecoration: 'none',color:'#3B5FA5'}
    return (
        <Grid align='center'>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
                    <br />
                    <h2 style={textStyle} >Patient's Portal</h2>
                </Grid>
                <FormControl style={formStyle}>
                    <InputLabel htmlFor="grouped-select">Patients</InputLabel>
                    <Select defaultValue="" id="grouped-select">
                        <ListSubheader>Select</ListSubheader>
                       <Link to="/addpatient" style={textDecor}> <MenuItem value={1}><PersonAddIcon />&nbsp;&nbsp;Add New Patient</MenuItem></Link>
                        <Link to="/delete" style={textDecor}><MenuItem value={2}><UpdateIcon />&nbsp;&nbsp;Update Details & Delete</MenuItem></Link>
                       
                    </Select>
                    <FormHelperText style={spacing}>Select Operation to make changes</FormHelperText>
                </FormControl>
                <img src={PatientLogo} alt="Doctors-Image" className="doctorss" />
            </Paper>
        </Grid>
    )
}
export default PatientsPortal;



