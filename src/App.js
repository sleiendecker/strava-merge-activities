import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {Auth0Provider} from "@auth0/auth0-react";

import Activities from './Activities.js';

import './App.css';

console.log(process.env);

function App() {

  return (
    <Auth0Provider
      domain="http://localhost:3000"
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <AppBar position="relative">
        <CssBaseline/>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Strava Merger
          </Typography>
        </Toolbar>
      </AppBar>
      <Activities/>
    </Auth0Provider>
  );
}

export default App;
