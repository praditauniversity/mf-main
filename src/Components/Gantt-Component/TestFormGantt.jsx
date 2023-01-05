import React, { Component, useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ACTIVITY_GANTT_ID } from "../GraphQL/Queries";
import { ADD_GANTT, UPDATE_GANTT, DELETE_GANTT } from "../../Middleware/GraphQL/mutations";
import Gantt from "./Gantt";

// import gantt module
import { gantt } from "dhtmlx-gantt";

// import data
import { useRef } from "react";
import GetProfile from "../Auth/GetProfile";
import ListGanttByProject from "../Listbox/ListGanttName";
import Button from "../Button";

// create custom column
gantt.config.columns = [
    { name: "name", label: "Activity", tree: true, width: 200, resize: true },
    {
        name: "start_date",
        label: "Start Time",
        align: "center",
        width: 70,
        resize: true,
    },
    {
        name: "end_date",
        label: "End Time",
        align: "center",
        width: 70,
        resize: true,
    },
    {
        name: "progress",
        label: "Progress(%)",
        template(obj) {
            return Math.round(obj.progress * 100) / 100;
        },
    },
    { name: "add", width: 44 },
];

// Create custom add task editor
(function () {
    // eslint-disable-next-line no-undef
    const startDatepicker = (node) => $(node).find("input[name='start']");
    // eslint-disable-next-line no-undef
    const endDateInput = (node) => $(node).find("input[name='end']");

    gantt.form_blocks.datepicker = {
        render: (sns) => {
            const height = sns.height || 45;
            return (
                // eslint-disable-next-line prefer-template
                "<div class='gantt-lb-datepicker px-4' style='height:" +
                height +
                "px;'>" +
                "<input class='border-solid border-2 py-1 px-2' type='text' name='start'>" +
                "&nbsp - &nbsp" +
                "<input class='border-solid border-2 py-1 px-2' type='text' name='end'>" +
                "</div>"
            );
        },
        set_value: (node, value, task, section) => {
            const datepickerConfig = {
                format: "yyyy-mm-dd",
                autoclose: true,
                container: gantt.$container,
            };
            startDatepicker(node).datepicker(datepickerConfig);
            startDatepicker(node).datepicker(
                "setDate",
                value ? value.start_date : task.start_date
            );

            endDateInput(node).datepicker(datepickerConfig);
            endDateInput(node).datepicker(
                "setDate",
                value ? value.end_date : task.end_date
            );

            startDatepicker(node)
                .datepicker()
                .on("changeDate", (e) => {
                    const endValue = endDateInput(node).datepicker("getDate");
                    const startValue = startDatepicker(node).datepicker("getDate");

                    if (startValue && endValue) {
                        if (endValue.valueOf() <= startValue.valueOf()) {
                            endDateInput(node).datepicker(
                                "setDate",
                                gantt.calculateEndDate({
                                    start_date: startValue,
                                    duration: 1,
                                    task,
                                })
                            );
                        }
                    }
                });
        },
        get_value: (node, task, section) => {
            const start = startDatepicker(node).datepicker("getDate");
            let end = endDateInput(node).datepicker("getDate");

            if (end.valueOf() <= start.valueOf()) {
                end = gantt.calculateEndDate({
                    start_date: start,
                    duration: 1,
                    task,
                });
            }
            if (task.start_date && task.end_date) {
                task.start_date = start;
                task.end_date = end;
            }

            task.duration = gantt.calculateDuration(task);

            return {
                start_date: start,
                end_date: end,
                duration: task.duration,
            };
        },
        focus: (node) => { },
    };

    gantt.form_blocks.activity_editor = {
        render: function (sns) {
            return (
                "<div class='dhx_cal_ltext px-4'>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Activity Name</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter activity name' class='editor_name input input-bordered w-full' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Activity Name</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter activity name' class='editor_description input input-bordered w-full' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Activity Name</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter weight_percentage' class='editor input input-bordered w-full' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Activity Name</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter progress_percentage' class='editor input input-bordered w-full' />" +
                "</div>" +


                "</div>"
            );
        },
        set_value: function (node, value, task) {
            node.querySelector(".editor_name").value = task.name || "";
            node.querySelector(".editor_description").value = task.description || "";
        },
        get_value: function (node, task) {
            task.description = node.querySelector(".editor_description").value;
            task.name = node.querySelector(".editor_name").value;
        },
        focus: function (node) {
            var a = node.querySelector(".editor_name");
            a.select();
            a.focus();
        },
    };

    gantt.form_blocks.select_editor = {
        render: function (sns) {
            return (
                "<div class='dhx_cal_ltext px-4'>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Activity Name</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter activity name' class='editor_name input input-bordered w-full' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Activity Name</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter activity name' class='editor_description input input-bordered w-full' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Activity Name</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter activity name' class='editor input input-bordered w-full' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Activity Name</span>" +
                "</label>" +
                // "<input type='text' placeholder='Enter activity name' class='editor input input-bordered w-full' />" +
                "{MappingPhase()}" +
                "</div>" +


                "</div>"
            );
        },
        set_value: function (node, value, task) {
            node.querySelector(".editor_name").value = task.name || "";
            node.querySelector(".editor_description").value = task.description || "";
        },
        get_value: function (node, task) {
            task.description = node.querySelector(".editor_description").value;
            task.name = node.querySelector(".editor_name").value;
        },
        focus: function (node) {
            var a = node.querySelector(".editor_name");
            a.select();
            a.focus();
        },
    };
})();

