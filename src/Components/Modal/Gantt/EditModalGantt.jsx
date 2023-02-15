import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconDateForm, IconEdit, IconSaveForm } from '../../Icons/icon';
import './AddModal.css';
import GetProfile from '../../Auth/GetProfile';
import { UPDATE_GANTT } from '../../../Middleware/GraphQL/mutations';
import { useQuery, useMutation } from "@apollo/client";
import { DatePickerField, InputField } from '../../Input/Input';
import { GET_GANTT_DATA, GET_GANTT_PROJECT_ID } from '../../GraphQL/Queries';
import { useParams } from 'react-router-dom';

const EditModalGantt = (props) => {
    const { ganttID } = props;
    let { projectID } = useParams();

    const [isOpen, setIsOpen] = useState(false);

    const profile = GetProfile();

    const [updateGantt, { data: updateGanttData, error: updateGanttError }] = useMutation(UPDATE_GANTT, {
        refetchQueries: [
            {
                query: GET_GANTT_PROJECT_ID,
                variables: { project_id: projectID }
            },
        ],
        onCompleted: () => { console.log("refetchQueries updateGantt Completed") }
    });;

    const { data: readGanttData, error: readGanttError } = useQuery(GET_GANTT_DATA, {
        variables: { id: String(ganttID) },
    });

    if (updateGanttError) {
        console.log(JSON.stringify(updateGanttError));
    }

    useEffect(() => {
        if (readGanttData) {

            setName(readGanttData.gantt.data[0].name);
            setDescription(readGanttData.gantt.data[0].description);
            setVersion(readGanttData.gantt.data[0].version);
            setStartTime(readGanttData.gantt.data[0].start_time);
            setEndTime(readGanttData.gantt.data[0].end_time);
        }
    }, [readGanttData]);

    const [ganttData, setGanttData] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [version, setVersion] = useState(0);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');

    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const handleSave = (e) => {
        e.preventDefault();

        updateGantt({
            variables: {
                id: String(ganttID),
                name,
                description,
                user_id: profile.id,
                version,
                project_id: parseInt(projectID),
                start_time,
                end_time
            },
        });

        if (updateGanttError) {
            console.log(JSON.stringify(updateGanttError));
        }

        hideDialog();
    };


    let { nameGantt, descriptionGantt, versionGantt, startTimeGantt, endTimeGantt } = ganttData ? ganttData.reduce((acc, data) => {
        acc.nameGantt = data.name;
        acc.descriptionGantt = data.description;
        acc.versionGantt = data.version;
        acc.startTimeGantt = data.start_time;
        acc.endTimeGantt = data.end_time;
        return acc;
    }, {}) : '';

    const ganttList = [
        {
            label: "Name",
            name: "name",
            placeholder: "Example:  Gantt First Project",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
        },
        {
            label: "Description",
            name: "descrtiption",
            placeholder: "Example:  Gantt for First Project",
            type: "text",
            value: description,
            onChange: (e) => setDescription(e.target.value),
        },
        {
            label: "Version",
            name: "version",
            placeholder: "Example:  1",
            type: "number",
            value: version,
            onChange: (e) => setVersion(parseInt(e.target.value)),
        },
    ]


    return (
        <>
            <button
                onClick={showDialog}
                className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white"
                id="icon"
            >
                <IconEdit />
            </button>
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
                                        Update Gantt
                                    </Dialog.Title>

                                    {
                                        ganttList.map((gantt, index) => {
                                            return (
                                                <div className="mt-3">
                                                    <div className="form-control w-full max-w-5xl">
                                                        <label className="label">
                                                            <span className="label-text">{gantt.label}</span>
                                                        </label>
                                                        <InputField key={index} type={gantt.type} placeholder={gantt.placeholder} value={gantt.value} onChange={gantt.onChange} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="mt-3">
                                        <div className="form-control w-full max-w-5xl">
                                            <label className="label">
                                                <p className='text-base font-medium'>Start Date</p>
                                            </label>
                                            <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                                <div className="">
                                                    <DatePickerField
                                                        selected={new Date(start_time)}
                                                        onChange={(date) => setStartTime(date)}
                                                        placeholder="DD/MM/YYYY"
                                                    />
                                                </div>
                                            </div>

                                            <label className="label">
                                                <p className='text-base font-medium'>End Date</p>
                                            </label>
                                            <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                                                <div className="">
                                                    <DatePickerField
                                                        selected={new Date(end_time)}
                                                        onChange={(date) => setEndTime(date)}
                                                        placeholder="DD/MM/YYYY"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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
export default EditModalGantt;
