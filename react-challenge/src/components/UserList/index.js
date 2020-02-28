import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

import api from '../../services/api';

import './styles.css';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    link: {
        color: 'black !important',
        textDecoration: 'none'
      },
  }));

function UserList() {

    const classes = useStyles();

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        async function loadUsers(){
          const response = await api.get('users');
          setUsers(response.data.data);
        }
        loadUsers();
    }, [])

    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Typography component="div" style={{ backgroundColor: '#24292e', height: '100vh', width: '100%', padding: "25px" }} >
                <div className={classes.root}>
                    <Grid container spacing={2}>
                        {users.map(user =>( 
                            <Grid item xs={3} key={user.id}>
                                <Paper className={classes.paper} className="dev-item">
                                    <Link to={`/EditUser/${user.id}`}>
                                        <header>
                                            <img src={user.avatar} alt={user.first_name}></img>
                                            <div className="user-info">
                                                <strong>{user.first_name + " " + user.last_name}</strong>
                                            </div>
                                        </header>
                                        <p>{user.email}</p>
                                    </Link>
                                </Paper>
                            </Grid>
                        ))} 
                    </Grid>
                </div>
                <div className="home-button">
                    <Button variant="contained" color="default">
                        <Link className={classes.link} to="/">HOME</Link>
                    </Button>
                </div>
            </Typography>
          </Container>
        </React.Fragment>
    );
}

export default UserList;