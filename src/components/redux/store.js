import {  applyMiddleware, legacy_createStore } from 'redux';
import { thunk } from "redux-thunk";
import { postsReducer } from './reducer';

const store = legacy_createStore(postsReducer, applyMiddleware(thunk));

export default store;