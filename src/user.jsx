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

const GET_POST = gql`
query Scaffold {
  scaffold {
    data {
      ID
      name
      description
    }
  }
}
`;

export default function User() {
  let email, password;
  // const [login, { data, loading, error }] = useMutation(LOGIN);

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    refetchQueries: [
      {query: GET_POST},
      'GetComments'
    ],
  });


  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          login({
            variables: {
              email: email.value,
              password: password.value
            }
          });
          email.value = '';
          password.value = '';
        }}
      >
        <p> email </p>
        <input ref={node => { email = node; }} /> <br />
        <p> password </p>
        <input ref={node => { password = node; }} /> <br />
        <br />
        <button type="submit">Submit</button>
        result: {result}
      </form>
    </div>
  );
}