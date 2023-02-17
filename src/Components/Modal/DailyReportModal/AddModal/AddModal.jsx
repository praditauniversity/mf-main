import { gql, useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "../../../../Assets/svgbutton/svgbutton.css";
import Button from "../../../Button";
import { GET_ACTIVITY_DATA, GET_DAILY_REPORT_DATA_BY_PROJECT_ID, GET_GANTT_PROJECT_ID, GET_PROJECT_DATA_BY_ID } from "../../../GraphQL/Queries";
import {
  IconDeleteForm,
  IconPlusForm,
  IconSaveForm,
} from "../../../Icons/icon";
import { DatePickerField } from "../../../Input/Input";
import "./AddModal.css";
import './toast.css';

const ADD_DAILY_REPORT = gql`
  mutation addDailyReport(
    $name: String!
    $description: String
    $status: String
    $equipment: [String]
    $activity_id: Int
    $project_id: Int
    $report_date: DateTime
    $work_log_name: [String]
    $work_log_desc: [String]
    $work_log_status: [String]
    $work_log_hour: [Int]
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

const AddModalDailyReport = (props) => {
  const [inputFields, setInputFields] = useState([
    { name: "", description: "", status: "", hour: 0 },
  ]);
  const [equipment, setEquipment] = useState([""]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [activity_id, setActivityId] = useState(0);
  const [project_id, setProjectId] = useState(0);
  const [report_date, setReportDate] = useState(new Date());
  const [work_log_name, setWorkLogName] = useState([""]);
  const [work_log_desc, setWorkLogDesc] = useState([""]);
  const [work_log_status, setWorkLogStatus] = useState([""]);
  const [work_log_hour, setWorkLogHour] = useState([0]);

  const [errorValidate, setErrorValidate] = useState({});
  const validate = () => {
    let nameError = "";

    if (name.length < 1) {
      nameError = "Name can't be empty";
      inputRef.current.focus();
    }
    if (nameError) {
      setErrorValidate({ nameError });
      return false;
    }

    return true;
  };


  const { page, limit, sort, total, updateTotal, totalPages } = props;

  let refetchQueries = []

  //if last data length before created new data is multiple of limit, then
  if (total % limit === 0 || page !== totalPages) {
    refetchQueries = [
      {
        query: GET_DAILY_REPORT_DATA_BY_PROJECT_ID,
        variables: { projectId: String(localStorage.getItem('reportProjectID')) },
      },
    ]
  }

  //if right now is not on the last page, then refetch the last page
  if (page !== totalPages) {
    refetchQueries = [
      {
        query: GET_DAILY_REPORT_DATA_BY_PROJECT_ID,
        variables: { projectId: String(localStorage.getItem('reportProjectID')), page: String(totalPages), limit: String(limit), sort: String(sort) },
      },
    ]
  } else if (page === totalPages) {
    refetchQueries = [
      {
        query: GET_DAILY_REPORT_DATA_BY_PROJECT_ID,
        variables: { projectId: String(localStorage.getItem('reportProjectID')), page: String(page), limit: String(limit), sort: String(sort) },
      },
    ]
  }

  const [
    addDailyReport, { loading: addDailyReportLoading, error: addDailyReportError },] = useMutation(ADD_DAILY_REPORT,
      {
        refetchQueries: refetchQueries,
        onComplete: () => { console.log("Add Daily Report + Refetch Completed") }
      });

  const inputRefActivity = useRef(null);
  const inputRefProject = useRef(null);
  const inputRef = useRef(null);

  const { data: dataProject } = useQuery(GET_PROJECT_DATA_BY_ID, {
    variables: { id: String(localStorage.getItem("reportProjectID")) },
    pollInterval: 1000,
  });
  const [projectName, setProjectName] = useState([]);

  const { data: dataGantt } = useQuery(GET_GANTT_PROJECT_ID, {
    variables: { project_id: String(localStorage.getItem("reportProjectID")) },
    pollInterval: 1000,
  });
  const [ganttName, setGanttName] = useState([]);

  const { data, loading, error } = useQuery(GET_ACTIVITY_DATA);
  const [activityName, setActivityName] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const showDialog = () => {
    setIsOpen(true);
  };
  const hideDialog = () => {
    setIsOpen(false);
  };

  const idProject = parseInt(localStorage.getItem('reportProjectID'));

  useEffect(() => {
    if (idProject) {
      setProjectId(parseInt('reportProjectID'));
    }
    if (data) {
      console.log("data Ready List Activity");
      setActivityName(data.activity.data);
      console.log("data list activity found", data.activity.data);
    } else {
      console.log("data list activity not found");
    }
    if (dataProject) {
      console.log("data Ready List Project");
      setProjectName(dataProject.project.Data);
      console.log("data found", dataProject.project.Data);
    }
    if (dataGantt) {
      console.log("data Ready List Gantt");
      setGanttName(dataGantt.ganttGetProjectID.data);
      console.log("data list gantt found", dataGantt.ganttGetProjectID.data);
    }
    console.log("USE EFFECT list daily report");
  }, [data, idProject, dataProject, dataGantt]);

  function printListsetActivityName() {
    return projectName.map((project) => {
      return ganttName.map((gantt) => {
        if (gantt.project_id === project.ID) {
          return activityName.map((activity) => {
            if (gantt.ID === activity.gantt_id) {
              return (
                <>
                  <option value={activity.ID}>{activity.name}</option>
                </>
              );
            }
          });
        }
      });
    });
  }

  const handleChangeActivity = (event) => {
    setActivityId(parseInt(event.target.value));
    console.log(
      "Handle Change - Activity ID",
      typeof parseInt(event.target.value),
      event.target.value
    );
  };

  const handleName = (event) => {
    setName(event.target.value);
    // console.log("Name", event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
    // console.log("Description", event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
    // console.log("Status", event.target.value);
  };

  const handleReportDate = (event) => {
    setReportDate(event.target.value);
    // console.log("Report Date", event.target.value);
  };

  const handleFormChangeEquipment = (value, index) => {
    const dataEquip = equipment.map((equipItem, equipIndex) => {
      return equipIndex === index ? value : equipItem;
    });
    setEquipment(dataEquip);
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    setWorkLogName(inputFields.map((inputField) => inputField.name));
    setWorkLogDesc(inputFields.map((inputField) => inputField.description));
    setWorkLogStatus(inputFields.map((inputField) => inputField.status));
    setWorkLogHour(inputFields.map((inputField) => parseInt(inputField.hour)));
  };

  const addFields = () => {
    let newfield = { equipment: "" };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const removeFieldsEquipment = (index) => {
    let dataEquip = [...equipment];
    dataEquip.splice(index, 1);
    setProjectObjectives(dataEquip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const activity_id = parseInt(inputRefActivity.current.value);
    activity_id === 0 ? setActivityId(parseInt(inputRefActivity.current.value)) : activity_id
    project_id === 0 ? setProjectId(parseInt(inputRefProject.current.value)) : project_id

    setWorkLogName(inputFields.map((inputField) => inputField.name));
    setWorkLogDesc(inputFields.map((inputField) => inputField.description));
    setWorkLogStatus(inputFields.map((inputField) => inputField.status));
    setWorkLogHour(inputFields.map((inputField) => parseInt(inputField.hour)));

    addDailyReport({
      variables: {
        name,
        description,
        status,
        equipment,
        activity_id,
        project_id: idProject,
        report_date,
        work_log_name,
        work_log_desc,
        work_log_status,
        work_log_hour,
      },
    });

    const isValid = validate();
    if (isValid) {
      //to show toast when sucesss create report
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

      updateTotal();

      hideDialog();
      setErrorValidate("");

      setName("");
      setEquipment([''])
      setDescription("");
      setStatus("");
      setActivityId(0);
      setProjectId(String(localStorage.getItem("reportProjectID")));
      setReportDate(new Date());
    }
  };

  return (
    <>

      <div className="add-button">
        <Button label="+ Add Report" onClick={showDialog} />
        <div id="snackbar">Daily report created successfully</div>
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
                  <Dialog.Panel className="md:px-24 px-10 py-16 w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6 pb-4"
                    >
                      Add Daily Report
                    </Dialog.Title>
                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Daily Report Name <span class='text-error'>*</span></span>
                        </label>
                        <input
                          value={name}
                          type="text"
                          placeholder="Example: Daily Report 1"
                          onChange={handleName}
                          ref={inputRef}
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                        />
                        <div className="mt-3" style={{ color: "red" }}>{errorValidate.nameError}</div>
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
                          placeholder="Example: Report Day 1"
                          onChange={handleDescription}
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Status</span>
                        </label>
                        <input
                          value={status}
                          type="text"
                          placeholder="Example: In Progress"
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
                          <option value={0}>None</option>
                          {printListsetActivityName()}
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <div className="pt-2 w-full max-w-5xl">
                          <div className=" flex justify-start gap-3">
                            <div className="w-[20%]">
                              <label className="label">
                                <p className="text-base font-medium">Name</p>
                              </label>
                            </div>
                            <div className="w-[20%]">
                              <label className="label">
                                <p className="text-base font-medium">
                                  Work Description
                                </p>
                              </label>
                            </div>
                            <div className="w-[20%]">
                              <label className="label">
                                <p className="text-base font-medium">Status</p>
                              </label>
                            </div>
                            <div className="w-[20%]">
                              <label className="label">
                                <p className="text-base font-medium">
                                  Number of Hour
                                </p>
                              </label>
                            </div>
                          </div>
                        </div>
                        {inputFields.map((input, index) => {
                          return (
                            <div key={index}>
                              <div>
                                <div
                                  className="pb-2 w-full max-w-5xl"
                                  id="buttonInside"
                                >
                                  <div className="flex justify-start gap-3">
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="name"
                                      placeholder="Example: John Doe"
                                      value={input.name}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="description"
                                      placeholder="Example: Create new UI"
                                      value={input.description}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="status"
                                      placeholder="Example: Done"
                                      value={input.status}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="hour"
                                      type={"number"}
                                      placeholder="Example: 4"
                                      value={input.hour}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />

                                    {inputFields.length !== 1 && (
                                      <button
                                        className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg"
                                        onClick={() => removeFields(index)}
                                      >
                                        <IconDeleteForm />
                                      </button>
                                    )}
                                    {inputFields.length - 1 === index && (
                                      <button
                                        className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg"
                                        onClick={addFields}
                                      >
                                        <IconPlusForm />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="pb-2">
                      <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">
                        Equipment
                      </label>
                      {equipment.map((input, index) => {
                        return (
                          <div key={index}>
                            <div
                              className="pb-2 w-full min-w-5xl"
                              id="buttonInside"
                            >
                              <div className="flex justify-start">
                                <input
                                  className="input input-border border-primary-light shadow appearance-none w-full"
                                  name="Equipment"
                                  placeholder="Example: Laptop"
                                  value={input}
                                  onChange={(event) =>
                                    handleFormChangeEquipment(
                                      event.target.value,
                                      index
                                    )
                                  }
                                />
                                {equipment.length !== 1 && (
                                  <button
                                    className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2"
                                    onClick={() => removeFieldsEquipment(index)}
                                  >
                                    <IconDeleteForm />
                                  </button>
                                )}
                                {equipment.length - 1 === index && (
                                  <button
                                    className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2"
                                    onClick={() => {
                                      setEquipment([...equipment, ""]);
                                    }}
                                  >
                                    <IconPlusForm />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
