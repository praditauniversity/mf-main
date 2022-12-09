import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const GET_GANTT_DATA = gql`
  query {
    gantt {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
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
        project_type_id
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
