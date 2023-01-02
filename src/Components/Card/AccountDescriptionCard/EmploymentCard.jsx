import React from "react";
import { IconEdit } from "../../Icons/icon";

const EmploymentCard = () => {
    return (
        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div className="pb-5 border-b-2">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">Employment</p>
                    <button><IconEdit /></button>
                </div>
            </div>

            <div className="py-5">
                <div className="grid grid-cols-18">
                    <div className="col-span-18">

                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">Current</p>
                                <p className="text-xs opacity-70">Senior</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">Senior UI/UX Designer</p>
                                <p className="text-xs opacity-70">Google, California, USA</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">2017 - 2019</p>
                                <p className="text-xs opacity-70">Junior</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">Trainee cum Project Manager</p>
                                <p className="text-xs opacity-70">Microsoft, Tx, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EmploymentCard;