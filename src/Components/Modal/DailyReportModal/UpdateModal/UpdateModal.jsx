import { gql, useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "../../../../Assets/svgbutton/svgbutton.css";
import { GET_ACTIVITY_DATA } from "../../../GraphQL/Queries";
import {
  IconDeleteForm,
  IconEdit,
  IconPlus,
  IconPlusForm,
  IconSaveForm,
} from "../../../Icons/icon";
import { DatePickerField } from "../../../Input/Input";
import "./UpdateModal.css";

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

const UPDATE_DAILY_REPORT = gql`
mutation updateDailyreports(
  $id: String!,
  $name: String!,
  $description: String,
  $status: String,
  $equipment: [String],
  $report_date: DateTime,
  $work_log_name: [String],
  $work_log_desc: [String],
  $work_log_status: [String],
  $work_log_hour: [Int]
) {
updateDailyReport( id:$id
input:{
    name: $name,
      description: $description,
    status: $status,
      equipment: $equipment,
      report_date: $report_date,
      work_log_name: $work_log_name,
      work_log_desc: $work_log_desc,
      work_log_status: $work_log_status,
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

const UpdateModalDailyReport = (props) => {
  const { reportID, reportData } = props;

  const [inputFields, setInputFields] = useState(() => {
    const inputFieldsData = [];
    for (let i = 0; i < reportData.work_log_name.length; i++) {
      inputFieldsData.push({
        name: reportData.work_log_name[i],
        description: reportData.work_log_desc[i],
        status: reportData.work_log_status[i],
        hour: reportData.work_log_hour[i],
      });
    }
    return inputFieldsData;
  });

  const [equipment, setEquipment] = useState(reportData.equipment);
  const [name, setName] = useState(reportData.name);
  const [description, setDescription] = useState(reportData.description);
  const [status, setStatus] = useState(reportData.status);
  const [report_date, setReportDate] = useState(new Date(reportData.report_date));
  const [work_log_name, setWorkLogName] = useState(reportData.work_log_name);
  const [work_log_desc, setWorkLogDesc] = useState(reportData.work_log_desc);
  const [work_log_status, setWorkLogStatus] = useState(reportData.work_log_status);
  const [work_log_hour, setWorkLogHour] = useState(reportData.work_log_hour);

  const [ updateDailyReport, { loading: updateDailyReportloading, error: updateDailyReportError },] = useMutation(UPDATE_DAILY_REPORT, 
    {
    refetchQueries: [{ query: GET_DAILY_REPORT }],
  });

  const [isOpen, setIsOpen] = useState(false);
  const showDialog = () => {
    setIsOpen(true);
  };
  const hideDialog = () => {
    setIsOpen(false);
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

  const handleFormChangeEquipment = (value, index) => {
    const dataEquip = equipment.map((equipItem, equipIndex) => {
      return equipIndex === index ? value : equipItem;
    });
    setEquipment(dataEquip);

    console.log("DATA", dataEquip);
    console.log("DAILYREPORTEQUP", equipment);
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
    console.log("removefields", equipment);
    console.log("removefields", dataEquip);
    setEquipment(dataEquip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateDailyReport({
      variables: {
        id: reportID,
        name,
        description,
        status,
        equipment,
        report_date,
        work_log_name,
        work_log_desc,
        work_log_status,
        work_log_hour,
      },
    });
    setName("");
    setEquipment([''])
    setDescription("");
    setStatus("");
    setReportDate("");
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={showDialog}
          className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white"
          id="icon"
        >
          <IconEdit />
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
                        {console.log(inputFields)}
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
                                      placeholder="Enter name"
                                      value={input.name}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="description"
                                      placeholder="Enter description"
                                      value={input.description}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="status"
                                      placeholder="Enter status"
                                      value={input.status}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="hour"
                                      type={"number"}
                                      placeholder="Enter hour"
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

                    {/* equipment */}
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
                                  placeholder="Equipment"
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

                    <div>
                      <p className="label-text">Daily Report ID: <span className="label-text font-bold">{reportID}</span></p>
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
export default UpdateModalDailyReport;
