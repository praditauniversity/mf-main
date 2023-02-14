import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_ACTIVITY, ADD_ACTIVITY_LINK, DELETE_ACTIVITY, UPDATE_ACTIVITY, UPDATE_ACTIVITY_LINK, DELETE_ACTIVITY_LINK } from "../../Middleware/GraphQL/mutations";
import Gantt from "./Gantt";

// import gantt module
import { gantt } from "dhtmlx-gantt";

// import data
import { useRef } from "react";
import AddModalGantt from "../Modal/Gantt/AddModalGantt";
import DeleteModalGantt from "../Modal/Gantt/DeleteModalGantt";
import EditModalGantt from "../Modal/Gantt/EditModalGantt";
import { PrintListGanttName } from "./CustomActivityState";
import Toolbar from "./Toolbar";
import { GET_ACTIVITY_DATA, GET_ACTIVITY_GANTT_ID, GET_LINK_DATA } from "../GraphQL/Queries";
import ListboxGanttProjectDashboard from "../Card/PrintGanttProjectDashboard/ListboxGanttProjectDashboard";

let selectedPriorityValue;
let selectedPriorityText;
let selectedPhaseValue;
let selectedPhaseText;
let selectedUnitMeasureText;
let selectedUnitMeasureValue;
// add by mappingPhase()
let optionPhase = [];
// add by mappingUnitofMeasurement()
let optionUnitMeasurement = [];
let isLinkDelete;

// create custom column
gantt.config.columns = [
    { name: "name", label: "Activity", tree: true, width: "*", resize: true, open: true },
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
            return Math.round(obj.progress * 100);
        },
        resize: true,
    },
    // { name: "add", width: 44 },
];

gantt.eachTask(function (task) {
    gantt.open(task.id);
});

const handleRender = () => {
    // Refresh the Gantt chart
    // if there is an error this handle will not refresh and broken instead
    console.log("handleRender");
    gantt.render();
};
const handleClearAll = () => {
    // Clear data and links Gantt chart
    gantt.clearAll();
};

