import { gql, useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "../../../../Assets/svgbutton/svgbutton.css";
import { GET_ACTIVITY_DATA, GET_PROJECT_DATA } from "../../../GraphQL/Queries";
import { IconPlus, IconSaveForm } from "../../../Icons/icon";
import { DatePickerField } from "../../../Input/Input";
import "./AddModal.css";
import Addnewequipment, { useEquipment } from "./Addnewequipment";
import Addnewworklog, { useWorkLog } from "./Addnewworklog";

const GET_DAILY_REPORT = gql`
  query DailyReport {
    dailyReport {
      data {
        name
        description
        report_number
      }
    }
  }
`;

const ADD_DAILY_REPORT = gql`
  mutation addDailyReport(
    $name: String!
    $description: String!
    $status: String!
    $equipment: [String]!
    $activity_id: Int!
    $project_id: Int!
    $report_date: DateTime!
    $work_log_name: [String]!
    $work_log_desc: [String]!
    $work_log_status: [String]!
    $work_log_hour: [Int]!
  ) {
    addDailyReport(
      input: {
        name: $name
        description: $description
        status: $status
        equipment: $equipment
        activity_id: $activity_id
        project_id: $project_id
        report_date: $report_date
        work_log_name: $work_log_name
        work_log_desc: $work_log_desc
        work_log_status: $work_log_status
        work_log_hour: $work_log_hour
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

const AddModalDailyReport = () => {
  const [equipment, setEquipment] = useEquipment();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [activity_id, setActivityId] = useState(0);
  const [project_id, setProjectId] = useState(0);
  const [report_date, setReportDate] = useState("");
  const [work_log_name, work_log_desc,work_log_status,work_log_hour, setWorkLog] = useWorkLog([]);
  const [
    addDailyReport,
    { loading: addDailyReportLoading, error: addDailyReportError },
  ] = useMutation(ADD_DAILY_REPORT, {
    refetchQueries: [{ query: GET_DAILY_REPORT }],
  });

  const inputRefActivity = useRef(null);
  const inputRefProject = useRef(null);

  const { data, loading, error } = useQuery(GET_ACTIVITY_DATA);
  const {
    data: getproject,
    loading: loadingproject,
    error: errorproject,
  } = useQuery(GET_PROJECT_DATA);
  const [projectName, setProjectName] = useState([]);
  const [activityName, setActivityName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const showDialog = () => {
    setIsOpen(true);
  };
  const hideDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (data) {
      console.log("data Ready List Activity");
      setActivityName(data.activity.data);
      console.log("data found", data.activity.data);
    } else {
      console.log("data not found");
    }
    if (getproject) {
      console.log("data Ready List Project");
      setProjectName(getproject.project.Data);
      console.log("data found", getproject.project.Data);
    }
    console.log("USE EFFECT list daily report");
  }, [data, getproject]);

  function printListsetActivityName() {
    return activityName.map(({ ID, name }) => (
      <>
        <option value={ID}>{name}</option>
      </>
    ));
  }

  function printListsetProjectName() {
    return projectName.map(({ ID, name }) => (
      <>
        <option value={ID}>{name}</option>
      </>
    ));
  }
  const handleChangeActivity = (event) => {
    setActivityId(parseInt(event.target.value));
    console.log(
      "Activity ID",
      typeof parseInt(event.target.value),
      event.target.value
    );
  };

  const handleChangeProject = (event) => {
    setProjectId(parseInt(event.target.value));
    console.log(
      "Project ID",
      typeof parseInt(event.target.value),
      event.target.value
    );
  };

  const handleName = (event) => {
    setName(event.target.value);
    console.log("Name", event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
    console.log("Description", event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
    console.log("Status", event.target.value);
  };

  const handleReportDate = (event) => {
    setReportDate(event.target.value);
    console.log("Report Date", event.target.value);
  };

  const handleSubmit = (e) => {
    activity_id !== 0
      ? activity_id
      : setActivityId(parseInt(inputRefActivity.current.value));
    project_id !== 0
      ? project_id
      : setProjectId(parseInt(inputRefProject.current.value));

    e.preventDefault();

    addDailyReport({
      variables: {
        name,
        description,
        status,
        equipment,
        activity_id,
        project_id,
        report_date,
        work_log_name,
        work_log_desc,
        work_log_status,
        work_log_hour,
      },
    });
    setName("");
    setDescription("");
    setStatus("");
    setEquipment =>([]);
    setActivityId(0);
    setProjectId(0);
    setReportDate("");
    setWorkLogDesc =>([]);
    setWorkLogName =>([]);
    setWorkLogStatus =>([]);
    setWorkLogHour=>([]);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={showDialog}
          className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white"
          id="icon"
        >
          <IconPlus />
        </button>
      </div>
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40" onClose={hideDialog}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="px-24 py-16 w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6"
                    >
                      Daily Report
                    </Dialog.Title>
                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Daily Report Name</span>
                        </label>
                        <input
                          value={name}
                          type="text"
                          placeholder="Enter project name"
                          onChange={handleName}
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Description</span>
                        </label>
                        <input
                          value={description}
                          type="text"
                          placeholder="Enter your name"
                          onChange={handleDescription}
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Status Project</span>
                        </label>
                        <input
                          value={status}
                          type="text"
                          placeholder="Enter your project location"
                          onChange={handleStatus}
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                    <DatePickerField
                      label="Report Date"
                      selected={report_date}
                      onChange={(date) => setReportDate(date)}
                      placeholder="DD/MM/YYYY"
                    />
                    </div>

                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">
                            General Project Status
                          </span>
                        </label>
                        {/* ini harusnya bukan input kali */}
                        <input
                          type="text"
                          placeholder="Select Status"
                          onChange={handleStatus}
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                        />
                      </div>
                    </div>
                    {/* activity */}
                    <div className="mt-3">
                      <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">
                        Activity Name
                      </label>
                      <div className="flex flex-col items-center">
                        <select
                          ref={inputRefActivity}
                          value={activity_id}
                          onChange={handleChangeActivity}
                          className="editor_type select select-bordered w-full max-w-5xl"
                        >
                          {printListsetActivityName()}
                        </select>
                      </div>
                    </div>
                    {/* project */}
                    <div className="mt-3">
                      <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">
                        Project Name
                      </label>
                      <div className="flex flex-col items-center">
                        <select
                          ref={inputRefProject}
                          value={project_id}
                          onChange={handleChangeProject}
                          className="editor_type select select-bordered w-full max-w-5xl"
                        >
                          {printListsetProjectName()}
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="form-control w-full max-w-5xl">
                        <div className="border-2 border-grey-border rounded-lg px-4 py-2">
                          <div className="">
                            <p className="text-lg font-semibold">Work Log</p>
                          </div>
                          <Addnewworklog />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Equipments</span>
                        </label>
                        <Addnewequipment />
                      </div>
                    </div>
                    <div className="mt-10">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={handleSubmit}
                        >
                          <IconSaveForm />
                          <p className="text-base text-white pt-0.5 px-1">
                            Save
                          </p>
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
};
export default AddModalDailyReport;
