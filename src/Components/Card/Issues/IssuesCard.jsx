import React from "react";
import FutureUpdateDeleteText from "../../Modal/FutureUpdateModal/Edit & Delete text/FutureUpdateDeleteText";
import FutureUpdateEditText from "../../Modal/FutureUpdateModal/Edit & Delete text/FutureUpdateEditsText";
import FutureUpdateViewAllIssues from "../../Modal/FutureUpdateModal/ViewAllIssues/FutureUpdateViewAllIssues";

const IssuesCard = () => {

    return (
        <div className="rounded-xl shadow-lg bg-white">
            <div>
                <div className="pt-8 pb-8 pl-12 pr-12 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-lg font-semibold ">Issues</p>
                    </div>
                </div>
            </div>
            <div className="h-96 border-t-2 border-b-2">
                <div className="pt-6 pb-6 pl-12 pr-12">
                    <div className="pt-4">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <p className="text-base font-semibold ">Solar Panel Smart Lab</p>
                            </div>
                            <div className="flex justify-end">
                                <div className="dropdown dropdown-button dropdown-end">
                                    <button tabIndex={0} className="text-base font-black">:</button>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                        <li>
                                            <FutureUpdateEditText />
                                        </li>
                                        <li>
                                            <FutureUpdateDeleteText />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs opacity-70 align-text-bottom text-error">Todo</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <p className="text-base font-semibold ">Winter Wonderland</p>
                            </div>
                            <div className="flex justify-end">
                                <div className="dropdown dropdown-button dropdown-end">
                                    <button tabIndex={0} className="text-base font-black">:</button>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                        <li>
                                            <FutureUpdateEditText />
                                        </li>
                                        <li>
                                            <FutureUpdateDeleteText />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs opacity-70 align-text-bottom text-error">Todo</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <p className="text-base font-semibold ">Reverie Product...</p>
                            </div>
                            <div className="flex justify-end">
                                <div className="dropdown dropdown-button dropdown-end">
                                    <button tabIndex={0} className="text-base font-black">:</button>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                        <li>
                                            <FutureUpdateEditText />
                                        </li>
                                        <li>
                                            <FutureUpdateDeleteText />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs opacity-70 align-text-bottom text-secondary">In Progress</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <p className="text-base font-semibold ">Meraki Development</p>
                            </div>
                            <div className="flex justify-end">
                                <div className="dropdown dropdown-button dropdown-end">
                                    <button tabIndex={0} className="text-base font-black">:</button>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                        <li>
                                            <FutureUpdateEditText />
                                        </li>
                                        <li>
                                            <FutureUpdateDeleteText />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs opacity-70 align-text-bottom text-secondary">In Progress</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-8 pb-8 pl-12 pr-12 flex justify-end">
                <FutureUpdateViewAllIssues/>
            </div>
        </div>
    )

}

export default IssuesCard;