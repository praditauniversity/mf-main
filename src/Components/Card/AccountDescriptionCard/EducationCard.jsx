import React from "react";
import { IconEdit } from "../../Icons/icon";

const EducationCard = () => {
    return (
        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div className="pb-5 border-b-2">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">Education</p>
                    <button><IconEdit /></button>
                </div>
            </div>

            <div className="py-5">
                <div className="grid grid-cols-18">
                    <div className="col-span-18">

                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">2014 - 2017</p>
                                <p className="text-xs opacity-70">Master Degree</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">Master Degree in Computer Application</p>
                                <p className="text-xs opacity-70">University of Oxford, England</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">2011 - 2013</p>
                                <p className="text-xs opacity-70">Bachelor</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">Bachelor Degree in Computer Engineering</p>
                                <p className="text-xs opacity-70">Imperial College London</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">2009 - 2012</p>
                                <p className="text-xs opacity-70">School</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">Higher Secondary Education</p>
                                <p className="text-xs opacity-70">School of London, England</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EducationCard;