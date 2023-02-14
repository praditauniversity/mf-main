import React, { useState } from "react";
import DetailProjectBy from "../../Modal/FutureUpdateModal/DetailProjecyBy/DetailProjectBy.jsx";
import DonutChart2 from "./chart.jsx";

export default class ProjectByCard extends React.Component {
    render() {
        return (
            <div className="rounded-xl shadow-lg bg-white py-6 px-12">
                <useStatediv>
                    <div className="pt-4 pb-0 flex justify-between">
                        <div className="flex justify-start">
                            <p className="text-sm ">Project</p>
                            <p className="text-sm ml-1">By Financial Health</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-white ">+2.45%</p>
                        </div>
                    </div>
                    <div className="pt-1 pb-4 flex justify-start">
                        <p className="text-xl font-semibold text-white">2.597</p>
                        <p className="text-xs opacity-70 align-text-bottom text-white">Human</p>
                    </div>
                </useStatediv>
                <div className="py-4">
                    <DonutChart2 />
                </div>
                <div className="py-4 flex justify-end">
                    <DetailProjectBy/>
                </div>
            </div>
        );
    }
}