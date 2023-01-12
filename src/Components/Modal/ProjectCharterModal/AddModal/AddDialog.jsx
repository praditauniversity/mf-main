import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconPlus } from "../../../Icons/icon"
import AddModalProjectCharter from "./AddModal"

const AddDialogProjectCharter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const showDialog = () => {
        setIsOpen(true);
    }
    const hideDialog = () => {
        setIsOpen(false);
    }


    const DeleteDialog = () => {
        return (
            <>

            </>
        )
    }

    const Open = () => {
        return (
            <>
                <Dialog open={isOpen} onClose={hideDialog} className="fixed z-10 inset-0 overflow-y-auto">
                    <AddModalProjectCharter />
                </Dialog>
            </>
        )
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <button onClick={showDialog} className="flex flex-col items-center text-base font-normal text-gray-900 rounded-lg dark:text-white" id='icon'>
                    <IconPlus />
                </button>
            </div>
            <Open />
        </>
    )
}

export default AddDialogProjectCharter