import React from "react";
import { useQuery, gql } from '@apollo/client';

const GET_PROJECTCHARTER = gql`
  query GetProjectCharter {
    projectcharter {
      data {
        ID
        name
        description
      }
    }
  }
`;

function DisplayProjectCharter() {
  const { loading, error, data } = useQuery(GET_PROJECTCHARTER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.projectcharter.data.map(({ ID, name, description }) => (
    <div key={ID}>
        <h3>{ID}. {name}</h3>
        <p>{description}</p>
      <p />
    </div>
  ));
}

export default function ProjectCharter() {
  return (
    <div>
      <DisplayProjectCharter />
    </div>
  );
}