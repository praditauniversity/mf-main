import React, { Component, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_GANTT_DATA } from "../GraphQl/Queries";
import {
  ADD_GANTT,
  UPDATE_GANTT,
  DELETE_GANTT,
} from "../../Middleware/GraphQL/mutations";
import Gantt from "./Gantt";

// import gantt module
import { gantt } from "dhtmlx-gantt";

// import data
import { useRef } from "react";

// create custom column
gantt.config.columns = [
  { name: "name", label: "Name", tree: true, width: 200, resize: true },
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
      return obj.progress;
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
    focus: (node) => {},
  };
  gantt.form_blocks.my_editor = {
    render: function (sns) {
      return (
        "<div class='dhx_cal_ltext px-4' style='height:px;'>" +
        "Project Name" +
        "<br/>" +
        "<input class='editor_project border-solid border-2 py-1 px-2' type='text' name='description'>" +
        "<br/>" +
        "Description" +
        "<br/>" +
        "<input class='editor_description border-solid border-2 py-1 px-2' type='text'>" +
        "</div>"
      );
    },
    set_value: function (node, value, task) {
      node.querySelector(".editor_project").value = task.name || "";
      node.querySelector(".editor_description").value = task.description || "";
    },
    get_value: function (node, task) {
      task.description = node.querySelector(".editor_description").value;
      task.name = node.querySelector(".editor_project").value;
    },
    focus: function (node) {
      var a = node.querySelector(".editor_project");
      a.select();
      a.focus();
    },
  };
})();
gantt.config.lightbox.sections = [
  {
    name: "description",
    height: 200,
    map_to: "text",
    type: "my_editor",
    focus: true,
  },
  { name: "time", height: 72, type: "datepicker", map_to: "auto" },
  { name: "test", height: 30, map_to: "auto", type: "my_form" },
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

function AppGantt(props) {
  console.log("RENDER");
  const { title } = props;
  const { error, loading, data } = useQuery(GET_GANTT_DATA);
  const [ganttdata, setGantt] = useState([]);
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

  useEffect(() => {
    if (data) {
      console.log("Data Ready gantt");
      setGantt(data.gantt.data);
      console.log(data.gantt.data);
    } else {
      console.log("No data gantt");
    }
    console.log("USE EFFECT gantt");
  }, [data]);

  // setGantt(data.gantt.data);

  function subStringDate(str) {
    return str.substring(0, 10);
  }

  // render elemen
  function renderelemen() {
    const dataData = ganttdata.map((gantt) => {
      const startDate = subStringDate(gantt.start_time);
      const endDate = subStringDate(gantt.end_time);

      ganttTask.data.push({
        id: gantt.ID,
        name: gantt.name,
        description: gantt.description,
        users: gantt.user_id,
        start_date: startDate,
        end_date: endDate,
      });
    });

    if (dataData.length > 0) {
      return (
        <div className="h-full">
          {console.log("render elemen", ganttTask)}
          <Gantt tasks={ganttTask} action={handler} />
        </div>
      );
    }
  }

  return (
    <div className="bg-white py-6 px-12 rounded-xl shadow-sm h-full">
      <div className="h-full">
        <div className="py-5 px-4">
          <p className="text-md">{title}</p>
        </div>
        {console.log("before renderelemen should be called")}
        <div className="py-1 px-4 h-full">{renderelemen()}</div>
        {console.log("after renderelemen should be called")}
      </div>
    </div>
  );
}

export default AppGantt;
