import React from "react";
import { useMutation, gql } from '@apollo/client';

const ADD_SCAFFOLD = gql`
mutation AddScaffold (
    $name: String!
    $description: String!
) {
    addScaffold(
        input: {
            name: $name,
            description: $description,
            user_id: 1
        }
    ) {
        data {
            name
            description
            user_id
        }
    }
}
`;

export default function addScaffold() {
  let name, description;
  const [addTodo, { data, loading, error }] = useMutation(ADD_SCAFFOLD);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ 
            variables: { 
              name: name.value,
              description: description.value
            } 
          });
          name.value = 'nameofthe';
          description.value = 'descriptor';
        }}
      >
        <input ref={node => { name = node; }} /> <br />
        <input ref={node => { description = node; }} /> <br />
        <br />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}