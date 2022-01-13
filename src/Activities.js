import React, {useEffect } from "react";
import {PropTypes} from "prop-types";
import axios from "axios";
import queryString from 'query-string';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();


function Activities() {

  const baseUrl = 'https://www.strava.com';

  useEffect(() => {
    
    async function fetchData() {
      const path = 'oauth/token';
      const params = queryString.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        refresh_token: process.env.REACT_APP_REFRESHTOKEN,
        grant_type: 'refresh_token',
        scope: [
          'profile:read_all',
          'activity:write,read'
        ]
      });

      // https://www.strava.com/oauth/authorize?client_id=76362&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read_all,profile:read_all,activity:read_all

      
      // const redirectUri = queryString.stringify({
      //   exchange_token: true,
      //   approve_prompt: 'force',
      //   scope

      // });
      
      

      const authUrl = `${baseUrl}/${path}?${params}`;
      const newTokenData = await axios.post(authUrl)
      const accessToken = newTokenData.data.access_token;

      const activitiesUrl = `${baseUrl}/api/v3/athlete/activities?per_page=100&access_token=${accessToken}`;
      const activityResponse = await axios.get(activitiesUrl);

    }
    // fetchData();
  }, []);
  // https://www.strava.com/oauth/authorize?client_id=76362&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read_all,profile:read_all,activity:read_all
  const redirectUri = 'http://localhost:3000/exchange_token&approval_prompt=force&scope=read_all,profile:read_all,activity:read_all'

  const redirectParams = queryString.stringify({
    client_id: process.env.REACT_APP_CLIENT_ID,
    response_type: 'code'
  });
  const redirectPath = 'oauth/authorize'
  // const redirectUrl = `${baseUrl}/${redirectPath}?${redirectParams}&redirect_uri=${redirectUri}`;
  const redirectUrl = 'https://www.strava.com/oauth/authorize?client_id=76362&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read_all,profile:read_all,activity:read_all'
  

  return (
    <ThemeProvider theme={theme}>
      <p>

          Fetch Activities
      </p>
        

    </ThemeProvider>
  );

    
}

export default Activities;
