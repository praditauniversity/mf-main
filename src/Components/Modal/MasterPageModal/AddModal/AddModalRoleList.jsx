import { gql, useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { GET_MILESTONE_DATA, GET_PHASE_DATA, GET_PROJECT_DATA_BY_USER_ID, GET_TYPE_DATA } from '../../../GraphQL/Queries';
// import { GET_PROJECT_DATA_BY_ID } from "../../GraphQL/Queries";
import '../../../../Assets/svgbutton/svgbutton.css';
import FetchCharter from '../../../../Middleware/Fetchers/FetchCharter';
import { IconDeleteForm, IconPlus, IconPlusForm, IconSaveForm } from '../../../Icons/icon';
import { DatePickerField, InputField } from '../../../Input/Input';
import './AddModal.css';
import Button from "../../../Button";
import { useForm } from "react-hook-form";
import GetProfile from "../../../Auth/GetProfile";
import ChooseColor from "./ChooseColor";


//yang masih belom mutation dan querynya
const ADD_CHARTER = gql`
    mutation addProject(
        $status: String
        $work_area: String
        $start_project: DateTime
        $stakeholder_ammount: Int
        $role_id: Int
        $type_id: Int
        $considered_success_when: String
        $cost_actual: Float
        $cost_plan: Float
        $client: String
        $client_contact: String
        $currency_name: String
        $currency_code: String
        $currency_symbol: String
        $description: String
        $end_project: DateTime
        $name: String!
        $office_location: String
        $phase_id: Int
        $potential_risk: [String]
        $total_man_power: Int
        $project_objectives: [String]
        $progress_percentage: Float
        $budget: Int
        $participants: Int
        $available_resources:[String]
        $milestone_id: Int
    ) {
    addProject(
        input: {
            status: $status,
            work_area: $work_area,
            start_project: $start_project,
            stakeholder_ammount: $stakeholder_ammount,
            role_id: $role_id,
            type_id: $type_id,
            considered_success_when: $considered_success_when,
            cost_actual: $cost_actual,
            cost_plan: $cost_plan,
            client: $client,
            client_contact: $client_contact,
            currency_name: $currency_name,
            currency_code: $currency_code,
            currency_symbol: $currency_symbol,
            description: $description,
            end_project: $end_project,
            name: $name,
            office_location: $office_location,
            phase_id: $phase_id,
            potential_risk: $potential_risk,
            total_man_power: $total_man_power,
            project_objectives: $project_objectives,
            progress_percentage: $progress_percentage,
            budget: $budget,
            participants: $participants,
            available_resources: $available_resources,
            milestone_id: $milestone_id
        }
    ) {
        Data {
            ID
            participants
            available_resources
            milestone_id
        }
       }
    }
`;

const GET_CHARTER_DATA_BY_USER_ID = gql`
query projectCharterByUserId($userId: String!) {
    projectCharterByUserId(userId: $userId) {
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

const AddModalRoleList = () => {
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");


    const [errorValidate, setErrorValidate] = useState({});
    const validate = () => {
        let nameError = "";
        let descError = "";

        if (name.length < 1) {
            nameError = "Name can't be empty";
        }
        if (description.length > 4) {
            descError = "Description can't be empty";
        }

        if (nameError || descError) {
            setErrorValidate({ nameError, descError });
            return false;
        }

        return true;
    };



    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (isValid) {
            hideDialog();
            setErrorValidate("");
        }

        setDescription("");
        setName("");

        // hideDialog();
    }

    const dataProjectCharterName = [
        {
            label: "Role Name",
            name: "role_name",
            placeholder: "Example: Admin",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            minLength: 1,

        },
    ]

    const dataProjectCharter = [
        {
            label: "Description",
            name: "description",
            placeholder: "Example: This project is about anomaly detection",
            type: "text",
            value: description,
            onChange: (e) => setDescription(e.target.value),
        }
    ];

    const colorButton = [
        {
            color: "[#A8186E]"
        },
        {
            color: "red-500"
        },
        {
            color: "pink-500"
        },
        {
            color: "primary"
        },
    ];

    return (
        <>

            <div className="add-button">
                <Button label="+ ADD NEW ROLE" onClick={showDialog} />
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={hideDialog}>
                    <Transition
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition
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
                                        className="text-2xl font-bold leading-6 pb-2"
                                    >
                                        Add Role
                                    </Dialog.Title>

                                    <Dialog.Description
                                        as="p"
                                        className="text-sm font-bold leading-6 pb-8"
                                    >
                                        Customize the role based on your needs
                                    </Dialog.Description>

                                    {/* participants */}
                                    {dataProjectCharterName.map((data, index) => {
                                        return (
                                            <div className="pb-2">
                                                <InputField
                                                    key={index}
                                                    label={data.label}
                                                    name={data.name}
                                                    placeholder={data.placeholder}
                                                    type={data.type}
                                                    value={data.value}
                                                    onChange={data.onChange}
                                                    minLength={data.minLength}

                                                />
                                                <div style={{ color: "red" }}>{errorValidate.nameError}</div>
                                            </div>
                                        );
                                    })}

                                    {/* Descriptions */}
                                    {dataProjectCharter.map((data, index) => {
                                        return (
                                            <div>
                                                <InputField
                                                    key={index}
                                                    label={data.label}
                                                    name={data.name}
                                                    placeholder={data.placeholder}
                                                    type={data.type}
                                                    value={data.value}
                                                    onChange={data.onChange}
                                                    minLength={data.minLength}

                                                />
                                                {/* <div style={{ color: "red" }}>{errorValidate.nameError}</div> */}
                                            </div>


                                        );
                                    })}

                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold pb-2">Color</label>
                                        <div className="flex mr-2">
                                            {colorButton.map((data) => {
                                                return (
                                                    <div>
                                                        <ChooseColor color={data.color} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-primary bg-background-snow px-4 py-2 text-sm font-medium text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                                            >
                                                <div className="flex align-center">
                                                    <span className="text-xl mr-3">+</span> 
                                                    <p className='text-md text-primary font-bold pt-[5px]'>ADD OTHER COLOR</p>
                                                </div>
                                                
                                        </button>
                                    </div>

                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Access Page</label>
                                        <p className="text-sm mb-2">Manage what page that this role can access</p>
                                        <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                                                onClick={handleSubmit}
                                            >
                                                <div className="flex align-center">
                                                    <span className="text-xl text-white mr-3">+</span> 
                                                    <p className='text-md text-white font-bold pt-[5px]'>ADD ACCESS PAGE</p>
                                                </div>
                                        </button>
                                    </div>

                                    <div className="mt-10">
                                        <div className='flex justify-end'>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={handleSubmit}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>Save</p>
                                            </button>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
export default AddModalRoleList;
