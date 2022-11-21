import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import User from "./user";

const client = new ApolloClient({
  uri: 'http://arkadium.my.id:4000/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
  <ApolloProvider client={client}>
      <p>HOST</p>
      <User />
  </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));