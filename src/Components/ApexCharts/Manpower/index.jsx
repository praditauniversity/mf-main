import React, { useState } from "react";
import LineChart from "./chart.jsx";

export default class ManpowerCard extends React.Component {
    render() {
        return (
            <div className="rounded-xl shadow-sm bg-white py-6 px-12">
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <div className="flex justify-start">
                            <p className="text-sm ">Manpower</p>
                            {/* <p className="text-sm ml-1">By Duration</p> */}
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm ">+2.45%</p>
                        </div>
                    </div>
                    <div className="pt-1 pb-4 flex justify-start">
                        <p className="text-xl font-semibold ">2.597</p>
                        <p className="text-xs opacity-70 align-text-bottom">Human</p>
                    </div>
                </div>
                <div className="py-4">
                    <LineChart />
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