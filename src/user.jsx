import React, {useState} from "react";
import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`
mutation Login ($email: EmailAddress!, $password: String! ){
	login (input: {
    email: $email,
    password: $password
  }) {
        data {
            auth_token
        }
    }
}
`;

export default function User() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          login({ variables: { email, password } });
          localStorage.setItem('token', data.login.data.auth_token);
        }}
      >
        <label>
          Email:
        </label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label>
          Password:
        </label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {/* {data && data.login.data.auth_token} */}
    </div>
  );
}
// save auth_token as header
// https://www.apollographql.com/docs/react/networking/authentication/#header
// save auth_token as cookie
// https://www.apollographql.com/docs/react/networking/authentication/#cookie
// save auth_token to local storage
// https://www.apollographql.com/docs/react/networking/authentication/#local-storage