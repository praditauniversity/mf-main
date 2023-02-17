import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import '../../../../Assets/svgbutton/svgbutton.css';
import { IconInfo } from '../../../Icons/icon';
import IconHome from "../../../../Assets/Icons/svg/Home.svg";
import BadgeAccessPage from '../../../Badge/BadgeAccessPage';
import ChooseColor from '../AddModal/ChooseColor';

const ViewModalRole = (props) => {
    const { roleId, roleName, roleDescription, roleColor } = props;

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
                    <IconInfo />
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center" key={roleId}>
                            <Transition
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="px-24 py-16 w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-bold leading-6 pb-2"
                                    >
                                        Add Role
                                    </Dialog.Title>

                                    <Dialog.Description
                                        as="p"
                                        className="text-sm font-bold leading-6 pb-8"
                                    >
                                        Customize the role based on your needs
                                    </Dialog.Description>

                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Role Name</label>
                                        <p className="text-lg mb-2">{roleName}</p>
                                    </div>

                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Description</label>
                                        <p className="text-lg mb-2">{roleDescription}</p>
                                    </div>

                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Color</label>
                                        <ChooseColor color={roleColor} />
                                    </div>

                                    <div className="pt-1 pb-3">
                                        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">Access Page</label>
                                        <div className="flex flex-row flex-wrap gap-2">
                                            <BadgeAccessPage text="Project Charter" icon={IconHome}/>
                                            <BadgeAccessPage text="Gantt" icon={IconHome}/>
                                            <BadgeAccessPage text="Daily Report" icon={IconHome}/>
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

export default ViewModalRole;
