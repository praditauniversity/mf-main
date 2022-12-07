import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login ($email: EmailAddress!, $password: String! ) {
        login (input: { email: $email, password: $password }) {
            data { auth_token }
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