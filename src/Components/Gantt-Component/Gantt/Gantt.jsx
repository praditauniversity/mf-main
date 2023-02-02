import React, { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "./Gantt.css";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

// Gantt Plugins
gantt.plugins({
  marker: true,
  drag_timeline: true,
  critical_path: true,
  auto_scheduling: true,
  fullscreen: true
});

var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
var markerId = gantt.addMarker({
  start_date: new Date(), //a Date object that sets the marker's date
  css: "today", //a CSS class applied to the marker
  text: "Today", //the marker title
  title: dateToStr(new Date()) // the marker's tooltip
});


// Gantt Config

gantt.config.reorder_grid_columns = true;
gantt.config.keep_grid_width = true;
gantt.config.resize_rows = true;
gantt.config.grid_resize = true;
gantt.config.grid_width = 500;
// gantt.config.drag_progress = false;

gantt.config.autoscroll = true;
gantt.config.scroll_size = 30;
gantt.config.autowidth = false;
gantt.config.sort = true;

gantt.config.min_grid_column_width = 100;

gantt.config.layout = {
css: "gantt_container",
cols: [
  {
    width: 400,
    min_width: 300,
    rows: [
      { view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer" },
      { view: "scrollbar", id: "gridScroll", group: "horizontal" }
    ]
  },
  { resizer: true, width: 3 },
  {
    rows: [
      { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer", scrollable: true},
      { view: "scrollbar", id: "scrollHor", group: "horizontal" }
    ]
  },
  { view: "scrollbar", id: "scrollVer" }
]
};

export default class Gantt extends Component {
  constructor(props) {
    super(props);
    this.initZoom();
  }

  initZoom() {
    gantt.ext.zoom.init({
      levels: [
        {
          name: 'Hours',
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%d %M' },
            { unit: 'hour', step: 1, format: '%H' }
          ]
        },
        {
          name: 'Days',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'week', step: 1, format: 'Week #%W' },
            { unit: 'day', step: 1, format: '%d %M' }
          ]
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: '%F' },
            { unit: 'week', step: 1, format: '#%W' }
          ]
        },
        {
          name: "Quarters",
          height: 50,
          min_column_width: 90,
          scales: [
            { unit: "month", step: 1, format: "%M" },
            {
              unit: "quarter", step: 1, format: function (date) {
                var dateToStr = gantt.date.date_to_str("%M");
                var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                return dateToStr(date) + " - " + dateToStr(endDate);
              }
            }
          ]
        },
        {
          name: "Years",
          scale_height: 50,
          min_column_width: 30,
          scales: [
            { unit: "year", step: 1, format: "%Y" }
          ]
        }
      ]
    });
  }

  setZoom(value) {
    gantt.ext.zoom.setLevel(value);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  // componentDidMount() {
  //   gantt.config.date_format = "%Y-%m-%d %H:%i";
  //   const { tasks } = this.props;
  //   gantt.config.open_tree_initially = true;
  //   gantt.config.lightbox.height = 670;
  //   // gantt.config.lightbox_additional_height = 6000;
  //   gantt.init(this.ganttContainer);
  //   gantt.config.readonly = this.props.isReadOnly;
  //   // gantt.config.height = "full";
  //   gantt.render();
  //   gantt.config.lightbox.width = 900;
  //   gantt.parse(tasks);
  //   // gantt.config.lightbox.css = "max-height: 600px; overflow-y: auto;";
  //   gantt.config.lightbox.css = "height: 700px;";
  //   // gantt.cal.area.css = "height: 600px; overflow-y: auto;";
  //   gantt.config.lightbox.height = 670;
  // }

  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    // const { tasks } = this.props;
    gantt.config.open_tree_initially = true;
    gantt.init(this.ganttContainer);
    gantt.config.readonly = this.props.isReadOnly;
    gantt.render();
    gantt.config.lightbox.width = 900;
    gantt.config.lightbox.height = 6700;
    // gantt.parse(tasks);
    gantt.config.lightbox.height = 6700;
  }

  componentWillUnmount() {
    gantt.clearAll();
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <div
        ref={(input) => {
          this.ganttContainer = input;
        }}
        className="h-full"
      />
    );
  }
}