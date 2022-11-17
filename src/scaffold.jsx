import React from "react";
import { useQuery, gql } from '@apollo/client';

const GET_SCAFFOLD = gql`
  query GetScaffold {
    scaffold {
      data {
        ID
        name
        description
      }
    }
  }
`;

function DisplayScaffold() {
  const { loading, error, data } = useQuery(GET_SCAFFOLD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.scaffold.data.map(({ ID, name, description }) => (
    <div key={ID}>
        <h3>{ID}. {name}</h3>
        <p>{description}</p>
      <p />
    </div>
  ));
}

export default function Scaffold() {
  return (
    <div>
      <DisplayScaffold />
    </div>
  );
}