import { gql } from "@apollo/client";


// eslint-disable-next-line import/prefer-default-export
export const GET_GANTT_DATA_LAMA = gql`
  query {
    gantt {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        project_id
        name
        description
        start_time
        end_time
        user_id
        updated_by
        deleted_by
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_GANTT_DATA = gql`
  query {
    activity {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        parent_id
        gantt_id
        name
        description
        start_time
        end_time
        user_id
        updated_by
        deleted_by
        cost_actual
        cost_plan
        weight_percentage
        progress_percentage
        priority
        material_cost_plan
        material_cost_actual
        tool_cost_plan
        tool_cost_actual
        human_cost_plan
        human_cost_actual
        type_id
      }
    }
    gantt {
      data {
        ID
        project_id
        user_id
        name
        description
        end_time
        start_time
      }
    }
    project {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        stakeholder_ammount
        name
        start_project
        end_project
        work_area
        office_location
        cost_plan
        cost_actual
        company
        role_id
        type_id
        progress_percentage
        description
        project_duration
        UpdatedBy
        DeletedBy
        status
        project_objectives
        considered_success_when
        potential_risk
        currency_symbol
        currency_code
        currency_name
        phase_id
        budget_health
        budget
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_PROJECT_DATA = gql`
  query {
    project {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        stakeholder_ammount
        name
        start_project
        end_project
        work_area
        office_location
        cost_plan
        cost_actual
        company
        role_id
        type_id
        progress_percentage
        description
        project_duration
        UpdatedBy
        DeletedBy
        status
        project_objectives
        considered_success_when
        potential_risk
        currency_symbol
        currency_code
        currency_name
        phase_id
        Phase {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          name
          color
          order
          user_id
          updated_by
          deleted_by
        }
        budget_health
        budget
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_SCAFFOLD_DATA = gql`
  query {
    getAllScaffold {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        name
        description
        user_id
        updated_by
        deleted_by
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_PHASE_DATA = gql`
  query {
    projectPhase {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        name
        color
        order
        user_id
        updated_by
        deleted_by
      }
    }
  }
`;

export const GET_PROJECT_DATA_BY_ID = gql`
  query getProjectById($id: String!) {
    project(id: $id) {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        stakeholder_ammount
        name
        start_project
        end_project
        work_area
        office_location
        cost_plan
        cost_actual
        company
        role_id
        type_id
        progress_percentage
        description
        project_duration
        UpdatedBy
        DeletedBy
        status
        project_objectives
        considered_success_when
        potential_risk
        currency_symbol
        currency_code
        currency_name
        phase_id
        Phase {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          name
          color
          order
          user_id
          updated_by
          deleted_by
        }
        budget_health
        budget
      }
    }
  }
`;