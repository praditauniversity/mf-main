import React, { useState } from "react";
import ListboxTime from "../../Listbox/ListboxTime/index.jsx";
import DualColumnChart from "./chart.jsx";

export default class ProjectProgressOverviewCard extends React.Component {
    render() {
        return (
            <div className="rounded-xl shadow-lg bg-white py-6 px-12">
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <p className="text-lg place-self-center font-semibold">Project Progress Overview</p>
                    </div>
                    <div className="pt-1 pb-4 flex justify-start">
                        <p className="text-xs opacity-70 align-text-bottom place-self-center">Overview of all project progress</p>
                    </div>
                </div>
                <div className="py-4">
                    <DualColumnChart />
                </div>
            </div>
        );
    }
}