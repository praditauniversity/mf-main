import React from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedMyComponent } from './TestRedux';
import {store} from './TestRedux';

// Root component
function ImplementRedux(props) {
    return (
      <Provider store={store}>
        <p>Global A: {props.globalState}</p>
        <ConnectedMyComponent />
      </Provider>
    );
  }
  
  export default ImplementRedux;

  // Map Redux state to component props
const mapStateToProps = state => {
    return {
      globalState: state.globalState,
    };
  };
  
  // Connected component
  const ConnectTest = connect(mapStateToProps)(ImplementRedux);