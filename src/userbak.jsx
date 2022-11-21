import React from "react";
import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login {
    login (input: {
      email: "Arthur@mail.com",
      password: "Arthurlouis"
    }) {
          data {
              auth_token
          }
      }
  }
`;

function LoginPage () {
  const [login, { error, reset }] = useMutation(LOGIN);

  return (
    <>
      <form>
        Login
        <input className="email"/>
        <input className="password"/>
        <button onClick={login}>Login</button>
      </form>
      {
        error &&
        <LoginFailedMessageWindow
          message={error.message}
          onDismiss={() => reset()}
        />
      }
    </>
  );
}

export default function User() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}