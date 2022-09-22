import React, { useEffect, useState } from 'react'
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddPatientForm from "./components/AddPatientForm";
import Patients from "./components/Patients";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  }
}));


const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("current_doctor_info");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("current_doctor_info");

  const logout = () => {
    localStorage.removeItem("current_doctor_info");
    navigate("/login");
  }

  return (
    <div className="App">
      {
        isAuthenticated ?
          <div className={classes.root}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left"
            >
              <List style={{color: "white"}}>
                <ListItem button key={"Dashboard"} component={Link} to="/">
                  <ListItemIcon><DashboardIcon style={{color: "white"}}></DashboardIcon></ListItemIcon>
                  <ListItemText primary={"Panel Administrativo"} />
                </ListItem>
                <ListItem button key={"Add Patient"} component={Link} to="/patients/add">
                  <ListItemIcon><PersonAddIcon style={{color: "white"}}></PersonAddIcon></ListItemIcon>
                  <ListItemText primary={"Agregar Paciente"} />
                </ListItem>
                <ListItem button key={"Patients"} component={Link} to="/patients">
                  <ListItemIcon><PersonIcon style={{color: "white"}}></PersonIcon></ListItemIcon>
                  <ListItemText primary={"Listado de Pacientes"} />
                </ListItem>
                
              </List>
              <List style={{ position: "absolute", bottom: "0", color: "white", width: "100%" }}>
                <ListItem button key={"Logout"} className={classes.bottomContainer} onClick={() => {logout()}}>
                  <ListItemText style={{textAlign: "center"}}>Cerrar Sesion</ListItemText>
                </ListItem>
              </List>
            </Drawer>
            
          </div>
          :
          <></>
      }


      <Routes>
        <Route
          path="/"
          exact
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/add"
          exact
          element={
            <PrivateRoute>
              <AddPatientForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          exact
          element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          }
        />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </div>
  )
}

export default App