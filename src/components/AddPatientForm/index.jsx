import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import Swal from 'sweetalert2'

import axios from 'axios';

const API_HOST = process.env.NODE_ENV === 'production' ? "https://eclinichn-server.herokuapp.com/api/v1/"  : "http://localhost:8080/api/v1/";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: "40px",
        paddingLeft: "240px"
    },

}));

const AddPatientForm = () => {
    const classes = useStyles();

    const genders = ["Masculino", "Femenino"];
    const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];


    const [patient_id, setPatientId] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [bloodgroup, setBloodGroup] = useState('');
    const [gender, setGender] = useState('');
    const [religion, setReligion] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [past_medical_records, setPastMedicalRecords] = useState('');
    const [main_symptom, setMainSymptom] = useState('');
    const [hea, setHea] = useState('');
    const [emergency_contact, setEmergencyContact] = useState('');
    const [emergency_contact_phone, setEmergencyContactPhone] = useState('');
    const [workplace, setWorkplace] = useState('');


    const doctorInfo = () => {
        return JSON.parse(localStorage.getItem("current_doctor_info"));
    }

    const addNewPatient = async () => {

        //Grab Doctor Info

        const newPatient = {
            patient_id,
            patient_doctor_id: doctorInfo().doctor_id,
            firstName,
            lastName,
            dob,
            bloodgroup,
            gender,
            religion,
            email,
            phone,
            address,
            city,
            country,
            past_medical_records,
            main_symptom,
            hea,
            emergency_contact,
            emergency_contact_phone,
            workplace
        }
        const response = await axios.post(`${API_HOST}patients/`, newPatient);

        if(response.status === 200){
            Swal.fire({
                title: "Paciente Agregado",
                icon: 'success',
                confirmButtonText: "OK"
            });
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={10}>
                    <Paper elevation={3} style={{ textAlign: "center", paddingLeft: "20px", paddingRight: "20px" }}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Nuevo Paciente</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Numero de Identidad"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    value={patient_id}
                                    onChange={(event) => setPatientId(event.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Nombre Completo"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Apellidos"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="date"
                                    label="Fecha de Nacimiento"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    variant='outlined'
                                    margin='dense'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={dob}
                                    onChange={(event) => setDOB(event.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel id="demo-simple-select-label-3">Tipo de Sangre</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-3"
                                    id="demo-simple-select"
                                    value={bloodgroup}
                                    onChange={(event) => setBloodGroup(event.target.value)}
                                    fullWidth
                                >
                                    {bloodTypes.map((bloodType) => (<MenuItem value={bloodType}>{bloodType}</MenuItem>))}
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel id="demo-simple-select-label-2">Género</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-2"
                                    id="demo-simple-select-2"
                                    value={gender}
                                    onChange={(event) => setGender(event.target.value)}
                                    fullWidth
                                >
                                    {genders.map((gender) => (<MenuItem value={gender}>{gender}</MenuItem>))}
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Email"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Teléfono"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Religión"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={religion}
                                    onChange={(event) => setReligion(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Dirección"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Ciudad"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="País"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={country}
                                    onChange={(event) => setCountry(event.target.value)}
                                    
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Antecedentes Médicos"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    value={past_medical_records}
                                    onChange={(event) => setPastMedicalRecords(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Sintoma Principal"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={main_symptom}
                                    onChange={(event) => setMainSymptom(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="HEA"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    value={hea}
                                    onChange={(event) => setHea(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Contacto de Emergencia"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={emergency_contact}
                                    onChange={(event) => setEmergencyContact(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Teléfono de Contacto de Emergencia"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={emergency_contact_phone}
                                    onChange={(event) => setEmergencyContactPhone(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Lugar de Trabajo"
                                    id="outlined-margin-dense"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    value={workplace}
                                    onChange={(event) => setWorkplace(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={8}>

                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="primary" onClick={()=>{addNewPatient()}}>
                                    Agregar Paciente
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>


        </div>
    )
}

export default AddPatientForm;