import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";

const list = [
    {
        id: 1,
        name: 'Today',
        value: 'day',
        link: '/belomada',
    },
    {
        id: 2,
        name: 'Last Month',
        value: 'month',
        link: '/belomada',
    },
    {
        id: 3,
        name: 'Last Year',
        value: 'year',
        link: '/belomada',
    },
];

const Dropdown = ({ options, label }) => {
    const [value1, setValueStatus] = React.useState('month');

    return (
        <>
            <Menu>
                <Menu.Button
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-small text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    variant="standard"
                    id="standard-select-currency"
                    select
                    value={value1}
                    onChange={(e) => setValueStatus(e.target.value)}
                    InputProps={{
                        disableUnderline: true
                    }}                
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
                    <Menu.Items className="absolute mt-2 w-fit
                        divide-y divide-gray-100 rounded-md bg-white shadow-lg 
                        ring-1 ring-black ring-opacity-5 focus:outline-none 
                        border-8 border-transparent" >
                        {list.map((option) => (
                            <Menu.Item key={option.id} >
                                <button onClick={(e) => setValueStatus(option.value)}
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