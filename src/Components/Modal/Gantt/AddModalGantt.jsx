import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconDateForm, IconPlus, IconSaveForm } from '../../Icons/icon';
import './AddModal.css'
import Button from '../../Button';
import GetProfile from '../../Auth/GetProfile';
import useLocalStorage from '../../../Middleware/useLocalStorage';
import { ADD_GANTT } from '../../../Middleware/GraphQL/mutations';
import { useQuery, gql, useMutation } from "@apollo/client";
import { DatePickerField, InputField } from '../../Input/Input';
import TableDatePicker from '../ModalDatePicker/DatePickerModal';


// note
//Kalo make localstorage, projectID mesti di trigger ke project dashboard dulu baru muncul
//Kalo static, aman

const AddModalGantt = () => {
    const [isOpen, setIsOpen] = useState(false);

    const profile = GetProfile();
    const [projectID, setProjectID] = useLocalStorage('projectID');

    const [addGantt, { data: addGanttData, error: addGanttError }] = useMutation(ADD_GANTT);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [user_id, setUserId] = useState(profile.id);
    const [version, setVersion] = useState(0);
    const [project_id, setProjectId] = useState(projectID);
    // const [project_id, setProjectId] = useState(1);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');

    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const settingtUserProject = ({value}) =>{
        value(value);
    }

    const handleSave = (e) => {
        e.preventDefault();
        // const idUser = setUserId(parseInt(user_id));
        // setUserId(parseInt(user_id));
        // setUserId(parseInt(profile.id));

        addGantt({
            variables: {
                name,
                description,
                user_id: profile.id,
                version,
                // project_id: projectID,
                project_id,
                start_time,
                end_time
            },
        });

        console.log(typeof name, name);
        console.log(typeof description, description);
        // console.log(typeof parseInt(user_id), parseInt(user_id));
        // console.log(typeof parseInt(profile.id), parseInt(profile.id));
        console.log(typeof user_id, user_id);
        console.log(typeof profile.id, profile.id);
        console.log(typeof version, version);
        console.log(typeof project_id, project_id);
        console.log(typeof projectID, projectID);
        console.log(typeof start_time, start_time);
        console.log(typeof end_time, end_time);

        if (addGanttError) {
            console.log(JSON.stringify(addGanttError, null, 2));
        }

        // setName('');
        // setDescription('');
        setUserId(profile.id);
        // setVersion('');
        setProjectId(1);
        // setStartTime('');
        // setEndTime('');

        // hideDialog();
    };

    const ganttList = [
        {
            label: "Name",
            name: "name",
            placeholder: "Enter Gantt Name",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
        },
        {
            label: "Description",
            name: "descrtiption",
            placeholder: "Enter Gantt Description",
            type: "text",
            value: description,
            onChange: (e) => setDescription(e.target.value),
        },
        {
            label: "Version",
            name: "version",
            placeholder: "Enter Gantt Version",
            type: "number",
            value: version,
            onChange: (e) => setVersion(parseInt(e.target.value)),
        },
    ]


    return (
        <>
            <div className="h-full px-5 align-right">
                <Button onClick={showDialog} label="ADD GANTT"></Button>
            </div>
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
                                        Create Gantt
                                    </Dialog.Title>
                                    <>
                                        {ganttList.map((item, index) => {
                                            return (
                                                <InputField
                                                    key={index}
                                                    label={item.label}
                                                    name={item.name}
                                                    placeholder={item.placeholder}
                                                    type={item.type}
                                                    value={item.value}
                                                    onChange={item.onChange}
                                                />
                                            );
                                        })}
                                    </>

                                    <DatePickerField
                                        label="Start Date"
                                        selected={start_time}
                                        onChange={(date) => setStartTime(date)}
                                        placeholder="DD/MM/YYYY"
                                    />

                                    <DatePickerField
                                        label="End Date"
                                        selected={end_time}
                                        onChange={(date) => setEndTime(date)}
                                        placeholder="DD/MM/YYYY"
                                    />

                                    {/* <settingtUserProject 
                                        value={user_id}
                                    />
                                    <settingtUserProject 
                                        value={project_id}
                                    /> */}

                                    <div className="mt-10">
                                        <div className='flex justify-end'>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={handleSave}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>Save</p>
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
    )
}
export default AddModalGantt;
