import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingLeft: "240px"
    },

}));

const Dashboard = () => {
    const classes = useStyles();
    const [user, setUser] = useState();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("current_doctor_info");
        if (isAuthenticated) {
            setUser(JSON.parse(localStorage.getItem("current_doctor_info")));
        }
    }, []);

    return (
        <div className={classes.root}>
            {user?.user_email} Bienvenido Dr. {user?.first_name} {user?.last_name}!
        </div>
    )
}

export default Dashboard;