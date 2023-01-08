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
            // return Math.round(obj.progress * 100);
            return Math.round(obj.progress * 100);
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
    };

    gantt.form_blocks.activity_editor = {
        render: function (sns) {
            return (
                "<div class='dhx_cal_ltext px-4'>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Name</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter activity name' class='editor_name input input-bordered w-full' name='name' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Description</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter activity description' class='editor_description input input-bordered w-full' name='description' />" +
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

    gantt.form_blocks.percentage_editor = {
        render: function (sns) {
            return (
                "<div class='dhx_cal_ltext px-4'>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Weight Percentage</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter weight percentage' class='editor_weight input input-bordered w-full' name='weight' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Progress Percentage</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter progress percentage' class='editor_progress input input-bordered w-full' name='progress' />" +
                "</div>" +

                "</div>"
            );
        },
        set_value: function (node, value, task) {
            node.querySelector(".editor_weight").value = task.weight || "";
            node.querySelector(".editor_progress").value = task.progress || "";
        },
        get_value: function (node, task) {
            task.weight = node.querySelector(".editor_progress").value;
            task.progress = node.querySelector(".editor_weight").value;
        },
    };

    gantt.form_blocks.costplan_editor = {
        render: function (sns) {
            return (
                "<div class='dhx_cal_ltext px-4'>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Cost Plan</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter cost plan' class='editor_costPlan input input-bordered w-full' name='costPlan' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Cost Actual</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter cost actual' class='editor_costActual input input-bordered w-full' name='costActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Material Cost Plan</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter material cost plan' class='editor_materialPlan input input-bordered w-full' name='materialPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Material Cost Actual</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter material cost actual' class='editor_materialActual input input-bordered w-full' name='materialActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>tool Cost Plan</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter tool cost plan' class='editor_toolPlan input input-bordered w-full' name='toolPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>tool Cost Actual</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter tool cost actual' class='editor_toolActual input input-bordered w-full' name='toolActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Human Cost Plan</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter human cost plan' class='editor_humanPlan input input-bordered w-full' name='humanPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Human Cost Actual</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter human cost actual' class='editor_humanActual input input-bordered w-full' name='humanActual' />" +
                "</div>" +
                "</br>" +
                "</div>"
            );
        },
        set_value: function (node, value, task) {
            node.querySelector(".editor_costPlan").value = task.costPlan || "";
            node.querySelector(".editor_costActual").value = task.costActual || "";
            node.querySelector(".editor_materialPlan").value = task.materialPlan || "";
            node.querySelector(".editor_materialActual").value = task.materialActual || "";
            node.querySelector(".editor_toolPlan").value = task.toolPlan || "";
            node.querySelector(".editor_toolActual").value = task.toolActual || "";
            node.querySelector(".editor_humanPlan").value = task.humanPlan || "";
            node.querySelector(".editor_humanActual").value = task.humanActual || "";
        },
        get_value: function (node, task) {
            task.costPlan = node.querySelector(".editor_costPlan").value;
            task.costActual = node.querySelector(".editor_costActual").value;
            task.materialPlan = node.querySelector(".editor_materialPlan").value;
            task.MaterialActual = node.querySelector(".editor_materialActual").value;
            task.description = node.querySelector(".editor_description").value;
            task.toolPlan = node.querySelector(".editor_toolPlan").value;
            task.toolActual = node.querySelector(".editor_toolActual").value;
            task.humanPlan = node.querySelector(".editor_humanPlan").value;
            task.humanActual = node.querySelector(".editor_humanActual").value;
        },
    };

})();

gantt.form_blocks.dropDownCustom = {
    // createEditor: function (gantt, container, task, config) {
    //     const options = ['Option 1', 'Option 2', 'Option 3'];
    //     // Create a new dropdown element
    //     const dropdown = document.createElement('select');

    //     // Add options to the dropdown
    //     options.forEach(option => {
    //         const optionElement = document.createElement('option');
    //         optionElement.value = option;
    //         optionElement.textContent = option;
    //         dropdown.appendChild(optionElement);
    //     });

    //     // Set the initial value of the dropdown
    //     dropdown.value = task[config.name];

    //     // Add the dropdown to the container
    //     container.appendChild(dropdown);

    //     // Return the dropdown element
    //     return dropdown;
    // },

    render: function (sns) {
        return (
            "<div class='dhx_cal_ltext px-4'>" +
            "<div class='form-control w-3/4'>" +
            "<label class='label'>" +
            "<span class='label-text'>Cost Plan</span>" +
            "</label>" +
            "<select class='editor_selectCustom input input-bordered w-full'>" +
            // "<option value='1' class='editor_optionCustom input input-bordered w-full'></option>" +
            "</select>" +
            "</div>" +
            "</div>"
        );
    },
    // createEditor: function(gantt, container, task, config) {
    //     console.log("createEditor");
    //     // Create a new dropdown element
    //     const dropdown = document.createElement('select');

    //     // Add options to the dropdown
    //     const options = ['Option 1', 'Option 2', 'Option 3'];
    //     options.forEach(option => {
    //       const optionElement = document.createElement('option');
    //       optionElement.value = option;
    //       optionElement.textContent = option;
    //       dropdown.appendChild(optionElement);
    //     });

    //     // // Set the initial value of the dropdown
    //     // dropdown.value = task[config.name];

    //     // // Add the dropdown to the container
    //     // container.appendChild(dropdown);

    //     // Return the dropdown element
    //     return dropdown;
    //   },

    //   setValue: function(gantt, editor, value) {
    //     // Set the value of the dropdown
    //     editor.value = value;
    //   },

    //   getValue: function(gantt, editor) {
    //     // Get the value of the dropdown
    //     return editor.value;
    //   },

    //   destroy: function(gantt, editor) {
    //     // Destroy the editor
    //     editor.parentNode.removeChild(editor);
    //   }

    set_value: function (node, value, task, options) {
        const selectorSelect = node.querySelector(".editor_selectCustom");
        options.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    optionElement.className = "input input-bordered w-full'";
                    selectorSelect.appendChild(optionElement);
                });
    },
    get_value: function (node, task, options) {
        // task.priority = node.querySelector(".editor_optionCustom").textContent;
        task.priority = node.querySelector(".editor_selectCustom").textContent;
        console.log("BBBBBBBBBBB", AAA)
    },
};

