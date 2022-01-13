import {takeLeading, call, put} from "redux-saga/effects";
import {STRAVA_AUTH_START, STRAVA_AUTH_TOKEN_VALIDATED} from "../constants/auth";
import {push} from "connected-react-router";

import {updateAuthTokens} from "../actions/auth";
import {tokenClient} from '../../api';

const clientID = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

function handOffToStravaAuth() {
  // Get the current address of the app running eg localhost or mycoolapp.io
  const { origin } = window;
  // push the Strava authorise url onto the browser window with our PUBLIC clientID and the return url (origin)
  // Note the redirect_uri=${origin}/token - this is the token page we setup earlier.
  const redirectUrl = `https://www.strava.com/oauth/authorize?client_id=${clientID}&redirect_uri=${origin}/token&response_type=code&scope=read_all,profile:read_all,activity:read_all`
  window.location.assign(redirectUrl);
}

function* beginStravaAuthentication() {
  // A simple generator function
  // Just yields one other function - handOffToStravaAuth
  yield call(handOffToStravaAuth);
}

export function* beginStravaAuthAsync() {
  // This will listen for the first STRAVA_AUTH_START and then call beginStravaAuthentication
  yield takeLeading(STRAVA_AUTH_START, beginStravaAuthentication);
}

const apiValidateToken = (code) => {
  return tokenClient({
    url: "/token",
    method: "post",
    param: {
      client_id: clientID,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code"
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(err => {
    Promise.reject(err);
  });
}

export function* validateStravaToken({payload: code}) {
  try {
    // dispatch api call to validate the tokens, returns data ovject with values needed
    const data = yield call(apiValidateToken, code);

    // push action to type STRAVA_AUTH_TOKEN_UPDATE with the data
    yield put(updateAuthTokens(data)); 

    // push browser to root when done
    yield put(push("/"));
    
  } catch (error) {
    throw new Error(error);
  }

  // TODO: dispatch some loading action

}

export function* validateStravaTokenAsync() {
  // listen to STRAVA_AUTH_TOKEN_VALIDATED and then call validateStravaToken
  yield takeLeading(STRAVA_AUTH_TOKEN_VALIDATED, validateStravaToken);
}
