import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import '../../../../Assets/svgbutton/svgbutton.css';
import { IconView } from '../../../Icons/icon';
import DescTitleReport from '../../../Card/DailyReportCard/desctitlereport';
import ListReport from '../../../Card/DailyReportCard/listreport';
import ListReportNoDot from '../../../Card/DailyReportCard/listreportnodot';



const ViewModalReport = (props) => {
    const { reportID, reportName, reportDesc, reportDate, reportNumber, reportActivity, reportWLName, reportWLDesc, reportWLStatus, reportWLHour, reportEq } = props;

    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <button onClick={showDialog} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white" id='icon'>
                    <IconView />
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={hideDialog}>
                    <Transition
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="py-16 w-full max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 lg:px-36 md:px-20 pb-8"
                                    >
                                        Daily Report
                                    </Dialog.Title>
                                    <div>
                                        <div>
                                            <div className="lg:px-36 md:px-20">
                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className="lg:col-span-5 lg:py-0 md:col-span-6 col-span-12 py-6">
                                                        <DescTitleReport title="Report Name" description={reportName} />
                                                    </div>
                                                    <div className="lg:col-span-5 lg:py-0 md:col-span-6 col-span-12 py-6">
                                                        <DescTitleReport title="Report Number" description={reportNumber} />
                                                    </div>
                                                    <div className="lg:col-span-2 lg:py-0 md:col-span-6 col-span-12 pt-6">
                                                        <DescTitleReport title="Report Date" description={reportDate} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className='col-span-12'>
                                                        <DescTitleReport title="Report Description" description={reportDesc} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className='col-span-12'>
                                                        <DescTitleReport title="Activity Name" description={reportActivity} />
                                                    </div>
                                                </div>

                                                <div className="py-6">
                                                    <div className="py-2 w-full bg-grey-light text-center">
                                                        <p className="text-sm font-semibold opacity-70">Work Log</p>
                                                    </div>

                                                    <div className="rounded-xl shadow-lg bg-white pt-6">
                                                        <div className="overflow-x-auto">
                                                            <table className="table table-zebra w-full table-hover h-1/3">
                                                                <thead>
                                                                    <tr>
                                                                        <th align="center">Name</th>
                                                                        <th align="center">Description</th>
                                                                        <th align="center">Status</th>
                                                                        <th align="center">Hour</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center">
                                                                            <div>
                                                                                <div>
                                                                                    {reportWLName.map((item, index) => {
                                                                                        return (
                                                                                            <div key={index} className="py-2">
                                                                                                <ListReportNoDot description={item} />
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td align="center">
                                                                            <div>
                                                                                <div>
                                                                                    {reportWLDesc.map((item, index) => {
                                                                                        return (
                                                                                            <div key={index} className="py-2">
                                                                                                <ListReportNoDot description={item} />
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td align="center">
                                                                            <div>
                                                                                <div>
                                                                                    {reportWLStatus.map((item, index) => {
                                                                                        return (
                                                                                            <div key={index} className="py-2">
                                                                                                <ListReportNoDot description={item} />
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td align="center">
                                                                            <div>
                                                                                <div>
                                                                                    {reportWLHour.map((item, index) => {
                                                                                        return (
                                                                                            <div key={index} className="py-2">
                                                                                                <ListReportNoDot description={item} />
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-6">
                                                    <div>
                                                        <div className="py-2 w-full bg-grey-light text-center">
                                                            <p className="text-sm font-semibold opacity-70">Equipment</p>
                                                        </div>

                                                        <div className='py-2'>
                                                            {reportEq.map((item, index) => {
                                                                return (
                                                                    <div key={index} className="py-1">
                                                                        <ListReport description={item} />
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </Dialog.Panel>
                            </Transition>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    );
};

export default ViewModalReport;
