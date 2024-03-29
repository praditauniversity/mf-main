import React, { useState } from "react";
import DonutChartProject from "./chart.jsx";

export default class TaskOverviewCardProject extends React.Component {
    render() {
        return (
            <div className="rounded-xl shadow-lg bg-white py-6 px-12">
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <p className="text-sm ">Task Overview Project</p>
                    </div>
                </div>
                <div className="py-4">
                    <DonutChartProject/>
                </div>
            </div>
        );
    }
}