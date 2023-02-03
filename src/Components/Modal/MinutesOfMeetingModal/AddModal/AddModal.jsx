import { gql, useMutation, useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "../../../../Assets/svgbutton/svgbutton.css";
// import Addnewprojectobj from './Addnewprojectobj';
// import Addnewresource from './Addnewresource';
// import Addnewphase from './Addnewphase';
// import Addnewrisk from './Addnewrisk';
import {
  IconDateForm,
  IconDeleteForm,
  IconPlus,
  IconPlusForm,
  IconSaveForm,
  IconTime,
} from "../../../Icons/icon";
import "./AddModal.css";
import { DatePickerField, TimePickerField } from "../../../Input/Input";
import { GET_PROJECT_DATA } from "../../../GraphQL/Queries";
import FetchProjectByUserId from "../../../../Middleware/Fetchers/FetchProjectByUserId";
import Button from "../../../Button";

const GET_MINUTES_OF_MEETING_DATA = gql`
  query minuteOfMeeting {
    minuteofmeeting {
      data {
        ID
        project_id
        meeting_name
        start_time_meeting
        end_time_meeting
        user_id
      }
    }
  }
`;
const ADD_MINUTES_OF_MEETING = gql`
  mutation addMinuteOfMeeting(
    $project_id: Int!
    $meeting_name: String!
    $meeting_date: DateTime
    $start_time_meeting: DateTime
    $end_time_meeting: DateTime
    $location: String
    $meeting_leader: String
    $meeting_objective: String
    $atendees: [String]
    $notes: [String]
    $action_item: [String]
    $owner: [String]
    $deadline: [String]
    $status: [String]
  ) {
    addMinuteOfMeeting(
      input: {
        project_id: $project_id
        meeting_name: $meeting_name
        meeting_date: $meeting_date
        start_time_meeting: $start_time_meeting
        end_time_meeting: $end_time_meeting
        location: $location
        meeting_leader: $meeting_leader
        meeting_objective: $meeting_objective
        atendees: $atendees
        notes: $notes
        action_item: $action_item
        owner: $owner
        deadline: $deadline
        status: $status
      }
    ) {
      data {
        ID
        project_id
        user_id
      }
    }
  }
`;

const AddModalMinutesOfMeeting = () => {
  const [inputFields, setInputFields] = useState([
    { action_item: "", owner: "", deadline: "", status: "" },
  ]);
  const [project_id, setProject_id] = useState(0);
  const [meeting_name, setMeeting_name] = useState("");
  const [meeting_date, setMeeting_date] = useState(new Date());
  const [start_time_meeting, setStart_time_meeting] = useState(new Date);
  const [end_time_meeting, setEnd_time_meeting] = useState(new Date);
  const [location, setLocation] = useState("");
  const [meeting_leader, setMeeting_leader] = useState("");
  const [meeting_objective, setMeeting_objective] = useState("");
  const [atendees, setAtendees] = useState([""]);
  const [notes, setNotes] = useState([""]);
  const [action_item, setAction_item] = useState([""]);
  const [owner, setOwner] = useState([""]);
  const [deadline, setDeadline] = useState([""]);
  const [status, setStatus] = useState([""]);

  const [
    addMinutesOfMeeting,
    { loading: addMinutesOfMeetingLoading, error: addMinutesOfMeetingError },
  ] = useMutation(ADD_MINUTES_OF_MEETING, {
    refetchQueries: [{ query: GET_MINUTES_OF_MEETING_DATA }],
  });

  const inputRefProject = React.useRef(null);

  const projectName = FetchProjectByUserId();

  function printListProjectName() {
    return projectName.map(({ ID, name }) => (
      <>
        <option value={ID}>{name}</option>
      </>
    ));
  }

  const handleChangeProject = (event) => {
    setProject_id(parseInt(event.target.value));
    console.log("project_id", typeof parseInt(event.target.value), event.target.value);
  };


  const [isOpen, setIsOpen] = useState(false);
  const showDialog = () => {
    setIsOpen(true);
  };
  const hideDialog = () => {
    setIsOpen(false);
  };

  const handleFormChangeNotes = (value, index) => {
    const dataNotes = notes.map((notesItem, notesIndex) => {
      return notesIndex === index ? value : notesItem;
    });
    setNotes(dataNotes);

    console.log("DATA", dataNotes);
    console.log("DAILYREPORTEQUP", notes);
  };


  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    console.log("DATAAAAAA", data);
    setAction_item(inputFields.map((inputField) => inputField.action_item));
    setOwner(inputFields.map((inputField) => inputField.owner));
    setDeadline(inputFields.map((inputField) => inputField.deadline));
    setStatus(inputFields.map((inputField) => inputField.status));
  };

  const handleFormChangeAtendees = (value, index) => {
    const dataAtendees = atendees.map((atendeesItem, atendeesIndex) => {
      return atendeesIndex === index ? value : atendeesItem;
    });
    setAtendees(dataAtendees);
    console.log("DATA", dataAtendees);
    console.log("DAILYREPORTEQUP", atendees);

  };


  // setWorkLogName(inputFields.map((inputField) => inputField.name));
  const addFields = () => {
    let newfield = { notes: "" };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const removeFieldsNotes = (index) => {
    let dataNotes = [...notes];
    dataNotes.splice(index, 1);
    console.log("removefields", notes);
    console.log("removefields", dataNotes);
    setNotes(dataNotes);
  };

  const removeFieldsAtendees = (index) => {
    let dataAtendees = [...atendees];
    dataAtendees.splice(index, 1);
    console.log("removefields", notes);
    console.log("removefields", dataAtendees);
    setAtendees(dataAtendees);
  };

  if (addMinutesOfMeetingError)
    console.log(JSON.stringify(addMinutesOfMeetingError));

  const handleSubmit = (e) => {


    const project_id = parseInt(inputRefProject.current.value);
    project_id === 0 ? setProject_id(parseInt(inputRefProject.current.value)) : project_id




    var gue3 = action_item;
    console.log("gue3", gue3);

    console.log("BAIBBIBIIBIB", inputFields.map((inputField) => inputField.action_item))


    console.log("Action_item", action_item);
    console.log("Owner", owner);
    console.log("Deadline", deadline);
    console.log("Status", status);
    e.preventDefault();
    addMinutesOfMeeting({
      variables: {
        project_id,
        meeting_name,
        meeting_date,
        start_time_meeting,
        end_time_meeting,
        location,
        meeting_leader,
        meeting_objective,
        atendees,
        notes,
        action_item,
        owner,
        deadline,
        status,
      },
    });

    setMeeting_name("");
    setMeeting_date("");
    setStart_time_meeting("");
    setEnd_time_meeting("");
    setLocation("");
    setMeeting_leader("");
    setMeeting_objective("");
    setAtendees([""]);
    setNotes([""]);
    setAction_item([""]);
    setOwner([""]);
    setDeadline([""]);
    setStatus([""]);

    hideDialog();
  };
  return (
    <>
      {/* <div className="flex flex-row items-center justify-center">
        <button
          onClick={showDialog}
          className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white"
          id="icon"
        >
          <IconPlus />
        </button>

        

      </div> */}
      <div className="add-button">
        <Button label="+ Add Meeting" onClick={showDialog} />
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
                      Minutes Of Meeting
                    </Dialog.Title>
                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">
                            Meeting or Project Name
                          </span>
                        </label>
                        <input
                          value={meeting_name}
                          type="text"
                          placeholder="Enter project name"
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                          onChange={(e) => setMeeting_name(e.target.value)}
                        />
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
                          {printListProjectName()}
                        </select>
                      </div>
                    </div>

                    <div className="mt-3">
                      <DatePickerField
                        label="Date"
                        selected={meeting_date}
                        onChange={(date) => setMeeting_date(date)}
                        placeholder="DD/MM/YYYY"
                      />
                    </div>

                    <div className="mt-3">
                      <TimePickerField
                        label="Start Time"
                        selected={start_time_meeting}
                        showTimeInput
                        onChange={(date) => setStart_time_meeting(date)}
                        placeholder="DD/MM/YYYY"
                      />
                    </div>

                    <div className="mt-3">
                      <TimePickerField
                        label="End Time"
                        selected={end_time_meeting}
                        showTimeInput
                        onChange={(date) => setEnd_time_meeting(date)}
                        placeholder="DD/MM/YYYY"
                      />
                    </div>

                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Location</span>
                        </label>
                        <input
                          value={location}
                          type="text"
                          placeholder="Enter location of meeting"
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Meeting Leader</span>
                        </label>
                        <input
                          value={meeting_leader}
                          type="text"
                          placeholder="Enter meeting ladder name"
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                          onChange={(e) => setMeeting_leader(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Meeting Objective</span>
                        </label>
                        <input
                          value={meeting_objective}
                          type="text"
                          placeholder="Enter purpose of meeting"
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                          onChange={(e) => setMeeting_objective(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* <div className="mt-3">
                      <div className="form-control w-full max-w-5xl">
                        <label className="label">
                          <span className="label-text">Attendees</span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered h-36 w-full bg-table-dark border-primary-light"
                          placeholder="Enter meeting attendees"
                        ></textarea>
                      </div>
                    </div> */}
                    {/* Atendees */}
                    <div className="mt-3">
                      <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">
                        Atendees
                      </label>
                      {atendees.map((input, index) => {
                        return (
                          <div key={index}>
                            <div
                              className="pb-2 w-full min-w-5xl"
                              id="buttonInside"
                            >
                              <div className="flex justify-start">
                                <input
                                  className="input input-border border-primary-light shadow appearance-none w-full"
                                  name="Atendees"
                                  placeholder="Atendees"
                                  value={input}
                                  onChange={(event) =>
                                    handleFormChangeAtendees(
                                      event.target.value,
                                      index
                                    )
                                  }
                                />
                                {atendees.length !== 1 && (
                                  <button
                                    className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2"
                                    onClick={() => removeFieldsAtendees(index)}
                                  >
                                    <IconDeleteForm />
                                  </button>
                                )}
                                {atendees.length - 1 === index && (
                                  <button
                                    className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2"
                                    onClick={() => {
                                      setAtendees([...atendees, ""]);
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

                    {/* Notes */}
                    <div className="pb-2">
                      <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">
                        Agenda & Notes
                      </label>
                      {notes.map((input, index) => {
                        return (
                          <div key={index}>
                            <div
                              className="pb-2 w-full min-w-5xl"
                              id="buttonInside"
                            >
                              <div className="flex justify-start">
                                <input
                                  className="input input-border border-primary-light shadow appearance-none w-full"
                                  name="Notes"
                                  placeholder="Notes"
                                  value={input}
                                  onChange={(event) =>
                                    handleFormChangeNotes(
                                      event.target.value,
                                      index
                                    )
                                  }
                                />
                                {notes.length !== 1 && (
                                  <button
                                    className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2"
                                    onClick={() => removeFieldsNotes(index)}
                                  >
                                    <IconDeleteForm />
                                  </button>
                                )}
                                {notes.length - 1 === index && (
                                  <button
                                    className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2"
                                    onClick={() => {
                                      setNotes([...notes, ""]);
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
                      <div className="">
                        <div className="pt-2 w-full max-w-5xl">
                          <div className=" flex justify-start gap-3">
                            <div className="w-[20%]">
                              <label className="label">
                                <p className="text-base font-medium">
                                  Action Item
                                </p>
                              </label>
                            </div>
                            <div className="w-[20%]">
                              <label className="label">
                                <p className="text-base font-medium">Owner</p>
                              </label>
                            </div>
                            <div className="w-[20%]">
                              <label className="label">
                                <p className="text-base font-medium">
                                  Deadline
                                </p>
                              </label>
                            </div>
                            <div className="w-[20%]">
                              <label className="label">
                                <p className="text-base font-medium">Status</p>
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
                                      name="action_item"
                                      placeholder="Enter Action Item"
                                      value={input.action_item}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="owner"
                                      placeholder="Enter owner"
                                      value={input.owner}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="deadline"
                                      placeholder="Enter deadline"
                                      value={input.deadline}
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
export default AddModalMinutesOfMeeting;