// Create custom add task editor
(function () {
    $(".gantt_cal_light.my-custom-class").css("height", "800px");
    // eslint-disable-next-line no-undef
    const startDatepicker = (node) => $(node).find("input[name='start']");
    // eslint-disable-next-line no-undef
    const endDateInput = (node) => $(node).find("input[name='end']");

    gantt.config.buttons_left = ["gantt_save_btn", "gantt_cancel_btn", "gantt_delete_btn"];
    // gantt.config.buttons_right = [null];

    gantt.config.buttons_right = gantt.config.buttons_right.filter(function (button) {
        return button != "gantt_delete_btn";
    });


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
                "<input type='text' placeholder='Example: Preparing' class='editor_name input input-bordered w-full' name='name' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Description</span>" +
                "</label>" +
                "<input type='text' placeholder='Example: Preparing the project with requirement analysis' class='editor_description input input-bordered w-full' name='description' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>activity type</span>" +
                "</label>" +
                "<input type='text' placeholder='Example: Manpower' class='editor_type input input-bordered w-full' name='type' />" +
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
            let a = node.querySelector(".editor_name");
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
                "<input type='number' placeholder='Example: 50' class='editor_weight input input-bordered w-full' name='weight_percentage' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Progress Percentage</span>" +
                "</label>" +
                "<input type='number' placeholder='Example: 10' class='editor_progress input input-bordered w-full' name='progress' />" +
                "</div>" +

                "</div>"
            );
        },
        set_value: function (node, value, task) {
            node.querySelector(".editor_weight").value = task.weight_percentage || "";
            node.querySelector(".editor_progress").value = task.progress * 100 || "";
        },
        get_value: function (node, task) {
            task.progress = node.querySelector(".editor_progress").value / 100;
            task.weight_percentage = node.querySelector(".editor_weight").value;
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
                "<input type='number' placeholder='Example: 100000' class='editor_costPlan input input-bordered w-full' name='costPlan' />" +
                "</div>" +
                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Cost Actual</span>" +
                "</label>" +
                "<input type='number' placeholder='Example: 100000' class='editor_costActual input input-bordered w-full' name='costActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Material Cost Plan</span>" +
                "</label>" +
                "<input type='number' placeholder='Example: 100000' class='editor_materialPlan input input-bordered w-full' name='materialPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Material Cost Actual</span>" +
                "</label>" +
                "<input type='number' placeholder='Example: 100000' class='editor_materialActual input input-bordered w-full' name='materialActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>tool Cost Plan</span>" +
                "</label>" +
                "<input type='number' placeholder='Example: 100000' class='editor_toolPlan input input-bordered w-full' name='toolPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>tool Cost Actual</span>" +
                "</label>" +
                "<input type='number' placeholder='Example: 100000' class='editor_toolActual input input-bordered w-full' name='toolActual' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Human Cost Plan</span>" +
                "</label>" +
                "<input type='number' placeholder='Example: 100000' class='editor_humanPlan input input-bordered w-full' name='humanPlan' />" +
                "</div>" +

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Human Cost Actual</span>" +
                "</label>" +
                "<input type='number' placeholder='Example: 100000' class='editor_humanActual input input-bordered w-full' name='humanActual' />" +
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

                "<div class='form-control w-3/4'>" +
                "<label class='label'>" +
                "<span class='label-text'>Unit of Measurement</span>" +
                "</label>" +
                "<select class='editor_unitmeasure input input-bordered w-full'>" +
                "</select>" +
                "</div>" +
                "</div>"
            );
        },
        set_value: function (node, value, task) {
            const prioritySelector = node.querySelector(".editor_priority");
            const phaseSelector = node.querySelector(".editor_phase");
            const unitMeasureSelector = node.querySelector(".editor_unitmeasure");
            // console.log("Console Log Check Options Data", optionPriority, optionPhase, optionUnitMeasurement)

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
            console.log("Console Log Check UnitMeasureSelector", unitMeasureSelector);
            if (unitMeasureSelector.length < 1) {
                optionUnitMeasurement.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    optionElement.className = "input input-bordered w-full'";
                    unitMeasureSelector.appendChild(optionElement);
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

            unitMeasureSelector.onchange = function () {
                const selectedUnitMeasure = this.options[this.selectedIndex];
                selectedUnitMeasureValue = selectedUnitMeasure.value;
                selectedUnitMeasureText = selectedUnitMeasure.textContent;
            };
        },
        get_value: function (node, task, options) {
            const prioritySelector = node.querySelector(".editor_priority");
            const phaseSelector = node.querySelector(".editor_phase");
            const unitMeasureSelector = node.querySelector(".editor_phase");

            task.priority = selectedPriorityText ? selectedPriorityText : task.priority ? task.priority : prioritySelector.options[0].textContent;
            task.phase_id = selectedPhaseValue ? selectedPhaseValue : task.phase_id ? task.phase_id : phaseSelector.options[0].value;
            task.unitofmeasurement_id = selectedUnitMeasureValue ? selectedUnitMeasureValue : task.unitofmeasurement_id ? task.unitofmeasurement_id : unitMeasureSelector.options[0].value;
        },
    };
})();

// static data
let optionPriority = [
    { value: "1", label: "High" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Low" },
];



gantt.locale.labels.section_activity = "Activity Form";
gantt.locale.labels.section_priority = "Priority";
gantt.locale.labels.section_phase = "Phase";
gantt.locale.labels.section_custom = "";

gantt.config.grid_resize = true;

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
    { name: "custom", height: 30, map_to: "auto", type: "dropDownCustom", optionPriority: optionPriority, optionPhase: optionPhase, optionUnitMeasurement: optionUnitMeasurement },
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
    task.duration = task.duration;
    task.parent = task.parent;
    task.id = task.id;
    return true;
});

