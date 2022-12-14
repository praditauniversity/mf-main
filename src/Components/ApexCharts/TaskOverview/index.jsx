import React, { useState } from "react";
import DonutChart from "./chart.jsx";

export default class TaskOverviewCard extends React.Component {
    render() {
        return (
            <div className="rounded-xl shadow-lg bg-white py-6 px-12">
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <p className="text-sm ">Task Overview</p>
                    </div>
                </div>
                <div className="py-4">
                    <DonutChart />
                </div>
            </div>
        );
    }
}