gantt.locale.labels.section_activity = "Activity Form";
gantt.locale.labels.section_custom = "";

gantt.config.lightbox.sections = [
    {
        name: "activtiy",
        height: 200,
        map_to: "auto",
        type: "activity_editor",
        focus: true,
    },
    { name: "custom", height: 30, map_to: "auto", type: "select" },
    { name: "time", height: 90, type: "datepicker", map_to: "auto" },
];

// dhtmlx cancel button
gantt.attachEvent("onLightboxCancel", function (id) {
    console.log("onLightboxCancel", id);
});

//dhtmlx to get data
gantt.attachEvent("onBeforeTaskDisplay", (id, task) => {
    task.text = task.name;
    task.start_date = task.start_date;
    task.end_date = task.end_date;
    task.progress = task.progress;
    task.duration = task.duration;
    task.parent = task.parent;
    task.id = task.id;
    return true;
});

// Create Data Static
const ganttTask = {
    data: [],
    links: [
        { id: 1, source: 1, target: 2, type: "1" },
        { id: 2, source: 2, target: 3, type: "0" },
    ],
};

function handler({ action, obj, id }) {
    if (action === "select-task") console.log(`Task ${id} was selected`);
}

function addGanttTask(id, name, description, users, start_date, end_date) {
    gantt.addTask({
        id: id,
        name: name,
        description: description,
        users: users,
        start_date: start_date,
        end_date: end_date,
    });
}