(function () {
    let modal;
    let editLinkId;

    function endPopup() {
        modal = null;
        editLinkId = null;
    }
    function cancelEditLink() {
        endPopup();
    }

    function deleteLinkHandle() {
        isLinkDelete = true;
        gantt.deleteLink(editLinkId);
        endPopup();
    }

    gantt.attachEvent("onLinkDblClick", function (id, e) {
        editLinkId = id;
        var link = gantt.getLink(id);
        var linkTitle = gantt.getTask(link.source).text + " -> " +
            gantt.getTask(link.target).text;

        modal = gantt.modalbox({
            // title: linkTitle,
            text: "<div>" +
                "<label>Do you want to delete Link : " +
                `<span class='font-bold'>${linkTitle}</span>` +
                "? </label>" +
                "</div>",
            buttons: [
                { label: "Cancel", value: "cancel" },
                { label: "Delete", value: "delete" }
            ],
            width: "500px",
            callback: function (result) {
                switch (result) {
                    case "cancel":
                        cancelEditLink();
                        break;

                    case "delete":
                        deleteLinkHandle();
                        break;
                }
            }
        });
        return false;
    });
})();


let previousDataGanttLength;

function AppGantt(props) {
    console.log("Console Log AppGantt Rendered");
    const { title, dataGantt, dataPhase, dataLink, dataUnitMeasure, ganttID, isReadOnly, isShowAddColumn, isShowListGantt, projectID } = props;

    let previousDataLinkLength;

    const handleParse = () => {
        console.log("handleParse");
    
        const testData = [];
        const testLinks = [];

        dataGantt.map((activity) => {
            // console.log("is activity data?", activity);
            const startDate = subStringDate(activity.start_time);
            const endDate = subStringDate(activity.end_time);

            testData.push({
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
                unitofmeasurement_id: activity.unitofmeasurement_id,
            });

        });

        dataLink.map((link) => {
                testLinks.push({
                    id: String(link.ID),
                    source: link.source,
                    target: link.target,
                    type: link.type,
                });
        });
        console.log("Handle Parse Data", "testData", testData, "testLinks", testLinks);
        gantt.parse({data: testData, links: testLinks});
    }

    isShowAddColumn
        ? !gantt.config.columns.some(col => col.name === 'add') && gantt.config.columns.push({ name: "add", width: 44, grid: true }) && gantt.render()
        : gantt.config.columns.some(col => col.name === 'add') && gantt.config.columns.splice(gantt.config.columns.findIndex(col => col.name === 'add'), 1) && gantt.render()

    const isUpdated = useRef(false);
    const isAdd = useRef(false);
    const isDelete = useRef(false);
    // const isLinkDelete = useRef(false);
    const isLinkAdd = useRef(false);
    const isDrag = useRef(false);

    const [addActivity, { data: addActivityData, error: addActivityError }] =
        useMutation(ADD_ACTIVITY, {
            refetchQueries: [
                {
                    query: GET_ACTIVITY_GANTT_ID,
                    variables: { gantt_id: ganttID, sort: "ID asc" }
                },
            ],
            onCompleted: () => { console.log("Refetch addActivity Completed") }
        }
        );
    const [updateActivity, { data: updateActivityData, error: updateActivityError }] =
        useMutation(UPDATE_ACTIVITY, {
            refetchQueries: [
                {
                    query: GET_ACTIVITY_GANTT_ID,
                    variables: { gantt_id: ganttID, sort: "ID asc" }
                }
            ],
            onCompleted: () => { console.log("Refetch updateActivity Completed") }
        });
    const [deleteActivity, { data: deleteActivityData, error: deleteActivityError }] =
        useMutation(DELETE_ACTIVITY, {
            refetchQueries: [
                {
                    query: GET_ACTIVITY_GANTT_ID,
                    variables: { gantt_id: ganttID, sort: "ID asc" }
                }
            ],
            onCompleted: () => { console.log("Refetch deleteActivity Completed") }
        });

    const createActivity = (parent_id, gantt_id, name, description, start_time, end_time, weight_percentage, progress_percentage, priority, cost_plan, cost_actual, material_cost_plan, material_cost_actual, tool_cost_plan, tool_cost_actual, human_cost_plan, human_cost_actual, activity_type, phase_id, unitofmeasurement_id) => {
        addActivity({
            variables: {
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
        if (addActivityError) {
            console.log("addActivityError", JSON.stringify(addGanttError));
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
        updateActivity({
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

        if (updateActivityError) {
            console.log("updateActivityError", JSON.stringify(updateActivityError));
        }
    };

    const removeActivity = (id) => {
        deleteActivity({
            variables: {
                id: id,
            },
        });

        if (deleteActivityError) {
            console.log(JSON.stringify("deleteActivityError", deleteActivityError));
        }
    };

    const [addActivityLink, { data: addActivityLinkData, error: addActivityLinkError }] =
        useMutation(ADD_ACTIVITY_LINK, {
            refetchQueries: [
                {
                    query: GET_LINK_DATA,
                }
            ],
            onCompleted: () => { console.log("Refetch addActivityLink Completed") }
        }
        );
    // No use UpdateActivityLink for now only add and delete
    // const [updateActivityLink, { data: updateActivityLinkData, error: updateActivityLinkError }] =
    //     useMutation(UPDATE_ACTIVITY_LINK, {
    //         refetchQueries: [
    //             {
    //                 query: GET_LINK_DATA,
    //             }
    //         ],
    //         onCompleted: () => { console.log("Refetch updateActivityLink Completed") }
    //     });
    const [deleteActivityLink, { data: deleteActivityLinkData, error: deleteActivityLinkError }] =
        useMutation(DELETE_ACTIVITY_LINK, {
            refetchQueries: [
                {
                    query: GET_LINK_DATA,
                }
            ],
            awaitRefetchQueries: true,
            onCompleted: () => { gantt.clearAll(); handleParse(); console.log("Refetch deleteActivityLink Completed") }
        });

    const createLink = (source, target, type) => {
        addActivityLink({
            variables: {
                source: source,
                target: target,
                type: type,
                gantt_id: parseInt(ganttID),
            },
        });

        if (addActivityLinkError) {
            console.log("addActivityLinkError", JSON.stringify(addActivityLinkError));
        }
    };

    // No use UpdateActivityLink for now only add and delete
    // const changeLink = (id, source, target, type) => {
    //     updateActivityLink({
    //         variables: {
    //             id: id,
    //             source: source,
    //             target: target,
    //             type: type,
    //             gantt_id: parseInt(ganttID),
    //         },
    //     });

    //     if (updateActivityLinkError) {
    //         console.log("updateActivityLinkError", JSON.stringify(updateActivityLinkError));
    //     }
    // };

    const removeLink = (id) => {
        console.log("remove link", typeof id, id);
        deleteActivityLink({
            variables: {
                id: id,
            },
        });

        // window.location.reload();

        if (deleteActivityLinkError) {
            console.log("deleteActivityLinkError", JSON.stringify(deleteActivityLinkError));
        }
    };


    gantt.attachEvent("onBeforeTaskChanged", function (id, mode, task) {
        // fires after the user has pressed the mouse button and started dragging, but before dhtmlxGantt starts the drag-and-drop operation

        //any custom logic here
        console.log("onBeforeTaskChanged", id, mode, task);
        // isAdd = false;
        isDrag.current = true;
        return true;
    });

    gantt.attachEvent("onAfterTaskDrag", function (id, mode, e) {
        //any custom logic here
        if (isDrag.current === true) {
            isDrag.current = false;
            console.log("onAfterTaskDrag True", id, mode, e);
            const item = gantt.getTask(id);
            const name = item.name;
            const description = item.description;
            const start_time = item.start_date;
            const end_time = item.end_date;
            const parent_id = item.parent;
            const gantt_id = ganttID;
            const weight_percentage = item.weight_percentage;
            const progress_percentage = item.progress * 100;
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
            const unitofmeasurement_id = item.unitofmeasurement_id;

            changeActivity(
                String(id),
                parseInt(parent_id),
                parseInt(gantt_id),
                name,
                description,
                start_time,
                end_time,
                parseFloat(weight_percentage),
                Math.round(progress_percentage * 1e2) / 1e2,
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
        } else {
            console.log("onAfterTaskDrag False", id, mode, e);
        }
    });

    // dhtmlx save button add
    gantt.attachEvent("onAfterTaskAdd", (id, item) => {
        // console.log("onAfterTaskAdd", id, item);
        if (isAdd.current === true) {
            isAdd.current = false;
            const name = item.name;
            const description = item.description;
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
            const unitofmeasurement_id = item.unitofmeasurement_id;

            gantt.deleteTask(id);

            createActivity(
                parseFloat(parent_id),
                parseFloat(gantt_id),
                name,
                description,
                start_time,
                end_time,
                parseFloat(weight_percentage),
                Math.round(progress_percentage * 1e2) / 1e2,
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
                parseFloat(phase_id),
                parseInt(unitofmeasurement_id)
            );

            gantt.render();
            console.log("Console Log Graphql Add Activity");
        }

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
        // console.log("typeof onAfterTaskUpdate", id, typeof item.start_date, item.start_date);
        if (isUpdated.current === true) {
            isUpdated.current = false;
            const name = item.name;
            const description = item.description;
            const start_time = item.start_date;
            const end_time = item.end_date;
            const parent_id = item.parent;
            const gantt_id = ganttID;
            const weight_percentage = item.weight_percentage;
            const progress_percentage = item.progress * 100;
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
            const unitofmeasurement_id = item.unitofmeasurement_id;

            changeActivity(
                String(id),
                parseInt(parent_id),
                parseInt(gantt_id),
                name,
                description,
                start_time,
                end_time,
                parseFloat(weight_percentage),
                Math.round(progress_percentage * 1e2) / 1e2,
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

            console.log("Console Log Graphql Update Activity");
        }
    });

    // dhtmlx delete button
    gantt.attachEvent("onAfterTaskDelete", (id) => {
        if (isDelete.current === true) {
            isDelete.current = false;
            removeActivity(String(id));
        }
    });

    gantt.attachEvent("onLinkCreated", function (link) {
        // your code here
        console.log("onlinkcreated", link);
        isLinkAdd.current = true;
        return true;
    });

    gantt.attachEvent("onAfterLinkAdd", function (id, item) {
        //any custom logic here
        if (isLinkAdd.current === true) {
            console.log("islinkadd inside onafterlinkadd", isLinkAdd);
            console.log("onAfterLinkAdd", id, item);
            const source = item.source;
            const target = item.target;
            const type = item.type;

            gantt.deleteLink(id);

            createLink(
                source,
                target,
                type,
            );

            isLinkAdd.current = false;
            console.log("Console Log Graphql Add Activity Link");
        }
    });

    gantt.attachEvent("onLinkClick", function (id, e) {
        // Your code here
        console.log("onLinkClick", id, e);
        let link = gantt.getLink(id);
        console.log("when link clicked", link);
    });

    // cant use this because onafterlinkadd need to deletelink first (the link that use id auto gantt)
    // gantt.attachEvent("onBeforeLinkDelete", function(id,item){
    //     //any custom logic here
    //     console.log("onBeforeLinkDelete", id, item);
    //     isLinkDelete.current = true;
    //     return true;
    // });

    gantt.attachEvent("onAfterLinkDelete", function (id, item) {
        //any custom logic here
        console.log("uslinkdelete", isLinkDelete)
        console.log("onAfterLinkDelete", id, item);
        if (isLinkDelete === true && id !== null) {
            isLinkDelete = false;
            removeLink(id);
        }
    });

    function subStringDate(str) {
        return str.substring(0, 10);
    }

    function MappingPhase() {
        // if optionPhase.length < 0 {
        if (optionPhase.length === 0 && dataPhase.length > 0 || optionPhase.length === null) {
            console.log("masuk mapping phase", dataPhase);
            const arrayPhase = dataPhase.map((phase) => {
                // console.log("is activity data?", activity);
                optionPhase.push({
                    value: phase.ID,
                    label: phase.name,
                });
            });
        }
    }

    function MappingUnitofMeasurement() {
        if (optionUnitMeasurement.length === 0 && dataUnitMeasure.length > 0) {
            console.log("masuk mapping uom", dataUnitMeasure);
            const arrayUOM = dataUnitMeasure.map((uom) => {
                // console.log("is activity data?", activity);
                optionUnitMeasurement.push({
                    value: uom.ID,
                    label: uom.name,
                });
            });
        }
    }

    function MappingLink() {
        console.log("is link data?", dataLink.length);
        if (dataLink.length !== previousDataLinkLength) {
            previousDataLinkLength = dataLink.length;
            const dataLinkMap = dataLink.map((link) => {

                // console.log("is link data?", typeof link.type, link.type);

                if (!gantt.isLinkExists(link.ID)) {
                    gantt.addLink({
                        id: String(link.ID),
                        source: link.source,
                        target: link.target,
                        type: link.type,
                    });
                }
            });
            if (dataLinkMap.length === dataLink.length) {
                console.log("masuk render");
                gantt.render();
            }
        }
    }

    // mapping data
    function MappingData() {
        console.log("is dataGantt?", dataGantt.length);
        if (dataGantt.length !== previousDataGanttLength) {
            previousDataGanttLength = dataGantt.length;
            const dataActivity = dataGantt.map((activity) => {
                // console.log("is activity data?", activity);
                const startDate = subStringDate(activity.start_time);
                const endDate = subStringDate(activity.end_time);

                gantt.addTask({
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
                    unitofmeasurement_id: activity.unitofmeasurement_id,
                });

            });
            if (dataActivity.length === dataGantt.length) {
                gantt.render();
            }
        }
    }

    const [currentZoom, setCurrentZoom] = useState('Days');

    const handleZoomChange = (zoom) => {
        setCurrentZoom(zoom);
    };

    return (
        <div className="py-6 bg-white px-12 rounded-xl shadow-lg h-full">
            {/* fill the height */}
            {/* <div className="h-50%"> */}
            <div className="h-full">
                {/* <div className="h-4/5"> */}
                {
                    isShowListGantt ? (
                        <div className="py-2 px-4 flex justify-between items-center align-middle">
                            <p className="text-md">{title}</p>
                            <div className="px-4 flex items-center align-right">
                                {console.log("BRIAN", typeof projectID, projectID)}
                                <ListboxGanttProjectDashboard projectID={String(projectID)} />
                            </div>
                        </div>
                    ) : null

                }
                {/* <div className="py-1 px-4 h-full">{MappingData()}</div> */}
                <div className="zoom-bar px-3 flex justify-between">
                    <Toolbar
                        zoom={currentZoom}
                        onZoomChange={handleZoomChange}
                    />
                    {/* <button className="border-[#D9D9D9] border-solid rounded border-2 px-3 hover:bg-[#B39DDB]" onClick={handleParse}>Parse Gantt</button> */}
                    {/* <button className="border-[#D9D9D9] border-solid rounded border-2 px-3 hover:bg-[#B39DDB]" onClick={handleRender}>Render Gantt</button> */}
                    {/* <button className="border-[#D9D9D9] border-solid rounded border-2 px-3 hover:bg-[#B39DDB]" onClick={handleClearAll}>Clear Gantt</button> */}
                </div>
                <div className="py-1 px-4 h-5/6">
                    <div className="h-full">
                        {MappingData()}
                        {MappingLink()}
                        {MappingPhase()}
                        {MappingUnitofMeasurement()}
                        <Gantt zoom={currentZoom} isReadOnly={isReadOnly} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppGantt;
