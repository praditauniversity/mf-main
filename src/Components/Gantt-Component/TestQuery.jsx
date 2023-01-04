// // GANTT BY PROJECT ID
// import React, { Component, useEffect, useState } from "react";
// import { useQuery, gql, useMutation } from "@apollo/client";
// import { GET_GANTT_PROJECT_ID } from "../GraphQL/Queries";
// import {
//   ADD_GANTT,
//   UPDATE_GANTT,
//   DELETE_GANTT,
// } from "../../Middleware/GraphQL/mutations";

// export default function TestQuery() {
//   const [projectID, setProjectID] = React.useState(localStorage.getItem('projectID') ? localStorage.getItem('projectID') : "1");

//   const { data, loading, error } = useQuery(GET_GANTT_PROJECT_ID, {
//     variables: { project_id: projectID }
//   });
//   const [ganttdata, setGantt] = useState([]);

//   useEffect(() => {
//     if (data) {
//       console.log("Data Ready TEST QUERY");
//       setGantt(data.ganttGetProjectID.data);
//       console.log(data.ganttGetProjectID.data);
//     } else {
//       console.log("No data TEST QUERY");
//     }
//     console.log("USE EFFECT TEST QUERY");
//   }, [data]);
//   return <div>testquery hehe
//     {ganttdata.map((gantt) => {
//       return (
//         <div>
//           <p>{gantt.name}</p>
//           <p>{gantt.description}</p>
//           <p>{gantt.user_id}</p>
//           <p>{gantt.start_time}</p>
//           <p>{gantt.end_time}</p>
//         </div>
//       );
//     })
//   }
//   </div>;
// }

// // activity BY gantt ID
// import React, { Component, useEffect, useState } from "react";
// import { useQuery, gql, useMutation } from "@apollo/client";
// import { GET_ACTIVITY_GANTT_ID } from "../GraphQL/Queries";
// import {
//   ADD_GANTT,
//   UPDATE_GANTT,
//   DELETE_GANTT,
// } from "../../Middleware/GraphQL/mutations";

// export default function TestQuery() {
//   const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

//   const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
//     variables: { gantt_id: ganttID }
//   });
//   const [activityData, setActivity] = useState([]);

//   useEffect(() => {
//     if (data) {
//       console.log("Data Ready TEST QUERY");
//       setActivity(data.activityGetGanttID.data);
//       console.log(data.activityGetGanttID.data);
//     } else {
//       console.log("No data TEST QUERY");
//     }
//     console.log("USE EFFECT TEST QUERY");
//   }, [data]);
//   return <div>testquery hehe
//     {activityData.map((activity) => {
//       return (
//         <div>
//           <p>{activity.name}</p>
//           <p>{activity.description}</p>
//           <p>{activity.user_id}</p>
//           <p>{activity.start_time}</p>
//           <p>{activity.end_time}</p>
//         </div>
//       );
//     })
//   }
//   </div>;
// }

// Redux usestate
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
const store = createStore(reducer);

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
const ConnectedMyComponent = connect(mapStateToProps)(MyComponent);

// Root component
function TestQuery() {
  return (
    <Provider store={store}>
      <ConnectedMyComponent />
    </Provider>
  );
}

export default TestQuery;