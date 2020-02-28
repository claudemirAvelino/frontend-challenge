import React from 'react';
//import api from './services/api';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import reactImage from './images/react.png';

import './App.css';
import { Link } from "react-router-dom";


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography component="div" style={{ backgroundColor: '#24292e', height: '100vh', width: '100%' }} >
          <div className="home-image">
            <img src={ reactImage }/>
          </div>
          <div className="home-button">
            <Button variant="contained" color="primary">
              <Link to="/userList">Usuários</Link>
            </Button>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default App;
