import { STRAVA_AUTH_TOKEN_UPDATE, STRAVA_AUTH_TOKEN_VALIDATED } from '../constants/auth';

const initialState = {
  isAuthenticated: false
};

export default function auth(state = initialState, action) {
  if (!action) return state;
  
  switch (action.type) {

    case STRAVA_AUTH_TOKEN_VALIDATED:
      console.log('validated action:', action);
      localStorage.setItem('accessToken', action.payload.access_token);
      localStorage.setItem('expiresAt', action.payload.expires_at);
      localStorage.setItem('refreshToken', action.payload.refresh_token);
      return {...state, isAuthenticated: true};
    case STRAVA_AUTH_TOKEN_UPDATE:
      console.log('STRAVA_AUTH_TOKEN_UPDATE')
      // save tokens to local storage
      localStorage.setItem('accessToken', action.payload.access_token);
      localStorage.setItem('expiresAt', action.payload.expires_at);
      localStorage.setItem('refreshToken', action.payload.refresh_token);

      return {...state, isAuthenticated: true};
    default:
      return state;
  }

}