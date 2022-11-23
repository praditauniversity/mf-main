import React from "react";
import ReactDOM from "react-dom";
import { HttpLink, ApolloClient, InMemoryCache, ApolloLink, ApolloProvider, createHttpLink } from '@apollo/client';
import Login from "./Login";
import Project from "./Project";
import Activity from "./Activity";

// TODO implement Cookies
const token = localStorage.getItem("token");
const link = new HttpLink({
    uri: "http://localhost:4000/graphql", 
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
  <ApolloProvider client={client}>
      <Login />
      <Project />
      <Activity />
  </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));