// static data
var optionPriority = [
    { value: "1", label: "High" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Low" },
];

// add by mappingPhase()
var optionPhase = [];

gantt.locale.labels.section_activity = "Activity Form";
gantt.locale.labels.section_priority = "Priority";
gantt.locale.labels.section_phase = "Phase";
gantt.locale.labels.section_custom = "";

gantt.config.lightbox.sections = [
    {
        name: "activtiy",
        height: 200,
        map_to: "auto",
        type: "activity_editor",
        focus: true,
    },
    { name: "time", height: 40, type: "datepicker", map_to: "auto" },
    { name: "custom", height: 30, map_to: "auto", type: "percentage_editor" },
    { name: "custom", height: 30, map_to: "auto", type: "dropDownCustom", options: optionPriority },
    { name: "custom", height: 30, map_to: "auto", type: "dropDownCustom", options: optionPhase },
    { name: "custom", height: 30, map_to: "auto", type: "costplan_editor" },
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
    // task.materialActual = task.materialActual;
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
        console.log("AAAAAAAAAAAAAAAAAAAAAAA", typeof item.start_date, item.start_date);
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
        // if optionPhase.length < 0 {
        const arrayPhase = dataPhase.map((phase) => {
            // console.log("is activity data?", activity);
            optionPhase.push({
                value: phase.ID,
                label: phase.name,
            });
        });
        // return arrayPhase;
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
                progress: activity.progress_percentage / 100,
                materialActual: activity.material_cost_actual,
                ganttID: activity.gantt_id,
                costActual: activity.cost_actual,
                costPlan: activity.cost_plan,
                weight: activity.weight_percentage,
                progress: activity.progress_percentage,
                priority: activity.priority,
                materialPlan: activity.material_cost_plan,
                materialActual: activity.material_cost_actual,
                toolPlan: activity.tool_cost_plan,
                toolActual: activity.tool_cost_actual,
                humanPlan: activity.human_cost_plan,
                humanActual: activity.human_cost_actual,
                activity_type: activity.activity_type,
                phase_id: activity.phase_id,
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
                {MappingPhase()}
                <div className="py-1 px-4 h-full">{MappingData()}</div>
                {/* <div className="py-1 px-4">{MappingPhase()}</div> */}
                {/* {MappingPhase()} */}
                {console.log("after mapping data should be called")}
            </div>
        </div>
    );
}

export default TestFormGantt;