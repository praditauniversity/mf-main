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
  const [login, { data }] = useMutation(LOGIN);
  const [email, setEmail] = useState('Arthur@mail.com');
  const [password, setPassword] = useState('Arthurlouis');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const response = await login({ variables: { email, password } });
          setToken(response.data.login.data.auth_token);
          setError('');
      } catch (err) {
          setError(err.message);
      }
      setLoading(false);
  }

  const setTokenAsHeader = () => {
      localStorage.setItem('token', token);
      //show token
      console.log(token);
  }

  const removeToken = () => {
      localStorage.removeItem('token');
  }

  const fetchProject = () => {
      fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `${token}`
          },
          body: JSON.stringify({
              query: `
                query project {
                    project {
                        Data {
                            ID
                            name
                            description
                            user_id
                        }
                    }
                }
              `
          })
      })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));
  }


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} <br />
      <button onClick={setTokenAsHeader}>Set token as header</button> <br />
      <button onClick={removeToken}>Remove token</button> <br />
      fetch project with token as header <br />
      <button onClick={fetchProject}>Fetch project</button> <br />
      {/* {token && <p>{token}</p>} */}
    </div>
  );
}

// save auth_token as header
// https://www.apollographql.com/docs/react/networking/authentication/#header
// save auth_token as cookie
// https://www.apollographql.com/docs/react/networking/authentication/#cookie
// save auth_token to local storage
// https://www.apollographql.com/docs/react/networking/authentication/#local-storage
// set auth_token as default header
// https://www.apollographql.com/docs/react/networking/authentication/#default-header