function TestFormGantt(props) {
    console.log("RENDER");
    const { title, dataGantt, dataPhase } = props;
    const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");
    const [phaseID, setPhaseID] = useState();

    const isUpdated = useRef(false);
    const isAdd = useRef(false);
    const isDelete = useRef(false);

    const [addGantt, { data: addGanttData, error: addGanttError }] =
        useMutation(ADD_GANTT);
    const [updateGantt, { data: updateGanttData, error: updateGanttError }] =
        useMutation(UPDATE_GANTT);
    const [deleteGantt, { data: deleteGanttData, error: deleteGanttError }] =
        useMutation(DELETE_GANTT);

    const createGantt = (name, description, user_id, start_time, end_time) => {
        addGantt({
            variables: {
                name: name,
                description: description,
                user_id: 0,
                start_time: start_time,
                end_time: end_time,
            },
        });

        if (addGanttError) {
            console.log(JSON.stringify(addGanttError, null, 2));
        }
    };

    const changeGantt = (
        id,
        name,
        description,
        user_id,
        start_time,
        end_time
    ) => {
        updateGantt({
            variables: {
                id: id,
                name: name,
                description: description,
                user_id: 0,
                start_time: start_time,
                end_time: end_time,
            },
        });

        if (updateGanttError) {
            console.log(JSON.stringify(updateGanttError, null, 2));
        }
    };

    const removeGantt = (id) => {
        deleteGantt({
            variables: {
                id: id,
            },
        });

        if (deleteGanttError) {
            console.log(JSON.stringify(deleteGanttError, null, 2));
        }
    };

    // dhtmlx save button add
    gantt.attachEvent("onAfterTaskAdd", (id, item) => {
        console.log("onAfterTaskAdd", id, item);
        if (isAdd.current === true) {
            isAdd.current = false;
            const name = item.name;
            const description = item.description;
            const user_id = item.users;
            const start_time = item.start_date;
            const end_time = item.end_date;

            createGantt(name, description, parseInt(user_id), start_time, end_time);
            console.log("TEMBAK GRAPHQL");
        }

        // console.log(name, description, user_id, start_time, end_time);
    });

    // dhtmlx save button
    gantt.attachEvent("onLightboxSave", function (id, item, is_new) {
        console.log("onLightboxSave", id, item, is_new);
        if (is_new === false) {
            // false = update data
            isUpdated.current = true;
            isAdd.current = false;
        }
        if (is_new === true) {
            // true = add data
            isUpdated.current = false;
            isAdd.current = true;
        }

        return true;
    });

    // dhtmlx delete button
    gantt.attachEvent("onLightboxDelete", function (id) {
        console.log("onLightboxDelete", id);
        isDelete.current = true;

        return true;
    });

    // dhtmlx save button update
    gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
        console.log(isUpdated.current);
        if (isUpdated.current === true) {
            isUpdated.current = false;
            const name = item.name;
            const description = item.description;
            const user_id = item.users;
            const start_time = item.start_date;
            const end_time = item.end_date;

            changeGantt(
                String(id),
                name,
                description,
                parseInt(user_id),
                start_time,
                end_time
            );

            console.log("TEMBAK GRAPHQL");
        }

        console.log("onaftertaskupdate", id, item);

        // console.log(name, description, typeof user_id, start_time, end_time);
    });

    // dhtmlx delete button
    gantt.attachEvent("onAfterTaskDelete", (id) => {
        if (isDelete.current === true) {
            isDelete.current = false;
            removeGantt(String(id));
        }
    });

    function subStringDate(str) {
        return str.substring(0, 10);
    }

    function MappingPhase() {
        const handleChange = (event) => {
            setPhaseID(event.target.value);
        };

        function MapPhase(){
            return dataPhase.map((phase) => {
                // console.log("is phase data?", phase);
                <option className="text-{{phase.color}}" value={phase.ID}>{phase.name}</option>
            })
        }

            return (
                <select value={phaseID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                    {/* <option value="1">Project Anomaly</option>
                <option value="2">Project Alpha</option>
                <option value="3">Project Beta</option>
                <option value="4">Project Gamma</option> */}
                    {/* {console.log("FBBBBBBBBBBBBBBBB", mapPhase)} */}
                    {MapPhase()}
                </select>
            )
    }

// mapping data
function MappingData() {
    const dataActivity = dataGantt.map((activity) => {
        // console.log("is activity data?", activity);
        const startDate = subStringDate(activity.start_time);
        const endDate = subStringDate(activity.end_time);

        ganttTask.data.push({
            id: activity.ID,
            name: activity.name,
            description: activity.description,
            users: activity.user_id,
            start_date: startDate,
            end_date: endDate,
            parent: String(activity.parent_id),
        });
    });

    if (dataGantt.length > 0) {
        return (
            <div className="h-full">
                {console.log("mapping data", ganttTask)}
                <Gantt tasks={ganttTask} action={handler} />
            </div>
        );
    } else {
        return (
            <div className="h-full px-12 align-middle">
                {/* {console.log("Data Not Found")} */}
                <p className="text-center align-middle">Gantt is Empty</p>
                <Button label="ADD GANTT"></Button>
            </div>
        )
    }
}
const [isOpen, setIsOpen] = useState(false);
const showDialog = () => {
    setIsOpen(true);
}
const hideDialog = () => {
    setIsOpen(false);
}

return (
    <div className="bg-white py-6 px-12 rounded-xl shadow-lg h-full">
        <div className="h-full">
            <div className="py-5 px-4 flex justify-between">
                <p className="text-md">{title}</p>
                <ListGanttByProject />
            </div>
            {console.log("before mapping data should be called")}
            <div className="py-1 px-4 h-full">{MappingData()}</div>
            <div className="py-1 px-4 h-full">{MappingPhase()}</div>
            {console.log("after mapping data should be called")}
        </div>
    </div>
);
}

export default TestFormGantt;
