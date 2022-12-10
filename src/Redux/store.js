// store.js

import { createStore } from 'redux';
import counterReducer from './Reducers/Counter';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  counter: counterReducer
});

const store = createStore(reducer);

export default store;
