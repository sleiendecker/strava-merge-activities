import { createBrowserHistory } from "history";
import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import createRootReducer from "./redux/reducers";
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const configureStore = (initialState = {}) => {
  
  const middleware = [routerMiddleware(history), sagaMiddleware];
  const rootReducer = createRootReducer(history);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore();