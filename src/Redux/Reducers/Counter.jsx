// reducers/counter.js
import { combineReducers } from 'redux';

const initialState = {
  counter: 0
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return {
        ...state,
        counter: state.counter + 1
      };
    case 'DECREMENT_COUNTER':
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
};

export default combineReducers({
  counter: counterReducer
});
