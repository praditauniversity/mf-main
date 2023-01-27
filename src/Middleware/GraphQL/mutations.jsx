import { gql } from "@apollo/client";

// User Queries and Mutations
export const LOGIN = gql`
  mutation Login($email: EmailAddress!, $password: String!) {
    login(input: { email: $email, password: $password }) {
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
  mutation register(
    $username: String!
    $first_name: String!
    $last_name: String!
    $nik: String!
    $address: String!
    $phone_number: String!
    $gender: String!
    $email: EmailAddress
    $password: String!
    $created_by: String!
    $company_id: String!
  ) {
    register(
      input: {
        username: $username
        first_name: $first_name
        last_name: $last_name
        nik: $nik
        address: $address
        phone_number: $phone_number
        gender: $gender
        email: $email
        password: $password
        created_by: $created_by
        company_id: $company_id
      }
    ) {
      data {
        id
        username
        nik
        phone_number
        address
      }
    }
  }
`;

export const REFETCH_TOKEN = gql`
  mutation RefetchToken($token: String!) {
    refetchToken(input: { token: $token }) {
      data {
        auth_token
      }
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
  query project($id: String!) {
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
    $user_id: String!
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
    $user_id: String!
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
    $weight_percentage: Float!
    $progress_percentage: Float!
    $priority: String!
    $cost_plan: Float!
    $cost_actual: Float!
    $material_cost_plan: Float!
    $material_cost_actual: Float!
    $tool_cost_plan: Float!
    $tool_cost_actual: Float!
    $human_cost_plan: Float!
    $human_cost_actual: Float!
    $activity_type: String!
    $phase_id: Int!
    $unitofmeasurement_id: Int!
  ) {
    addActivity(
      input: {
        parent_id: $parent_id
        gantt_id: $gantt_id
        name: $name
        description: $description
        start_time: $start_time
        end_time: $end_time
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
        unitofmeasurement_id: $unitofmeasurement_id
      }
    ) {
      data {
        ID
        name
        description
        user_id
      }
    }
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation updateActivity(
    $id : String!
    $parent_id: Int!
    $gantt_id: Int!
    $name: String!
    $description: String!
    $start_time: DateTime!
    $end_time: DateTime!
    $weight_percentage: Float!
    $progress_percentage: Float!
    $priority: String!
    $cost_plan: Float!
    $cost_actual: Float!
    $material_cost_plan: Float!
    $material_cost_actual: Float!
    $tool_cost_plan: Float!
    $tool_cost_actual: Float!
    $human_cost_plan: Float!
    $human_cost_actual: Float!
    $activity_type: String!
    $phase_id: Int!
    $unitofmeasurement_id: Int!
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
        unitofmeasurement_id: $unitofmeasurement_id
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
