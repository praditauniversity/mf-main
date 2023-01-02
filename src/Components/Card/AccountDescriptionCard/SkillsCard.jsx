import React from "react";
import { IconEdit } from "../../Icons/icon";

const SkillsCard = () => {
    return (
        <div className="rounded-xl shadow-lg bg-white py-8 px-12">

            <div className="pb-5 border-b-2">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">Skills</p>
                    <button><IconEdit /></button>
                </div>
            </div>

            <div className="py-5">
                <div className="grid grid-cols-18">
                    <div className="col-span-18">

                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">HTML</p>
                                <p className="text-xs opacity-70">Expert</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">PHP</p>
                                <p className="text-xs opacity-70">Expert</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">Database</p>
                                <p className="text-xs opacity-70">Expert</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">React</p>
                                <p className="text-xs opacity-70">Intermediete</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">Golang</p>
                                <p className="text-xs opacity-70">Expert</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">Java</p>
                                <p className="text-xs opacity-70">Expert</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-15 py-2">
                            <div className="col-span-3">
                                <p className="text-sm">C#</p>
                                <p className="text-xs opacity-70">Expert</p>
                            </div>
                            <div className="col-span-12">
                            <p className="text-sm">Python</p>
                                <p className="text-xs opacity-70">Expert</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SkillsCard;