import { gql } from '@apollo/client';

// User Queries and Mutations
export const LOGIN = gql`
    mutation Login ($email: EmailAddress!, $password: String! ) {
        login (input: { email: $email, password: $password }) {
            data { 
                id
                first_name
                last_name
                auth_token
                company_id
                role_id
            }
        }
    }
`;

export const REGISTER = gql`
    mutation Register($input: mutationInput_register_input_Input = {}) {
        register(input: $input) {
            email
        }
    }
`;

export const REFETCH_TOKEN = gql`
    mutation RefetchToken($token: String!) {
        refetchToken (input: { token: $token }) {
            data { auth_token }
        }
    }
`;

// Project Queries
export const GET_PROJECT = gql`
  query project { 
    project { 
      Data { 
        ID name description user_id 
      } 
    } 
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query project ($id: String!) {
      project(id: $id) {
          Data {
              ID
              name
              description
              user_id
          }
      }
  }
`;


// Gantt Queries and Mutations
export const ADD_GANTT = gql`
  mutation addGantt(
    $name: String!
    $description: String!
    $user_id: Int!
    $start_time: DateTime!
    $end_time: DateTime!
  ) {
    addGantt(
      input: {
        name: $name
        description: $description
        user_id: $user_id
        start_time: $start_time
        end_time: $end_time
      }
    ) {
      data {
        ID
      }
    }
  }
`;

export const UPDATE_GANTT = gql`
  mutation updateGantt(
    $id: String!
    $name: String!
    $description: String!
    $user_id: Int!
    $start_time: DateTime!
    $end_time: DateTime!
  ) {
    updateGantt(
      id: $id
      input: {
        name: $name
        description: $description
        user_id: $user_id
        start_time: $start_time
        end_time: $end_time
      }
    ) {
      data {
        ID
      }
    }
  }
`;

export const DELETE_GANTT = gql`
  mutation deleteGantt($id: String!) {
    deleteGantt(id: $id)
  }
`;