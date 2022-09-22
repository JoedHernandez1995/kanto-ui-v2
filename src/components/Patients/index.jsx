import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';


const API_HOST = process.env.NODE_ENV === 'production' ? "https://eclinichn-server.herokuapp.com/api/v1/"  : "http://localhost:8080/api/v1/";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#3f51b5",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    root: {
        display: 'flex',
        marginTop: "40px",
        paddingLeft: "240px"
    },
});

const doctorInfo = () => {
    return JSON.parse(localStorage.getItem("current_doctor_info"));
}

const Patients = () => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        async function fetchPatients(){
            const response = await axios.get(`${API_HOST}patients/doctor/${doctorInfo().doctor_id}`);
            setPatients(response.data);
        }
        fetchPatients();
    }, [])
    const classes = useStyles();


    return (
        <div className={classes.root}>
            {
                patients.length ? <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Identidad</StyledTableCell>
                            <StyledTableCell>Nombre del Paciente</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Teléfono</StyledTableCell>
                            <StyledTableCell>Fecha de Nacimiento</StyledTableCell>
                            <StyledTableCell align="center">Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients?.map((patient) => (
                            <StyledTableRow key={patient.patient_id}>
                                <StyledTableCell component="th" scope="row">
                                    {patient.patient_id}
                                </StyledTableCell>
                                <StyledTableCell>{patient.firstName} {patient.lastName}</StyledTableCell>
                                <StyledTableCell>{patient.email}</StyledTableCell>
                                <StyledTableCell>{patient.phone}</StyledTableCell>
                                <StyledTableCell>{patient.dob}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton aria-label="Ver">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton aria-label="Modificar">
                                        <CreateIcon />
                                    </IconButton>
                                    <IconButton aria-label="Eliminar">
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <></>
            }
            
        </div>
    )
}

export default Patients;