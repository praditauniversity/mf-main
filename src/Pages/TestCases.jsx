// components/Counter.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCounter, decrementCounter } from '../Redux/Actions/Counter'

const Cases = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);

  // console.log(counter)

  return (
    <div>
      <h1>Counter</h1>
      <button onClick={() => dispatch(incrementCounter())}>Increment</button>
      <button onClick={() => dispatch(decrementCounter())}>Decrement</button>
      {JSON.stringify(counter.counter.counter)}
    </div>
  );
};

export default Cases;
