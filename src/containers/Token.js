import React, {useEffect} from "react"
import queryString from "query-string";

import {push} from "connected-react-router";
import {useSelector, useDispatch} from 'react-redux';
import {validateStravaToken} from "../redux/actions/auth";

const Token = () => {
  const location = useSelector((state) => {
    return state.router.location
  });

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
    
    useEffect (() => {
      if (!auth.isAuthenticated) {
        const {code} = queryString.parse(location.search);
        dispatch(validateStravaToken(code));
      } else {
        dispatch(push('/'));
      }
    }, [dispatch, location, auth]);

    return (
      <div>Token received</div>
    );
}

export default Token;
