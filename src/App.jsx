import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ProjectCharter from "mfcomponent/ProjectCharter";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
  <ApolloProvider client={client}>
      <p>HOST</p>
      <ProjectCharter />
  </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));