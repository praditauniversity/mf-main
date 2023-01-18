import React, { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

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
            }
        ]
    });
}

  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    const { tasks } = this.props;
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  render() {
    return (
      <div
        ref={(input) => {
          this.ganttContainer = input;
        }}
        className="h-5/6"
      />
    );
  }
}