import React, { Fragment, useState } from "react";
import { Listbox, Menu, Transition } from '@headlessui/react'
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

export const InputField = ({ value, label, name, placeholder, type, onChange, disabled, error }) => (
    <div className="form-group">
        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
        <input
            type={type}
            value={value}
            name={name}
            className="form-control mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-darkest leading-tight focus:outline-none focus:shadow-outline "
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            error={error}
        />
    </div>
);

export const InputTextArea = ({ value, label, name, placeholder, onChange }) => (
    <div className="form-group">
        <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
        <textarea
            value={value}
            name={name}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
);

export const InputFieldWithLabelAndSubtitle = ({ label, subtitle, value, placeholder, onChange }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-darkest">{label}</label>
            <p className="text-xs text-darkest">{subtitle}</p>
            <input
                className="border border-gray-300 rounded-md p-2 mt-1 mb-4"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export const SelectField = ({ value, label, name, placeholder, onChange, disabled, error, options }) => {
    return (
        <div className="form-group">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            <select
                value={value}
                name={name}
                className="form-control mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-darkest leading-tight focus:outline-none focus:shadow-outline "
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                error={error}
                >
                {options.map((option) => (
                    <option key={option.id} value={option.value} className="hover:bg-gray-400 rounded-none">
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}


export const SelectorField = ({ options, label }) => {
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

export const DatePickerField = ({ label, selected, placeholder, onChange, disabled, error }) => {
    return (
        <div className="form-group">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            <DatePicker
            className="form-control mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-darkest leading-tight focus:outline-none focus:shadow-outline "
            selected={selected}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            error={error}

            />
        </div>
    );
}


