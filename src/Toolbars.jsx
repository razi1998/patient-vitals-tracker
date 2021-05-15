import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BrandLogo from './img/BrandLogo.png'

const styles = {
  root: {
    flexGrow: 1,

  },
  typography: {
    flexGrow: 1,
        align: "center"
      }

};

function SimpleAppBar(props) {
  const logout=()=>{
    localStorage.setItem("admin",0)
    window.location.href="/"
  }
  const { classes } = props;
  const toolStyle = { justifyContent: 'center' }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={BrandLogo} alt="" className="brandlogo" />
            
            <Typography variant="h6" style={{paddingTop : '10px'}} color="inherit" className={classes.typography}>
           <center><strong>Welcome to INT Foundation</strong></center>
           <button class="logout"  onClick={logout}>Logout</button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
        classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);