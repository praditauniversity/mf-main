import React from "react";
import { IconPlus, IconEdit, IconDelete, IconList } from "../../Icons/icon";
import DailyReportList from "./DaiilyReportList";
import '../../../Assets/svgbutton/svgbutton.css'
import AddModalDailyReport from "../../Modal/DailyReportModal/AddModal/AddModal";

const DailyReportCard = (props) => {
    const { icon } = props;
    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4">
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-xl font-semibold px-2">Daily Report</p>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex justify-between">
                            <div className="px-1" ><AddModalDailyReport /></div>
                            <button className="px-1" id="icon"><IconEdit /></button>
                            <button className="px-1" id="icon"><IconDelete /></button>
                        </div>
                    </div>
                </div>

                <div className="px-36">
                    <div className="grid grid-cols-18">
                        <div className="pt-6 pb-4 col-span-18">
                            <div className="grid grid-cols-15">
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Project Name</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">Project Anomaly</p>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Customer</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">Jaya Gedung Group</p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Report Number</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">123</p>
                                    </div>
                                </div>
                            </div>

                            <div className="py-8 grid grid-cols-15">
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Project Manager</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">Jhon Doe</p>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Customer Contact</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">812204166697</p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Report Date</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">14/08/2022</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-6 grid grid-cols-15">
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Location</p>
                                </div>
                                    <div>
                                        <p className="text-base font-semibold">Merak Raya</p>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">General Project Status</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">In Progress</p>
                                    </div>
                                </div>
                                {/* <div className="col-span-3">
                                    <div className="pb-2">
                                        <p className="text-sm font-semibold opacity-70">Weather Condition</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold">Sunny, Clear, mid-70s</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="pb-3 grid grid-cols-18">
                        <div className="col-span-18">
                            <div className="py-2 w-full bg-grey-light text-center">
                                <p className="text-sm font-semibold opacity-70">Work Log</p>
                            </div>
                        </div>

                        <div className="col-span-18 py-2">
                            <DailyReportList />
                        </div>

                        <div className="w-full bg-grey-light text-center col-span-18 py-2 my-4 mt-6">
                            <p className="text-sm font-semibold opacity-70">Equipment</p>
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <div className="">
                            {/* <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Objectives</p>
                            </div> */}
                            <div>
                                <div className="flex justify-start py-1">
                                    <div className="pr-1 pt-2"><IconList /></div>
                                    <p className="text-base font-semibold">Requirement Gathering for Anomaly Application</p>
                                </div>
                                <div className="flex justify-start py-1">
                                    <div className="pr-1 pt-2"><IconList /></div>
                                    <p className="text-base font-semibold">Prototype and designing Anomaly Application for multiplatform</p>
                                </div>
                                <div className="flex justify-start py-1">
                                    <div className="pr-1 pt-2"><IconList /></div>
                                    <p className="text-base font-semibold">Implementation and building Anomaly Application</p>
                                </div>
                                <div className="flex justify-start py-1">
                                    <div className="pr-1 pt-2"><IconList /></div>
                                    <p className="text-base font-semibold">Testing Anomaly Application</p>
                                </div>
                                <div className="flex justify-start py-1">
                                    <div className="pr-1 pt-2"><IconList /></div>
                                    <p className="text-base font-semibold">Maintenance Anomaly Application</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="py-4">
            </div>
            <div className="py-4 flex justify-end">
                <button className="font-semibold text-sm text-primary">
                    Detail Project Overview
                </button>
            </div> */}
        </div>
    );
};

export default DailyReportCard;
