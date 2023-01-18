import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY } from "../../Middleware/GraphQL/mutations";
import Gantt from "./Gantt";

// import gantt module
import { gantt } from "dhtmlx-gantt";

// import data
import { useRef } from "react";
import GetProfile from "../Auth/GetProfile";
import ListGanttByProject from "../Listbox/ListGanttName";
import Button from "../Button";
import AddModalGantt from "../Modal/Gantt/AddModalGantt";
import AddModalActivity from "../Modal/Activity/AddModalActivity";
import { PrintListGanttName } from "./CustomActivityState";
import EditModalActivity from "../Modal/Gantt/EditModalGantt";
import DeleteModalActivity from "../Modal/Gantt/DeleteModalGantt";
import EditModalGantt from "../Modal/Gantt/EditModalGantt";
import DeleteModalGantt from "../Modal/Gantt/DeleteModalGantt";

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
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>activity type</span>" +
                "</label>" +
                "<input type='text' placeholder='Enter activity type' class='editor_type input input-bordered w-full' name='type' />" +
                "</div>" +
                "</div>"
            );
        },
        set_value: function (node, value, task) {
            node.querySelector(".editor_name").value = task.name || "";
            node.querySelector(".editor_description").value = task.description || "";
            node.querySelector(".editor_type").value = task.activity_type || "";
        },
        get_value: function (node, task) {
            task.description = node.querySelector(".editor_description").value;
            task.name = node.querySelector(".editor_name").value;
            task.activity_type = node.querySelector(".editor_type").value;
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
                "<input type='number' placeholder='Enter weight percentage' class='editor_weight input input-bordered w-full' name='weight_percentage' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Progress Percentage</span>" +
                "</label>" +
                "<input type='number' placeholder='Enter progress percentage' class='editor_progress input input-bordered w-full' name='progress' />" +
                "</div>" +

                "</div>"
            );
        },
        set_value: function (node, value, task) {
            node.querySelector(".editor_weight").value = task.weight_percentage || "";
            node.querySelector(".editor_progress").value = task.progress * 100 || "";
        },
        get_value: function (node, task) {
            task.weight_percentage = node.querySelector(".editor_progress").value;
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
                "<input type='number' placeholder='Enter cost plan' class='editor_costPlan input input-bordered w-full' name='costPlan' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Cost Actual</span>" +
                "</label>" +
                "<input type='number' placeholder='Enter cost actual' class='editor_costActual input input-bordered w-full' name='costActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Material Cost Plan</span>" +
                "</label>" +
                "<input type='number' placeholder='Enter material cost plan' class='editor_materialPlan input input-bordered w-full' name='materialPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Material Cost Actual</span>" +
                "</label>" +
                "<input type='number' placeholder='Enter material cost actual' class='editor_materialActual input input-bordered w-full' name='materialActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>tool Cost Plan</span>" +
                "</label>" +
                "<input type='number' placeholder='Enter tool cost plan' class='editor_toolPlan input input-bordered w-full' name='toolPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>tool Cost Actual</span>" +
                "</label>" +
                "<input type='number' placeholder='Enter tool cost actual' class='editor_toolActual input input-bordered w-full' name='toolActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Human Cost Plan</span>" +
                "</label>" +
                "<input type='number' placeholder='Enter human cost plan' class='editor_humanPlan input input-bordered w-full' name='humanPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Human Cost Actual</span>" +
                "</label>" +
                "<input type='number' placeholder='Enter human cost actual' class='editor_humanActual input input-bordered w-full' name='humanActual' />" +
                "</div>" +
                "</br>" +
                "</div>"
            );
        },
        set_value: function (node, value, task) {
            node.querySelector(".editor_costPlan").value = task.cost_plan || "";
            node.querySelector(".editor_costActual").value = task.cost_actual || "";
            node.querySelector(".editor_materialPlan").value = task.material_cost_plan || "";
            node.querySelector(".editor_materialActual").value = task.material_cost_actual || "";
            node.querySelector(".editor_toolPlan").value = task.tool_cost_plan || "";
            node.querySelector(".editor_toolActual").value = task.tool_cost_actual || "";
            node.querySelector(".editor_humanPlan").value = task.human_cost_plan || "";
            node.querySelector(".editor_humanActual").value = task.human_cost_actual || "";
        },
        get_value: function (node, task) {
            task.cost_plan = node.querySelector(".editor_costPlan").value;
            task.cost_actual = node.querySelector(".editor_costActual").value;
            task.material_cost_plan = node.querySelector(".editor_materialPlan").value;
            task.material_cost_actual = node.querySelector(".editor_materialActual").value;
            task.tool_cost_plan = node.querySelector(".editor_toolPlan").value;
            task.tool_cost_actual = node.querySelector(".editor_toolActual").value;
            task.human_cost_plan = node.querySelector(".editor_humanPlan").value;
            task.human_cost_actual = node.querySelector(".editor_humanActual").value;
        },
    };

    gantt.form_blocks.dropDownCustom = {
        render: function (sns) {
            return (
                "<div class='dhx_cal_ltext px-4'>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Priority</span>" +
                "</label>" +
                "<select class='editor_priority input input-bordered w-full'>" +
                "</select>" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='editor_label label-text'>Phase</span>" +
                "</label>" +
                "<select class='editor_phase input input-bordered w-full'>" +
                "</select>" +
                "</div>" +
                "</div>"
            );
        },
        set_value: function (node, value, task) {
            const prioritySelector = node.querySelector(".editor_priority");
            const phaseSelector = node.querySelector(".editor_phase");
            console.log("OPTIONSSSSSSSSSSSSS", optionPriority, optionPhase)

            if (prioritySelector.length < 1) {
                optionPriority.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    optionElement.className = "input input-bordered w-full'";
                    prioritySelector.appendChild(optionElement);
                });
            }
            if (phaseSelector.length < 1) {
                optionPhase.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    optionElement.className = "input input-bordered w-full'";
                    phaseSelector.appendChild(optionElement);
                });
            }

            prioritySelector.onchange = function () {
                const selectedPriority = this.options[this.selectedIndex];
                selectedPriorityValue = selectedPriority.value;
                selectedPriorityText = selectedPriority.textContent;
            };

            phaseSelector.onchange = function () {
                const selectedPhase = this.options[this.selectedIndex];
                selectedPhaseValue = selectedPhase.value;
                selectedPhaseText = selectedPhase.textContent;
            };
        },
        get_value: function (node, task, options) {
            const prioritySelector = node.querySelector(".editor_priority");
            const phaseSelector = node.querySelector(".editor_phase");

            task.priority = selectedPriorityText ? selectedPriorityText : task.priority ? task.priority : prioritySelector.options[0].textContent;
            task.phase_id = selectedPhaseValue ? selectedPhaseValue : task.phase_id ? task.phase_id : phaseSelector.options[0].value;
        },
    };
})();

