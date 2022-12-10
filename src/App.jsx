import React from "react";
import ReactDOM from "react-dom";
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import { HashRouter } from 'react-router-dom';
import Main from "./Main";
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/store';

const token = localStorage.getItem('token');

const link = new HttpLink({
  uri: "http://arkadium.my.id:4000/graphql",
  headers: { Authorization: token },
  credentials: 'include',
  fetch
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
      </Provider>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
