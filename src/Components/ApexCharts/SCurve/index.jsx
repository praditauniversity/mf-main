import React, { useState } from "react";
import ListboxBy from "../../Listbox/ListboxBy/index.jsx";
import ListboxTime from "../../Listbox/ListboxTime/index.jsx";
import FutureDetailRevenue from "../../Modal/FutureUpdateModal/DetailRevenue/DetailRevenue.jsx";
import DualLineChart from "./chart.jsx";

export default class SCurveCard extends React.Component {
    render() {
        return (
            <div className="rounded-xl shadow-lg bg-white py-6 px-12">
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <div className="flex justify-start">
                            <p className="text-sm place-self-center">SCurve</p>
                            <div className="mb-1">
                                <ListboxBy />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="mb-1">
                                <ListboxTime />
                            </div>
                        </div>
                    </div>
                    <div className="pt-1 pb-4 flex justify-start">
                        <p className="text-xl font-semibold ">45%</p>
                        <p className="text-xs opacity-70 align-text-bottom">02%</p>
                    </div>
                </div>
                <div className="py-4">
                    <DualLineChart />
                </div>
                <div className="py-4 flex justify-end">
                    <FutureDetailRevenue/>
                </div>
            </div>
        );
    }
}