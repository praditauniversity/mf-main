import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { IconEdit } from '../../../Icons/icon';



const DetailManpower = () => {
    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }

    const DialogButton = () => {
        return (
            <Dialog open={isOpen} onClose={hideDialog} className="fixed z-40 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Future Update Feature
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            This Feature is not yet available. Please check back later.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-800 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={hideDialog}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        )

    }

    return (
        <div>
            <button onClick={showDialog} className="font-semibold text-sm text-primary">
                Manpower Details
            </button>
            <DialogButton />
        </div>


    );
};

export default DetailManpower;
