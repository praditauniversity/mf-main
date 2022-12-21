import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'

const SelectorField = ({ options, label }) => {
    const [selectedValue, setSelectedValue] = useState(options[0])

    return (
        <div className="mb-4">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            <Listbox value={selectedValue} onChange={setSelectedValue}>
                <Listbox.Button
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >{selectedValue.name}</Listbox.Button>
                <Listbox.Options
                    className="absolute mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-8 border-transparent"
                >
                    {options.map((value) => (
                        <Listbox.Option
                            key={value.id}
                            value={value}
                            disabled={value.unavailable}
                        >
                            <button className="ui-active:bg-indigo-50 text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm" >
                                {value.name}
                            </button>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export default SelectorField;