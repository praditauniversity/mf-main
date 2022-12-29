import React from "react";
import MinutesofMeetingList from "./MinutesofMeetingList";
import { IconPlus, IconEdit, IconDelete, IconFilter } from "../../Icons/icon";

const MinutesofMeetingCard = (props) => {
    const { icon } = props;
    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4">
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-xl font-semibold px-2">Minutes of Meeting</p>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex justify-between">
                            <button className="px-1"><IconPlus /></button>
                            <button className="px-1"><IconEdit /></button>
                            <button className="px-1"><IconDelete /></button>
                        </div>
                    </div>
                </div>
                <div className="px-36">
                    <div className="py-6 flex justify-between">
                        <div>
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Name</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold">Project Anomaly</p>
                            </div>
                        </div>
                        <div>
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Manager</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold">Jhon Doe</p>
                            </div>
                        </div>
                        <div>
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Customer</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold">Jaya Gedung Group</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-6">
                        <div>
                            <div className="py-2 w-full bg-grey-light text-center">
                                <p className="text-sm font-semibold opacity-70">Meeting List</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="content-end items-end text-right">
                            <div className="flex justify-end">
                                <p className="text-sm font-semibold opacity-70">Search and feature here</p>
                                <button className="px-1"><IconFilter /></button>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="col-span-15">
                            <MinutesofMeetingList />
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="content-end items-end bg-grey-light">
                            <p className="text-sm font-semibold opacity-70">paging should here</p>
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

export default MinutesofMeetingCard;
