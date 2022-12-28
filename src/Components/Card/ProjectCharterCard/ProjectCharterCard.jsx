import React from "react";

const IconPlus = () => {
    return (
        <div className='plus-icon'>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="10" fill="#5E35B1" />
                <path d="M15 5C9.48 5 5 9.48 5 15C5 20.52 9.48 25 15 25C20.52 25 25 20.52 25 15C25 9.48 20.52 5 15 5ZM20 16H16V20H14V16H10V14H14V10H16V14H20V16Z" fill="#EDE7F6" />
            </svg>
        </div>
    )
}

const IconEdit = () => {
    return (
        <div className='edit-icon'>
            <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1716 6.57843L7.95321 15.7968C7.72845 16.0216 7.61607 16.1339 7.54454 16.2729C7.47301 16.4119 7.44689 16.5687 7.39463 16.8822L6.36508 23.0595C6.31262 23.3743 6.28639 23.5317 6.37736 23.6226C6.46833 23.7136 6.62571 23.6874 6.94048 23.6349L13.1178 22.6054C13.4313 22.5531 13.5881 22.527 13.7271 22.4555C13.8661 22.3839 13.9784 22.2716 14.2032 22.0468L23.4216 12.8284L23.4216 12.8284C24.7549 11.4951 25.4216 10.8284 25.4216 10C25.4216 9.17157 24.7549 8.50491 23.4216 7.17158L23.4216 7.17157L22.8284 6.57843C21.4951 5.24509 20.8284 4.57843 20 4.57843C19.1716 4.57843 18.5049 5.24509 17.1716 6.57843Z" fill="#673AB7" fill-opacity="0.3" />
                <path d="M15.5429 8.20711L7.95321 15.7968C7.72845 16.0216 7.61607 16.1339 7.54454 16.2729C7.47301 16.4119 7.44689 16.5687 7.39463 16.8822L6.36508 23.0595C6.31262 23.3743 6.28639 23.5317 6.37736 23.6226C6.46833 23.7136 6.62571 23.6874 6.94048 23.6349L13.1178 22.6054L13.1178 22.6054C13.4313 22.5531 13.5881 22.527 13.7271 22.4555C13.8661 22.3839 13.9784 22.2716 14.2032 22.0468L21.7929 14.4571C22.1262 14.1238 22.2929 13.9571 22.2929 13.75C22.2929 13.5429 22.1262 13.3762 21.7929 13.0429L16.9571 8.20711C16.6238 7.87377 16.4571 7.70711 16.25 7.70711C16.0429 7.70711 15.8762 7.87377 15.5429 8.20711Z" fill="#5E35B1" />
            </svg>
        </div>
    )
}

const IconDelete = () => {
    return (
        <div className='delete-icon'>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9.25C5 9.0143 5 8.89645 5.07322 8.82322C5.14645 8.75 5.2643 8.75 5.5 8.75H24.5C24.7357 8.75 24.8536 8.75 24.9268 8.82322C25 8.89645 25 9.0143 25 9.25V9.69098C25 9.84134 25 9.91651 24.9627 9.97692C24.9253 10.0373 24.8576 10.0712 24.7222 10.1389C23.639 10.6805 23.0974 10.9513 22.7987 11.4346C22.5 11.9179 22.5 12.5193 22.5 13.7221V21C22.5 22.8856 22.5 23.8284 21.9142 24.4142C21.3284 25 20.3856 25 18.5 25H11.5C9.61438 25 8.67157 25 8.08579 24.4142C7.5 23.8284 7.5 22.8856 7.5 21V13.7221C7.5 12.5193 7.5 11.9179 7.2013 11.4346C6.9026 10.9513 6.36099 10.6805 5.27778 10.1389C5.14238 10.0712 5.07467 10.0373 5.03734 9.97692C5 9.91651 5 9.84134 5 9.69098V9.25Z" fill="#673AB7" fill-opacity="0.3" />
                <path d="M12.5852 5.46324C12.7276 5.33034 13.0415 5.21291 13.4781 5.12915C13.9147 5.0454 14.4497 5 15 5C15.5503 5 16.0853 5.0454 16.5219 5.12915C16.9585 5.21291 17.2724 5.33034 17.4148 5.46324" stroke="#673AB7" stroke-linecap="round" />
                <rect x="17.5" y="13.75" width="1.25" height="7.5" rx="0.625" fill="#673AB7" />
                <rect x="11.25" y="13.75" width="1.25" height="7.5" rx="0.625" fill="#673AB7" />
            </svg>
        </div>
    )
}

const ProjectCharterCard = (props) => {
    const { icon } = props;
    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4">
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-xl font-semibold px-2">Project Charter</p>
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

                    <div className="py-6 flex justify-start">
                        <div>
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Description</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold">
                                    The purpose of this project is to build applications of anomaly detection include fraud detection in many case, i.e. financial transactions, fault detection in manufacturing, intrusion detection in a computer network, monitoring sensor readings in an aircraft, spotting potential risk or medical problems in health data, and predictive maintenance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="py-6 flex justify-start">
                        <div>
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Objectives</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold">Requirement Gathering for Anomaly Application</p>
                                <p className="text-base font-semibold">Prototype and designing Anomaly Application for multiplatform</p>
                                <p className="text-base font-semibold">Implementation and building Anomaly Application</p>
                                <p className="text-base font-semibold">Testing Anomaly Application</p>
                                <p className="text-base font-semibold">Maintenance Anomaly Application</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-6 flex justify-between">
                        <div>
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Project Team Members</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold">Jhon Doe, Jhon Doe</p>
                            </div>
                        </div>
                        <div>
                            <div className="pb-2 pr-96">
                                <p className="text-sm font-semibold opacity-70">Stakeholders</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold">Doe Jhon</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-6 flex justify-between">
                        <div>
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Participants</p>
                            </div>
                            <div>
                                <p className="text-base font-semibold">100</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-6 flex justify-between">
                        <div>
                            <div className="pb-2">
                                <p className="text-sm font-semibold opacity-70">Planned Budget</p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-base font-semibold pr-1">Rp.</p>
                                <p className="text-base font-semibold">350.000.000,00</p>
                            </div>
                        </div>
                        <div>
                            <div className="pb-2 pr-96">
                                <p className="text-sm font-semibold opacity-70">Actual Budget</p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-base font-semibold pr-1">Rp.</p>
                                <p className="text-base font-semibold">210.000.000,00</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="py-4">
            </div>
            <div className="py-4 flex justify-end">
                <button className="font-semibold text-sm text-primary">
                    Detail Project Overview
                </button>
            </div>
        </div>


        // <div className="bg-white flex shadow-lg justify-between mx-auto rounded-lg items-start align-middle flex-row h-32">
        //     <div className="py-4 px-4">
        //         <div className="flex justify-between">
        //             <div>
        //                 <p className="py-1 text-xl font-semibold">Project Charter</p>
        //             </div>
        //             <div>
        //                 <p className="py-1 text-xl font-semibold">Project Charter</p>
        //             </div>

        //         </div>

        //         <div className="flex justify-between">
        //             <div className="flex justify-start">
        //                 <p className="text-sm ">Manpower</p>
        //                 {/* <p className="text-sm ml-1">By Duration</p> */}
        //             </div>
        //             <div className="flex justify-end">
        //                 <p className="text-sm ">+2.45%</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ProjectCharterCard;
