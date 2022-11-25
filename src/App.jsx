import React from "react";
import ReactDOM from "react-dom";
import { 
  HttpLink, 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider 
} from '@apollo/client';
import NavBar from "./Navbar";
import { HashRouter } from 'react-router-dom';
import Routing from "./Routing";
import './index.css';

// TODO implement Cookies
const token = localStorage.getItem('token');

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
    <HashRouter>
      <ApolloProvider client={client}>
        <div>
          <NavBar />
          <Routing />
        </div>
      </ApolloProvider>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));