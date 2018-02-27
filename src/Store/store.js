import thunk from 'redux-thunk';
import logger from "redux-logger";
import {createStore, combineReducers, applyMiddleware } from "redux";
import clientInformationsReducer from './client/reducer.js'


let reducers = combineReducers(
  {
    clientInformationsReducer:clientInformationsReducer
  }
);
let middleware = [thunk, logger]
let store = createStore(reducers, applyMiddleware(...middleware));


export default store;
