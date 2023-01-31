import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Dialog, Transition } from "@headlessui/react";
import '../../../../Assets/svgbutton/svgbutton.css';
import { IconView } from '../../../Icons/icon';
import DescTitleMOM from '../../../Card/MinutesofMeetingCard/desctitlemom';
import TitleMOM from '../../../Card/MinutesofMeetingCard/titlemom';
import ListMOM from '../../../Card/MinutesofMeetingCard/listmom';
import DescTitleTimeMOM from '../../../Card/MinutesofMeetingCard/desctitlemompadding';
import ListMOMNoDot from '../../../Card/MinutesofMeetingCard/listmomnodot';


const ViewModalMOM = (props) => {
    const { meetingID, meetingName, meetingDate, meetingTime, meetingLocation, meetingLeader, meetingObj, meetingAtendees, meetingNotes, meetingActionItem, meetingOwner, meetingDeadline, meetingStatus } = props;

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
                                        Minutes of Meeting
                                    </Dialog.Title>
                                    <div>
                                        <div>
                                            <div className="lg:px-36 md:px-20">
                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className="col-span-5">
                                                        <DescTitleMOM title="Meeting Name" description={meetingName} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className='col-span-5'>
                                                        <DescTitleMOM title="Date of Meeting" description={meetingDate} />
                                                    </div>
                                                    <div className='col-span-5'>
                                                        <DescTitleMOM title="Time" description={meetingTime} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className='col-span-5'>
                                                        <DescTitleMOM title="Location" description={meetingLocation} />
                                                    </div>
                                                    <div className='col-span-5'>
                                                        <DescTitleMOM title="Meeting Leader" description={meetingLeader} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-12 py-6 flex justify-between">
                                                    <div className='col-span-5'>
                                                        <DescTitleMOM title="Meeting Objectives" description={meetingObj} />
                                                    </div>
                                                </div>

                                                <div className="py-6 flex justify-start">
                                                    <div>
                                                        <div><TitleMOM title="Atendees" /></div>
                                                        <div>
                                                            {meetingAtendees.map((item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <ListMOM description={item} />
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-6 flex justify-start">
                                                    <div>
                                                        <div><TitleMOM title="Agenda & Notes" /></div>
                                                        <div>
                                                            {meetingNotes.map((item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <ListMOM description={item} />
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-6">
                                                    <div className="rounded-xl shadow-lg bg-white pt-6">
                                                        <div className="overflow-x-auto">
                                                            <table className="table table-zebra w-full table-hover h-1/3">
                                                                <thead>
                                                                    <tr>
                                                                        <th align="center">Action Item</th>
                                                                        <th align="center">Owner</th>
                                                                        <th align="center">Deadline</th>
                                                                        <th align="center">Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center">
                                                                            <div>
                                                                                <div>
                                                                                    {meetingActionItem.map((item, index) => {
                                                                                        return (
                                                                                            <div key={index} className="py-2">
                                                                                                <ListMOMNoDot description={item} />
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
                                                                                    {meetingOwner.map((item, index) => {
                                                                                        return (
                                                                                            <div key={index} className="py-2">
                                                                                                <ListMOMNoDot description={item} />
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
                                                                                    {meetingDeadline.map((item, index) => {
                                                                                        return (
                                                                                            <div key={index} className="py-2">
                                                                                                <ListMOMNoDot description={item} />
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
                                                                                    {meetingStatus.map((item, index) => {
                                                                                        return (
                                                                                            <div key={index} className="py-2">
                                                                                                <ListMOMNoDot description={item} />
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

export default ViewModalMOM;
