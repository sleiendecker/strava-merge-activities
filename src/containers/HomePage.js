import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {beginStravaAuthentication} from '../redux/actions/auth';

const HomePage = () => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Home Page</h1>

      {auth.isAuthenticated ? (
        <p>logged in</p>
      ): (
        <button
          type="button"
          onClick={() => {
            dispatch(beginStravaAuthentication())
          }}>
            Authenticate via strava
          </button>
      )}
    </div>
  );
}

export default HomePage;