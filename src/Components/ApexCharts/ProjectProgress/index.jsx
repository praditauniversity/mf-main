import React, { useState } from "react";
import DropdownTime from "../../DropdownTime/index.jsx";
import ListboxTime from "../../Listbox/ListboxTime/index.jsx";
import RadialChart from "./chart.jsx";

export default class ProjectProgressCard extends React.Component {
    render() {
        return (
            <div className="rounded-xl shadow-lg bg-white py-6 px-12">
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <p className="text-sm place-self-center">Project Progress</p>
                        {/* <p className="text-sm ">Last Month</p> */}
                        {/* <DropdownTime /> */}
                        <div className="mb-1">
                            <ListboxTime />
                        </div>
                    </div>
                    <div className="pt-1 pb-4 flex justify-start">
                        <p className="text-xl font-semibold place-self-center">71</p>
                        <p className="text-xs opacity-70 align-text-bottom place-self-center">00 %</p>
                    </div>
                </div>

                {/* disini harusnya radial chart */}
                <div className="py-4">
                    <RadialChart />
                </div>
                <div className="py-4 flex justify-end">
                    <button className="font-semibold text-sm text-primary">
                        Detail Project Overview
                    </button>
                </div>
            </div>
        );
    }
}