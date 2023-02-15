import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import '../../../../Assets/svgbutton/svgbutton.css';
import { IconPlusForm, IconSaveForm } from '../../../Icons/icon';
import { InputField } from '../../../Input/Input';
import './AddModal.css';
import Button from "../../../Button";

const AddModalUserList = () => {
    const [company, setCompany] = useState("None");
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [role, setRole] = useState("");
    const [selectedOption, setSelectedOption] = useState("Option 1");


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

    const handleChangeCompany = (event) => {
        setCompany(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isValid = validate();
        if (isValid) {
            hideDialog();
            setErrorValidate("");
        }

        setDescription("");
        setName("");
    }

    const dataProjectCharterName = [
        {
            label: "Full Name",
            name: "full_name",
            placeholder: "Example: Alisha Taylor",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            minLength: 1,

        },
    ]

    const dataProjectCharter = [
        {
            label: "Position",
            name: "position",
            placeholder: "Example: Project Manager",
            type: "text",
            value: position,
            onChange: (e) => setPosition(e.target.value),
        },
    ];

    const dataCompany =[
        {
            id: "0",
            name: "None"
        },
        {
            id: "1",
            name: "PT. Raksa Jaya Serbaguna"
        },
        {
            id: "2",
            name: "PT. Raksa Jaya"
        },
        {
            id: "3",
            name: "PT. Raksa"
        },

    ]

    function printListCompany() {
        return dataCompany.map(({ id, name }) => (
          <>
            <option value={name}>{name}</option>
          </>
        ));
    }

    return (
        <>

            <div className="add-button">
                <Button label="+ ADD NEW USER" onClick={showDialog} />
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
                                        Add User
                                    </Dialog.Title>

                                    <Dialog.Description
                                        as="p"
                                        className="text-sm font-bold leading-6 pb-8"
                                    >
                                        Add user to your company
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

                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Company</label>
                                        <div className="flex flex-col w-full">
                                            <div className="relative">
                                                <select
                                                    className="mb-4 shadow appearance-none border rounded w-full bg-table-dark border-primary-light rounded-lg py-3 px-4"
                                                    value={company}
                                                    onChange={(event) => setCompany(event.target.value)}
                                                >
                                                    {printListCompany()}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg
                                                    className="fill-current h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.293,12.95l.707.707L15.657,8l-1.414-1.414L10,10.828 5.757,6.586 4.343,8z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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
                                            </div>
                                        );
                                    })}

                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Role</label>
                                        <p className="text-sm mb-2">You can only assign one role for this</p>
                                        <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                                            >
                                                <IconPlusForm />
                                                <p className='text-md text-white pt-0.5 px-1 font-bold'>ADD ROLE</p>
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
    );
}
export default AddModalUserList;