let selectedPriorityValue;
let selectedPriorityText;
let selectedPhaseValue;
let selectedPhaseText;

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
        name: "activity",
        height: 200,
        map_to: "auto",
        type: "activity_editor",
        focus: true,
    },
    { name: "time", height: 40, type: "datepicker", map_to: "auto" },
    { name: "custom", height: 30, map_to: "auto", type: "percentage_editor" },
    { name: "custom", height: 30, map_to: "auto", type: "dropDownCustom", optionPriority: optionPriority, optionPhase: optionPhase },
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

function AppGantt_BACKUP(props) {
    console.log("RENDER");
    const { title, dataGantt, dataPhase, ganttID } = props;
    // const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");
    // const [ganttID, setGanttID] = useState(localStorage.getItem('ganttID'));
    // const [projectID, setProjectID] = useState(localStorage.getItem('projectID'));
    const profile = GetProfile();
    const [phaseID, setPhaseID] = useState();

    const isUpdated = useRef(false);
    const isAdd = useRef(false);
    const isDelete = useRef(false);

    const [addActivity, { data: addActivityData, error: addActivityError }] =
        useMutation(ADD_ACTIVITY);
    const [updateActivity, { data: updateActivityData, error: updateActivityError }] =
        useMutation(UPDATE_ACTIVITY);
    const [deleteActivity, { data: deleteActivityData, error: deleteActiityError }] =
        useMutation(DELETE_ACTIVITY);

    const createActivity = (parent_id, gantt_id, name, description, start_time, end_time, user_id, weight_percentage, progress_percentage, priority, cost_plan, cost_actual, material_cost_plan, material_cost_actual, tool_cost_plan, tool_cost_actual, human_cost_plan, human_cost_actual, activity_type, phase_id) => {
        addActivity({
            variables: {
                parent_id: parent_id,
                gantt_id: gantt_id,
                name: name,
                description: description,
                start_time: start_time,
                end_time: end_time,
                user_id: user_id,
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
            },
        });
        if (addActivityError) {
            console.log("error", JSON.stringify(addGanttError, null, 2));
        }
    };

    const changeActivity = (
        id,
        parent_id,
        gantt_id,
        name,
        description,
        start_time,
        end_time,
        user_id,
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
        phase_id
    ) => {
        updateActivity({
            variables: {
                id: id,
                parent_id: parent_id,
                gantt_id: gantt_id,
                name: name,
                description: description,
                start_time: start_time,
                end_time: end_time,
                user_id: user_id,
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
            },
        });

        if (updateActivityError) {
            console.log(JSON.stringify("Error", updateActivityError, null, 2));
        }
    };

    const removeActivity = (id) => {
        deleteActivity({
            variables: {
                id: id,
            },
        });

        if (deleteActiityError) {
            console.log(JSON.stringify("Error", deleteActiityError, null, 2));
        }
    };

    // dhtmlx save button add
    gantt.attachEvent("onAfterTaskAdd", (id, item) => {
        console.log("onAfterTaskAdd", id, item);
        if (isAdd.current === true) {
            isAdd.current = false;
            const name = item.name;
            const description = item.description;
            const user_id = item.users ? item.users : profile.id;
            const start_time = item.start_date;
            const end_time = item.end_date;
            const parent_id = item.parent;
            const gantt_id = ganttID;
            const weight_percentage = item.weight_percentage;
            const progress_percentage = item.progress;
            const priority = item.priority;
            const cost_plan = item.cost_plan;
            const cost_actual = item.cost_actual;
            const material_cost_plan = item.material_cost_plan;
            const material_cost_actual = item.material_cost_actual;
            const tool_cost_plan = item.tool_cost_plan;
            const tool_cost_actual = item.tool_cost_actual;
            const human_cost_plan = item.human_cost_plan;
            const human_cost_actual = item.human_cost_actual;
            const activity_type = item.activity_type;
            const phase_id = item.phase_id;

            console.log("TEMBAK GRAPHQL", item.name, item.description, item.users, item.start_date, item.end_date, item.parent, ganttID, item.weight_percentage, item.progress, item.priority, item.cost_plan, item.cost_actual, item.material_cost_plan, item.material_cost_actual, item.tool_cost_plan, item.tool_cost_actual, item.human_cost_plan, item.human_cost_actual, item.activity_type, item.phase_id);

            console.log("TEMBAK GRAPHQL", name, description, user_id, start_time, end_time, parent_id, gantt_id, weight_percentage, progress_percentage, priority, cost_plan, cost_actual, material_cost_plan, material_cost_actual, tool_cost_plan, tool_cost_actual, human_cost_plan, human_cost_actual, activity_type, phase_id);
            console.log("TEMBAK GRAPHQL", typeof name, typeof description, typeof user_id, typeof start_time, typeof end_time, typeof parent_id, typeof gantt_id, typeof weight_percentage, typeof progress_percentage, typeof priority, typeof cost_plan, typeof cost_actual, typeof material_cost_plan, typeof material_cost_actual, typeof tool_cost_plan, typeof tool_cost_actual, typeof human_cost_plan, typeof human_cost_actual, typeof activity_type, typeof  phase_id);

            createActivity(
                parseFloat(parent_id),
                parseFloat(gantt_id),
                name,
                description,
                start_time,
                end_time,
                user_id,
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
                parseFloat(phase_id)
            );

            console.log("TEMBAK GRAPHQL end");
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
        console.log("type of onAfterTaskUpdate", typeof item.start_date, item.start_date);
        if (isUpdated.current === true) {
            isUpdated.current = false;
            const name = item.name;
            const description = item.description;
            const user_id = item.users ? item.users : profile.id;
            const start_time = item.start_date;
            const end_time = item.end_date;
            const parent_id = item.parent;
            const gantt_id = ganttID;
            const weight_percentage = item.weight_percentage;
            const progress_percentage = item.progress;
            const priority = item.priority;
            const cost_plan = item.cost_plan;
            const cost_actual = item.cost_actual;
            const material_cost_plan = item.material_cost_plan;
            const material_cost_actual = item.material_cost_actual;
            const tool_cost_plan = item.tool_cost_plan;
            const tool_cost_actual = item.tool_cost_actual;
            const human_cost_plan = item.human_cost_plan;
            const human_cost_actual = item.human_cost_actual;
            const activity_type = item.activity_type;
            const phase_id = item.phase_id;

            console.log("TEMBAK GRAPHQL", name, description, user_id, start_time, end_time, parent_id, gantt_id, weight_percentage, progress_percentage, priority, cost_plan, cost_actual, material_cost_plan, material_cost_actual, tool_cost_plan, tool_cost_actual, human_cost_plan, human_cost_actual, activity_type, phase_id);
            console.log("TEMBAK GRAPHQL data", id, item.name, item.description, item.users, item.start_date, item.end_date, item.parent, ganttID, item.weight_percentage, item.progress, item.priority, item.cost_plan, item.cost_actual, item.material_cost_plan, item.material_cost_actual, item.tool_cost_plan, item.tool_cost_actual, item.human_cost_plan, item.human_cost_actual, item.activity_type, item.phase_id);
            console.log("TEMBAK GRAPHQL type", typeof name, typeof description, typeof user_id, typeof start_time, typeof end_time, typeof parent_id, typeof gantt_id, typeof weight_percentage, typeof progress_percentage, typeof priority, typeof cost_plan, typeof cost_actual, typeof material_cost_plan, typeof material_cost_actual, typeof tool_cost_plan, typeof tool_cost_actual, typeof human_cost_plan, typeof human_cost_actual, typeof activity_type, typeof phase_id);

            changeActivity(
                String(id),
                parseFloat(parent_id),
                parseFloat(gantt_id),
                name,
                description,
                start_time,
                end_time,
                user_id,
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
                parseFloat(phase_id)
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
            removeActivity(String(id));
        }
    });

    function subStringDate(str) {
        return str.substring(0, 10);
    }

    function MappingPhase() {
        // if optionPhase.length < 0 {
        console.log("masuk mapping phase", dataPhase);
        const arrayPhase = dataPhase.map((phase) => {
            // console.log("is activity data?", activity);
            optionPhase.push({
                value: phase.ID,
                label: phase.name,
            });
        });
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
                material_cost_actual: activity.material_cost_actual,
                ganttID: activity.gantt_id,
                cost_actual: activity.cost_actual,
                cost_plan: activity.cost_plan,
                weight_percentage: activity.weight_percentage,
                priority: activity.priority,
                material_cost_plan: activity.material_cost_plan,
                material_cost_actual: activity.material_cost_actual,
                tool_cost_plan: activity.tool_cost_plan,
                tool_cost_actual: activity.tool_cost_actual,
                human_cost_plan: activity.human_cost_plan,
                human_cost_actual: activity.human_cost_actual,
                activity_type: activity.activity_type,
                phase_id: activity.phase_id,
            });
        });


        // conditional show gantt (gantt empty? activity empty?)
        if (ganttID > 0) {
            console.log("ganttID ada");

            if (dataGantt.length > 0) {
                console.log("data gantt ada");
                return (
                    <div className="h-full">
                        {MappingPhase()}
                        {console.log("mapping data", ganttTask)}
                        <Gantt tasks={ganttTask} />
                        {/* {MappingData()} */}
                    </div>
                );
            } else {
                console.log("data gantt tidak ada");
                return (
                    <>
                    <p>No Activity</p>
                    </>
                    // <AddModalActivity />
                    // <div className="h-full">
                    //     {MappingPhase()}
                    //     {console.log("mapping data", ganttTask)}
                    //     <Gantt tasks={ganttTask} />
                    //     {/* {MappingData()} */}
                    // </div>
                )
            }
        } 
        else {
            console.log("ganttID tidak ada");
            return (
                <>
                <p>No Gantt</p>
                </>
                // <AddModalGantt />
                // <div className="h-full">
                //     {MappingPhase()}
                //     {console.log("mapping data", ganttTask)}
                //     <Gantt tasks={ganttTask} action={handler} />
                // </div>
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
                <div className="py-5 px-4 flex justify-between items-center align-middle">
                    <p className="text-md">{title}</p>
                    <div className="py-5 px-4 flex items-center align-right">
                        <AddModalGantt />
                        <EditModalGantt />
                        <DeleteModalGantt />
                        {console.log("before printlistganttname should be called")}
                        <PrintListGanttName />
                    </div>
                </div>
                {console.log("before mapping data should be called")}
                <div className="py-1 px-4 h-full">{MappingData()}</div>
                {/* <div className="py-1 px-4">{MappingPhase()}</div> */}
                {/* {MappingPhase()} */}
                {console.log("after mapping data should be called")}
            </div>
        </div>
    );
}

export default AppGantt_BACKUP;
