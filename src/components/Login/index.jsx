import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import axios from "axios";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import "../Login/Login.css";

const API_HOST = process.env.NODE_ENV === 'production' ? "https://eclinichn-server.herokuapp.com/api/v1/"  : "http://localhost:8080/api/v1/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("current_doctor_info");
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { user_email, user_password };
    setError("");
    if(user_email !== "" && user_password !== ""){
      try {
        const response = await axios.post(`${API_HOST}users/auth/login`, user);
        //Check if user is doctor
        if(response.data.user_type === 2) {
          const doctor_info = await axios.get(`${API_HOST}doctors/user/${response.data.user_id}`);
          localStorage.setItem('current_doctor_info', JSON.stringify(doctor_info.data[0]))
          navigate('/');
        }
      } catch (e) {
        console.log(e);
        setError(e.response.data.message || "Ha ocurrido un error al ingresar.");
        setUserEmail("");
        setUserPassword("");
      }
    }else{
      if(user_email === ""){
        setError("Porfavor ingrese su correo.");
      }else if (user_password === ""){
        setError("Porfavor ingrese su contraseña.");
      }else{
        setError("Porfavor ingrese los datos del usuario");
      }
    }
    
    
  };

  // if there's no user, show the login form
  return (

    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>

        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    eClinic
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" label="Email" variant="outlined" value={user_email} onChange={({ target }) => setUserEmail(target.value)} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" label="Contraseña" variant="outlined" type="password" value={user_password} onChange={({ target }) => setUserPassword(target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Ingresar
                  </Button>
                </Grid>
                {error ? <Grid item xs={12}>
                  <Typography variant="h6" style={{color:"#C70039"}}>{error}</Typography>
                </Grid> : <></>}
              </Grid>

            </form>
          </Paper>
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>


    </div>



  );
}

export default Login;