import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useParams } from "react-router-dom";
import SweetAlert from 'sweetalert2-react';

import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    color: 'black',
    textDecoration: 'none'
  }
}));

function UserList() {

    const classes = useStyles();

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [show, setShow] =useState(false);
    const [title, setTitle] =useState('');
    const [text, setText] =useState('');

    const { id } = useParams();

    useEffect(()=>{
        async function loadUsers(){

          const response = await api.get(`users/${id}`);
          
          const {first_name, last_name, email} = response.data.data;

          setFirst_name(first_name);
          setLast_name(last_name);
          setEmail(email);
        }
        loadUsers();
    }, [])

    async function handleSubmit(e){
      e.preventDefault();

      const response = await api.put('api/users/:userId', {first_name, last_name, email})
        .then(function(data){
          console.log('sucesso: ',data);
          setTitle('Uhul!')
          setText('Usuário cadastrado com sucesso!');
          setShow(true);
      }).catch(function(err){
          console.log('erro: ',err);
          setTitle('Ops!')
          setText('Erro ao cadastrar usuário!');
          setShow(true);
      });
    }

    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Typography component="div" style={{ backgroundColor: '#24292e', height: '100vh', width: '100%', padding: "25px" }} >
              <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" style={{backgroundColor: 'white' , height: '95%', padding: '25px'}}>
                <TextField id="first-name" label="Standard" onChange={e => setFirst_name(e.target.value)} value={first_name}/>
                <TextField id="last-name" label="Standard" onChange={e => setLast_name(e.target.value)} value={last_name}/>
                <TextField id="e-mail" label="Standard" onChange={e => setEmail(e.target.value)} value={email}/>
                <Button type="submit" variant="contained" color="primary">
                  Salvar
                </Button>
                <Button variant="contained" color="default">
                  <Link className={classes.button} to="/userList">Usuários</Link>
                </Button>
              </form>
              <SweetAlert
                show={show}
                title={title}
                text={text}
                onConfirm={() => setShow(false)}
              />
            </Typography>
          </Container>
        </React.Fragment>
    );
}

export default UserList;