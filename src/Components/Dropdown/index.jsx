import React, { Fragment } from 'react';
import { Listbox, Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";

const Dropdown = ({ options, label }) => {
    return (
        <>
            <Menu>
                <Menu.Button
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >{label}
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute mt-2 w-56
                        divide-y divide-gray-100 rounded-md bg-white shadow-lg 
                        ring-1 ring-black ring-opacity-5 focus:outline-none 
                        border-8 border-transparent" >
                        {options.map((option) => (
                            <Menu.Item key={option.id} >
                                <button
                                    className=" ui-active:bg-indigo-50 text-gray-900 
                                    group flex w-full items-center 
                                    rounded-md px-2 py-2 text-sm " >
                                    <Link to={option.link}> {option.name} </Link>
                                </button>
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}

export default Dropdown;