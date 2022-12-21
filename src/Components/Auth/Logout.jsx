import { Dialog, Transition } from '@headlessui/react';
import UseLogoutDialog from './UseLogoutDialog';
import React, { useState, Fragment } from 'react';

export default function Logout() {
    let [isOpen, setIsOpen] = useState(true)

    return (

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 transition-all" />
                </Transition.Child>
                <Dialog.Panel
                    className='absolute mx-auto max-w-xl rounded-md shadow-md ring-1 ring-dark/5 bg-white z-10'
                >
                    <Dialog.Title>Deactivate account</Dialog.Title>
                    <Dialog.Description>
                        This will permanently deactivate your account
                    </Dialog.Description>

                    <p>
                        Are you sure you want to deactivate your account? All of your data
                        will be permanently removed. This action cannot be undone.
                    </p>

                    <button onClick={() => setIsOpen(false)}>Deactivate</button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}
