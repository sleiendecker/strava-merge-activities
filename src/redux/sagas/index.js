import { all } from "redux-saga/effects";

// Import the new async function we created above
import { beginStravaAuthAsync } from "./auth";


export default function* rootSaga() {
  // Add beginStravaAuthAsync to the rootSaga
  yield all([ beginStravaAuthAsync()]);
}
