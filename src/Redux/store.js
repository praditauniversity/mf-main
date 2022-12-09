import { createStore, applyMiddleware } from 'redux';

function reducer(state = {}, action) {
  switch (action.type) {
    case 'SOME_ACTION':
      return { ...state, some: action.payload };
    default:
      return state;
  }
}

const initialState = {};

const store = createStore(reducer, initialState);

export default store;