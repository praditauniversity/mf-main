import React, { useState } from "react";
import ListboxTime from "../../Listbox/ListboxTime/index.jsx";
import RadialChart from "./chart.jsx";
import FutureDetailProjectProgress from "../../Modal/FutureUpdateModal/DetailProjectProgress/DetailProjectProgress.jsx";

export default class ProjectProgressCard extends React.Component {
    //still static data
    render() {
        return (
            <div className="rounded-xl shadow-lg bg-white py-6 px-12">
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <p className="text-sm place-self-center">Project Progress</p>
                        <div className="mb-1">
                            <ListboxTime />
                        </div>
                    </div>
                    <div className="pt-1 pb-4 flex justify-start">
                        <p className="text-xl font-semibold place-self-center">66{/* <ProgressPercentage value={savedOption}/>*/}</p>
                        <p className="text-xs opacity-70 align-text-bottom place-self-center">00 %</p>
                    </div>
                </div>
                <div className="py-4">
                    <RadialChart />
                </div>
                <div className="py-4 flex justify-end">
                    <FutureDetailProjectProgress />
                </div>
            </div>
        );
    }
}