import React from 'react';
import {Route, Switch} from "react-router";

// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';

// import Activities from './Activities.js';
import Token from './containers/Token'
import HomePage from './containers/HomePage'

import './App.css';

function App() {

  return (
      <div>
        <Switch>
          <Route path="/token" exact component={Token} />
          <Route path="/" exact component={HomePage} />

        </Switch>
      </div>
  );
}

export default App;
