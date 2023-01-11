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
                username
                phone_number
                gender
                email
                CreatedAt
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
                ID 
                name 
                description 
                user_id 
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
        $version: Int!
        $project_id: Int!
        $start_time: DateTime!
        $end_time: DateTime!
    ) {
        addGantt(
            input: {
                name: $name
                description: $description
                user_id: $user_id
                version: $version
                project_id: $project_id
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
        $version: Int!
        $project_id: Int!
        $start_time: DateTime!
        $end_time: DateTime!
        ) {
            updateGantt(
                id: $id
                input: {
                    name: $name
                    description: $description
                    user_id: $user_id
                    version: $version
                    project_id: $project_id
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

export const ADD_ACTIVITY = gql`
    mutation addActivity(
        $parent_id: Int!
        $gantt_id: Int!
        $name: String!
        $description: String!
        $start_time: DateTime!
        $end_time: DateTime!
        $user_id: String!
        $weight_percentage: Int!
        $progress_percentage: Int!
        $priority: String!
        $cost_plan: Int!
        $cost_actual: Int!
        $material_cost_plan: Int!
        $material_cost_actual: Int!
        $tool_cost_plan: Int!
        $tool_cost_actual: Int!
        $human_cost_plan: Int!
        $human_cost_actual: Int!
        $activity_type: String!
        $phase_id: Int!
    ) {
        addActivity(
            input: {
                parent_id: $parent_id
                gantt_id: $gantt_id
                name: $name
                description: $description
                start_time: $start_time
                end_time: $end_time
                user_id: $user_id
                weight_percentage: $weight_percentage
                progress_percentage: $progress_percentage
                priority: $priority
                cost_plan: $cost_plan
                cost_actual: $cost_actual
                material_cost_plan: $material_cost_plan
                material_cost_actual: $material_cost_actual
                tool_cost_plan: $tool_cost_plan
                tool_cost_actual: $tool_cost_actual
                human_cost_plan: $human_cost_plan
                human_cost_actual: $human_cost_actual
                activity_type: $activity_type
                phase_id: $phase_id
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


export const UPDATE_ACTIVITY = gql`
    mutation updateActivity(
        $id: String!
        $parent_id: Int!
        $gantt_id: Int!
        $name: String!
        $description: String!
        $start_time: DateTime!
        $end_time: DateTime!
        $user_id: String!
        $weight_percentage: Int!
        $progress_percentage: Int!
        $priority: String!
        $cost_plan: Int!
        $cost_actual: Int!
        $material_cost_plan: Int!
        $material_cost_actual: Int!
        $tool_cost_plan: Int!
        $tool_cost_actual: Int!
        $human_cost_plan: Int!
        $human_cost_actual: Int!
        $activity_type: String!
        $phase_id: Int!
    ) {
        updateActivity(
            id: $id
            input: {
                parent_id: $parent_id
                gantt_id: $gantt_id
                name: $name
                description: $description
                start_time: $start_time
                end_time: $end_time
                user_id: $user_id
                weight_percentage: $weight_percentage
                progress_percentage: $progress_percentage
                priority: $priority
                cost_plan: $cost_plan
                cost_actual: $cost_actual
                material_cost_plan: $material_cost_plan
                material_cost_actual: $material_cost_actual
                tool_cost_plan: $tool_cost_plan
                tool_cost_actual: $tool_cost_actual
                human_cost_plan: $human_cost_plan
                human_cost_actual: $human_cost_actual
                activity_type: $activity_type
                phase_id: $phase_id
            }
        ) {
            data {
                ID
                name
                description
            }
        }
    }
`;

export const DELETE_ACTIVITY = gql`
    mutation deleteActivity($id: String!) {
        deleteActivity(id: $id)
    }
`;