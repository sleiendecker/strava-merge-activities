import React, {useEffect } from "react";
import axios from "axios";
import queryString from 'query-string';
import {useParams} from "react-router-dom";


import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import {useAuth0 } from "@auth0/auth0-react";


const theme = createTheme();


function Activities() {
  // const [activities, setActivities] = useState([]);

  const {loginWithRedirect} = useAuth0();
  const params = useParams();
  console.log('params:', params);


  useEffect(() => {
    
    async function fetchData() {
      const baseUrl = 'https://www.strava.com';
      const path = 'oauth/token';
      const params = queryString.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENTSECRET,
        refresh_token: process.env.REACT_APP_REFRESHTOKEN,
        grant_type: 'refresh_token',
        scope: [
          'profile:read_all',
          'activity:write,read'
        ]
      });

      const authUrl = `${baseUrl}/${path}?${params}`;
      const newTokenData = await axios.post(authUrl)
      const accessToken = newTokenData.data.access_token;

      const activitiesUrl = `${baseUrl}/api/v3/athlete/activities?per_page=100&access_token=${accessToken}`;
      const activityResponse = await axios.get(activitiesUrl);
      console.log({activityResponse});
    }
    // fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        onClick={() => loginWithRedirect()}
      >
        Hello World
      </Button>
      <p>testing</p>
    </ThemeProvider>
  );

    
}

export default Activities;
