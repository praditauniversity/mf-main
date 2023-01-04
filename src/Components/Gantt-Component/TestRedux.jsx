// can you show using redux with useState
// Certainly! Here's an example of using Redux with a useState hook in a React component, including the Redux store and reducer:

import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { useState } from 'react';

// Initial state
const initialState = {
  globalState: 'initial global state value',
};

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_GLOBAL_STATE':
      return {
        ...state,
        globalState: action.payload,
      };
    default:
      return state;
  }
}

// Store
export const store = createStore(reducer);

// MyComponent
function MyComponent(props) {
  const [localState, setLocalState] = useState('initial value');

  function handleClick() {
    setLocalState('new value');
    props.dispatch({ type: 'SET_GLOBAL_STATE', payload: 'new global state value' });
  }

  return (
    <div>
      <p>Local state: {localState}</p>
      <p>Global state: {props.globalState}</p>
      <button onClick={handleClick}>Update state</button>
    </div>
  );
}

// Map Redux state to component props
const mapStateToProps = state => {
  return {
    globalState: state.globalState,
  };
};

// Connected component
export const ConnectedMyComponent = connect(mapStateToProps)(MyComponent);

// // Root component
// function TestRedux() {
//   return (
//     <Provider store={store}>
//       <ConnectedMyComponent />
//     </Provider>
//   );
// }

// export default TestRedux;

// This code defines a Redux store with a single reducer, and a React component that has both local state managed using the useState hook, and global state managed using Redux. The component uses the dispatch function provided by the connect function to dispatch actions to the store to update the global state. The Provider component is used to make the store available to the rest of the app.
