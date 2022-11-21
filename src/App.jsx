import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import User from "./user";

const client = new ApolloClient({
  uri: 'http://arkadium.my.id:4000/graphql',
  cache: new InMemoryCache(),
  opts: {
    credentials: 'same-origin',
  },
});

export default function App() {
  return (
  <ApolloProvider client={client}>
      <User />
  </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));