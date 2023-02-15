import { gql, useMutation, useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "../../../../Assets/svgbutton/svgbutton.css";
import {
  IconDeleteForm,
  IconPlusForm,
  IconSaveForm,
} from "../../../Icons/icon";
import "./AddModal.css";
import { DatePickerField, TimePickerField } from "../../../Input/Input";
import { GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID } from "../../../GraphQL/Queries";
import Button from "../../../Button";

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

const AddModalMinutesOfMeeting = (props) => {
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

  const [errorValidate, setErrorValidate] = useState({});
  const validate = () => {
    let nameError = "";

    if (meeting_name.length < 1) {
      nameError = "Name can't be empty";
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
  if (total % limit === 0) {
    refetchQueries = [
      {
        query: GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID,
        variables: { projectId: String(localStorage.getItem('momProjectID')) },
      },
    ]
  } 
  
  //if right now is not on the last page, then refetch the last page
  if (page !== totalPages) {
    refetchQueries = [
      {
        query: GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID,
        variables: { projectId: String(localStorage.getItem('momProjectID')), page: String(totalPages), limit: String(limit), sort: String(sort) },
      },
    ]
  }
  else if (page === totalPages) {
    refetchQueries = [
      {
        query: GET_MINUTES_OF_MEETING_DATA_BY_PROJECT_ID,
        variables: { projectId: String(localStorage.getItem('momProjectID')), page: String(page), limit: String(limit), sort: String(sort) },
      },
    ]
  }

  const [addMinutesOfMeeting, { loading: addMinutesOfMeetingLoading, error: addMinutesOfMeetingError },] = useMutation(ADD_MINUTES_OF_MEETING,
    {
      refetchQueries: refetchQueries,
      onComplete: () => { console.log("Berhasil Add MOM") }
    });

  const inputRefProject = React.useRef(null);
  const idProject = parseInt(localStorage.getItem('momProjectID'));

  useEffect(() => {
    if (idProject) {
      setProject_id(parseInt('reportProjectID'));
    }
    else {
      console.log("data idproject not found");
    }
  }, [idProject]);

  const handleChangeProject = (event) => {
    setProject_id(parseInt(event.target.value));
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
  };


  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
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

  };

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
    setNotes(dataNotes);
  };

  const removeFieldsAtendees = (index) => {
    let dataAtendees = [...atendees];
    dataAtendees.splice(index, 1);
    setAtendees(dataAtendees);
  };

  if (addMinutesOfMeetingError)
    console.log(JSON.stringify(addMinutesOfMeetingError));

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      hideDialog();
      setErrorValidate("");
    }

    project_id === 0 ? setProject_id(parseInt(inputRefProject.current.value)) : project_id

    addMinutesOfMeeting({
      variables: {
        project_id: idProject,
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
    setMeeting_date(new Date());
    setStart_time_meeting(new Date());
    setEnd_time_meeting(new Date());
    setLocation("");
    setMeeting_leader("");
    setMeeting_objective("");
    setAtendees([""]);
    setNotes([""]);
    setAction_item([""]);
    setOwner([""]);
    setDeadline([""]);
    setStatus([""]);

    updateTotal();

    // hideDialog();
  };
  return (
    <>
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
                      className="text-lg font-bold leading-6 pb-4"
                    >
                      Add Minutes Of Meeting
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
                          placeholder="Example: Meeting Day 1"
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                          onChange={(e) => setMeeting_name(e.target.value)}
                        />
                        <div className="mt-3" style={{ color: "red" }}>{errorValidate.nameError}</div>
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
                          placeholder="Example : Jakarta"
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
                          placeholder="Example : John Doe"
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
                          placeholder="Example : Complete a daily activity"
                          className="input input-bordered w-full bg-table-dark border-primary-light"
                          onChange={(e) => setMeeting_objective(e.target.value)}
                        />
                      </div>
                    </div>

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
                                  placeholder="Example : John Doe"
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
                                  placeholder="Example : Complete activity 1 still in progress"
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
                                      placeholder="Example : Activity 1"
                                      value={input.action_item}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="owner"
                                      placeholder="Example : John Doe"
                                      value={input.owner}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="deadline"
                                      placeholder="Example : 12/12/2021"
                                      value={input.deadline}
                                      onChange={(event) =>
                                        handleFormChange(index, event)
                                      }
                                    />
                                    <input
                                      className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                      name="status"
                                      placeholder="Example : Done"
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
