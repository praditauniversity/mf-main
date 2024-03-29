import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react';
import { DELETE_ACTIVITY, UPDATE_ACTIVITY } from '../../../Middleware/GraphQL/mutations';
import { IconSaveForm } from '../../Icons/icon';
import Done from "../../../Assets/Icons/svg/Done.svg";
import { GET_ACTIVITY_DATA } from '../../GraphQL/Queries';

import "../../Snackbar/toast.css";

const UpdateModalTask = (props) => {
    const { taskData, icon } = props;
    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const [updateTask, { data: updateTaskData, error: updateTaskError }] = useMutation(UPDATE_ACTIVITY, {
        refetchQueries: [
            {
                query: GET_ACTIVITY_DATA,
            },
        ],
        onCompleted: () => { console.log("refetchQueries updateTask Completed") }
    });

    const changeTask = (
        id,
        parent_id,
        gantt_id,
        name,
        description,
        start_time,
        end_time,
        weight_percentage,
        progress_percentage,
        priority,
        cost_plan,
        cost_actual,
        material_cost_plan,
        material_cost_actual,
        tool_cost_plan,
        tool_cost_actual,
        human_cost_plan,
        human_cost_actual,
        activity_type,
        phase_id,
        unitofmeasurement_id
    ) => {
        updateTask({
            variables: {
                id: id,
                parent_id: parent_id,
                gantt_id: gantt_id,
                name: name,
                description: description,
                start_time: start_time,
                end_time: end_time,
                weight_percentage: weight_percentage,
                progress_percentage: progress_percentage,
                priority: priority,
                cost_plan: cost_plan,
                cost_actual: cost_actual,
                material_cost_plan: material_cost_plan,
                material_cost_actual: material_cost_actual,
                tool_cost_plan: tool_cost_plan,
                tool_cost_actual: tool_cost_actual,
                human_cost_plan: human_cost_plan,
                human_cost_actual: human_cost_actual,
                activity_type: activity_type,
                phase_id: phase_id,
                unitofmeasurement_id: unitofmeasurement_id,
            },
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = taskData.ID;
        const gantt_id = taskData.gantt_id;
        const parent_id = taskData.parent_id;
        const name = taskData.name;
        const description = taskData.description;
        const start_time = new Date(taskData.start_time);
        const end_time = new Date(taskData.end_time);
        const weight_percentage = taskData.weight_percentage;
        const progress_percentage = taskData.progress_percentage;
        const priority = taskData.priority;
        const cost_plan = taskData.cost_plan;
        const cost_actual = taskData.cost_actual;
        const material_cost_plan = taskData.material_cost_plan;
        const material_cost_actual = taskData.material_cost_actual;
        const tool_cost_plan = taskData.tool_cost_plan;
        const tool_cost_actual = taskData.tool_cost_actual;
        const human_cost_plan = taskData.human_cost_plan;
        const human_cost_actual = taskData.human_cost_actual;
        const activity_type = taskData.activity_type;
        const phase_id = 3;
        const unitofmeasurement_id = taskData.unitofmeasurement_id;

        changeTask(
            String(id),
            parseInt(parent_id),
            parseInt(gantt_id),
            name,
            description,
            start_time,
            end_time,
            parseFloat(weight_percentage),
            parseFloat(progress_percentage),
            priority,
            parseFloat(cost_plan),
            parseFloat(cost_actual),
            parseFloat(material_cost_plan),
            parseFloat(material_cost_actual),
            parseFloat(tool_cost_plan),
            parseFloat(tool_cost_actual),
            parseFloat(human_cost_plan),
            parseFloat(human_cost_actual),
            activity_type,
            parseInt(phase_id),
            parseInt(unitofmeasurement_id)
        );

        if (updateTaskError) {
            console.log("Error update task", JSON.stringify(updateTaskError));
        }

        // to show toast when sucesss update task
        var x = document.getElementById("snackbarupd");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

        hideDialog();

    };

    const [deleteTask, { data: deleteTaskData, error: deleteTaskError }] = useMutation(DELETE_ACTIVITY, {
        refetchQueries: [
            {
                query: GET_ACTIVITY_DATA,
            },
        ],
        onCompleted: () => { console.log("refetchQueries deleteTask Completed") }
    });

    const handleDelete = (e) => {
        e.preventDefault();
        deleteTask({
            variables: {
                id: String(taskData.ID),
            },
        });

        if (deleteTaskError) {
            console.log(JSON.stringify(deleteTaskError, null, 2));
        }

        //to show toast when sucesss delete task
        var x = document.getElementById("snackbardel");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

        hideDialog();
    };

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <button onClick={showDialog} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white" id='icon'>
                    <img src={icon} className="w-12"></img>
                </button>
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
                                        {icon === Done ? "Update Task" : "Delete Task"}
                                    </Dialog.Title>
                                    <div className="mt-3">
                                        <div className="form-control w-full max-w-5xl text-center">
                                            <p className="label-text">Are you sure?</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="form-control w-full max-w-5xl text-center item-center">
                                            <p className="label-text"> {icon === Done ? `Update task ${taskData.name} 's status to 'Done'?` : `Delete task ${taskData.name}?`} </p>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <div className='flex justify-between px-56'>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-grey px-4 py-2 text-sm font-medium text-primary hover:bg-grey-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={hideDialog}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>Cancel</p>
                                            </button>
                                            <button
                                                type="button"
                                                className={ icon === Done ? "inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" : "inline-flex justify-center rounded-md border border-transparent bg-error px-4 py-2 text-sm font-medium text-primary hover:bg-error-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"}
                                                onClick={icon === Done ? handleSubmit : handleDelete}
                                            >
                                                <IconSaveForm />
                                                <p className='text-base text-white pt-0.5 px-1'>{icon === Done ? "Update" : "Delete"}</p>
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
    );
};
export default UpdateModalTask;

