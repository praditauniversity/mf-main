import { gql } from "@apollo/client";


// eslint-disable-next-line import/prefer-default-export
export const GET_GANTT_DATA_LAMA1 = gql`
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
export const GET_GANTT_DATA_LAMA2 = gql`
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
        client
        client_contact
        company
        role_id
        type_id
        progress_percentage
        description
        project_manager
        total_man_power
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
export const GET_GANTT_PROJECT_ID = gql`
  query ganttGetProjectID(
    $project_id: String!
    ) {
    ganttGetProjectID(project_id: $project_id) {
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
        version
        user_id
        updated_by
        deleted_by
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_ACTIVITY_GANTT_ID = gql`
  query activityGetGanttID(
    $gantt_id: String!
    $page: String
    $limit: String
    $sort: String
    ) {
      activityGetGanttID(gantt_id: $gantt_id, page: $page, limit: $limit, sort: $sort) {
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
          activity_type
          phase_id
          phase {
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
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_PROJECT_DATA = gql`
query project{
  project {
    Data {
      ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        name
        description
        start_project
        end_project
        stakeholder_ammount
        work_area
        office_location
        cost_plan
        cost_actual
        client
        client_contact
        role_id
        type_id
        Type {
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
        progress_percentage
        project_manager
        project_duration
        total_man_power
        status
        considered_success_when
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
        participants
        milestone_id
        Milestone {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          status
          due_date
          user_id
          updated_by
          deleted_by
        }
        project_objectives
        available_resources
        potential_risk
        updated_by
        deleted_by
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

export const GET_PROJECT_WITH_LIMIT = gql`
  query projectPage($page: String!, $limit: String!) {
    projectPage(page: $page, limit: $limit) {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        name
        description
        start_project
        end_project
        stakeholder_ammount
        work_area
        office_location
        cost_plan
        cost_actual
        client
        client_contact
        role_id
        type_id
        Type {
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
        progress_percentage
        project_manager
        project_duration
        total_man_power
        status
        considered_success_when
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
        participants
        milestone_id
        Milestone {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          status
          due_date
          user_id
          updated_by
          deleted_by
        }
        project_objectives
        available_resources
        potential_risk
        updated_by
        deleted_by
      }
    }
  }
`

// eslint-disable-next-line import/prefer-default-export
export const GET_PHASE_DATA = gql`
  query projectPhase{
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
`

export const GET_TYPE_DATA = gql`
  query projectTYPE {
    projectType {
      Data {
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
`

export const GET_PROJECT_DATA_BY_ID = gql`
  query getProjectById($id: String!) {
    project(id: $id) {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        name
        description
        start_project
        end_project
        stakeholder_ammount
        work_area
        office_location
        cost_plan
        cost_actual
        client
        client_contact
        role_id
        type_id
        Type {
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
        progress_percentage
        project_manager
        project_duration
        total_man_power
        status
        considered_success_when
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
        participants
        milestone_id
        Milestone {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          status
          due_date
          user_id
          updated_by
          deleted_by
        }
        project_objectives
        available_resources
        potential_risk
        updated_by
        deleted_by
      }
    }
  }
`;

export const GET_PROJECT_DATA_BY_USER_ID = gql`
  query getProjectByUserId(
    $userId: String!
    $page: String
    $limit: String
    $sort: String
    ) {
    projectByUserId(userId: $userId, page: $page, limit: $limit, sort: $sort) {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        name
        description
        start_project
        end_project
        stakeholder_ammount
        work_area
        office_location
        cost_plan
        cost_actual
        client
        client_contact
        role_id
        type_id
        Type {
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
        progress_percentage
        project_manager
        project_duration
        total_man_power
        status
        considered_success_when
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
        participants
        milestone_id
        Milestone {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          status
          due_date
          user_id
          updated_by
          deleted_by
        }
        project_objectives
        available_resources
        potential_risk
        updated_by
        deleted_by
      }
    }
  }
`;

export const GET_MILESTONE_DATA = gql`
  query projectMilestone {
    projectMilestone {
        Data {
            ID
            status
            due_date
        }
    }
  }
`;

export const GET_CHARTER_DATA = gql`
  query Project{
    project{
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        name
        description
        start_project
        end_project
        stakeholder_ammount
        work_area
        office_location
        cost_plan
        cost_actual
        client
        client_contact
        role_id
        type_id
        Type {
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
        progress_percentage
        project_manager
        project_duration
        total_man_power
        status
        considered_success_when
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
        participants
        milestone_id
        Milestone {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          status
          due_date
          user_id
          updated_by
          deleted_by
        }
        project_objectives
        available_resources
        potential_risk
        updated_by
        deleted_by
      }
    }
  }
`;

export const GET_CHARTER_DATA_BY_USER_ID = gql`
  query projectByUserId($userId: String!) {
    projectByUserId(userId: $userId) {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        name
        description
        start_project
        end_project
        stakeholder_ammount
        work_area
        office_location
        cost_plan
        cost_actual
        client
        client_contact
        role_id
        type_id
        Type {
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
        progress_percentage
        project_manager
        project_duration
        total_man_power
        status
        considered_success_when
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
        participants
        milestone_id
        Milestone {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          status
          due_date
          user_id
          updated_by
          deleted_by
        }
        project_objectives
        available_resources
        potential_risk
        updated_by
        deleted_by
      }
    }
  }
`;

export const GET_CHARTER_DATA_BY_ID = gql`
  query projectById($id: String!) {
    project(id: $id) {
      Data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        user_id
        name
        description
        start_project
        end_project
        stakeholder_ammount
        work_area
        office_location
        cost_plan
        cost_actual
        client
        client_contact
        role_id
        type_id
        Type {
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
        progress_percentage
        project_manager
        project_duration
        total_man_power
        status
        considered_success_when
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
        participants
        milestone_id
        Milestone {
          ID
          CreatedAt
          UpdatedAt
          DeletedAt
          status
          due_date
          user_id
          updated_by
          deleted_by
        }
        project_objectives
        available_resources
        potential_risk
        updated_by
        deleted_by
      }
    }
  }
`;

export const GET_GANTT_DATA = gql`
query gantt(
  $id: String!
  ) {
  gantt(id: $id) {
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
      version
      user_id
      updated_by
      deleted_by
    }
  }
}
`;

export const GET_ACTIVITY_DATA = gql`
  query Activity {
    activity {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        name
        description
        gantt_id
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
        activity_type
        phase_id
        phase {
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
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const GET_ACTIVITY_PHASE_DATA = gql`
  query {
    activityPhase {
      data {
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

export const GET_DAILY_REPORT_DATA = gql`
  query dailyReport {
    dailyReport {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        name
        description
        status
        report_date
        report_number
        activity_id
        project_id
        user_id
        work_log_name
        work_log_desc
        work_log_hour
        work_log_status
        updated_by
        deleted_by
      }
    }
  }
`;

export const GET_DAILY_REPORT_DATA_BY_PROJECT_ID = gql`
  query dailyReportByProjectId(
    $projectId: String!
    $page: String
    $limit: String
    $sort: String
    ) {
    dailyReportGetProjectID(project_id: $projectId, page: $page, limit: $limit, sort: $sort) {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        name
        description
        status
        report_date
        report_number
        activity_id
        project_id
        user_id
        updated_by
        deleted_by
        equipment
        work_log_desc
        work_log_hour
        work_log_name
        work_log_status
      }
    }
  }
`;

export const GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID = gql`
  query minuteOfMeetingGetProjectID($projectId: String!) {
    minuteOfMeetingGetProjectID(project_id: $projectId) {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        project_id
        meeting_name
        meeting_date
        start_time_meeting
        end_time_meeting
        location
        meeting_leader
        meeting_objective
        user_id
        updated_by
        deleted_by
      }
    }
  }
`;

export const GET_MINUTES_OF_MEETING_DATA_BY_ID = gql`
  query MinuteOfMeeting($id: String!) {
    minuteofmeeting(id: $id) {
      data {
        ID
        CreatedAt
        UpdatedAt
        DeletedAt
        project_id
        meeting_name
        meeting_date
        start_time_meeting
        end_time_meeting
        location
        meeting_leader
        meeting_objective
        user_id
        updated_by
        deleted_by
      }
    }
  }
`;