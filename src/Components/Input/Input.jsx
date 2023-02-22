import { Listbox } from '@headlessui/react';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash.range';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import './input.css'

export const InputField = ({ value, label, name, placeholder, type, onChange, disabled, error, minLength, maxLength, pattern, errorMsg, autoFocus, required }) => (
    <div className="form-group">
        <label className="block uppercase tracking-wide text-darkest text-xs font-bold pb-2">{label} <span className="text-error">{required}</span></label>
        <input
            type={type}
            value={value}
            name={name}
            className="form-control input input-bordered mb-4 shadow appearance-none border rounded w-full bg-table-dark border-primary-light rounded-lg py-3 px-4 "
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            error={error}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
        />
    </div>
);

export const InputFieldFocus = ({ value, label, name, placeholder, type, onChange, disabled, error, minLength, maxLength, pattern, errorMsg, inputRef, required }) => (
    <div className="form-group">
        <label className="block uppercase tracking-wide text-darkest text-xs font-bold pb-2">{label} <span className="text-error">{required}</span></label>
        <input
            type={type}
            value={value}
            name={name}
            className="form-control input input-bordered mb-4 shadow appearance-none border rounded w-full bg-table-dark border-primary-light rounded-lg py-3 px-4 "
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            error={error}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            ref={inputRef}
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

export const SelectField = ({ value, label, name, placeholder, onChange, disabled, error, options, ref }) => {
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
                ref={ref}
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

export const DatePickerField = ({ label, dateFormat, selected, placeholder, onChange, disabled, error }) => {
    const years = range(getYear(new Date()) + 1, 2080, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <div className="form-group">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            <DatePicker

                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div
                        style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <button className='rangeDateButton' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            {"<"}
                        </button>
                        <select className='borderSelect'
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(value)}
                        >
                            {years.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <select className='borderSelect'
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                            }
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <button className='rangeDateButton' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            {">"}
                        </button>
                    </div>
                )}

                dateFormat={dateFormat}
                className="form-control input input-bordered mb-4 shadow appearance-none border rounded w-full bg-table-dark border-primary-light rounded-lg py-3 px-4"
                selected={selected}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                error={error}

            />
        </div>
    );
}

export const DatePickerFieldStart = ({ label, dateFormat, selected, placeholder, onChange, disabled, error }) => {
    return (
        <div className="form-group">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            <DatePicker
                dateFormat={dateFormat}
                className="form-control input input-bordered mb-4 shadow appearance-none border rounded w-full bg-table-dark border-primary-light rounded-lg py-3 px-4"
                selected={selected}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                selectsStart
            />
        </div>
    );
}

export const DatePickerFieldEnd = ({ label, dateFormat, selected, placeholder, onChange, disabled, error }) => {
    return (
        <div className="form-group">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            <DatePicker
                dateFormat={dateFormat}
                className="form-control input input-bordered mb-4 shadow appearance-none border rounded w-full bg-table-dark border-primary-light rounded-lg py-3 px-4"
                selected={selected}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                selectsEnd
            />
        </div>
    );
}

export const TimePickerField = ({ label, selected, placeholder, onChange, disabled, error }) => {
    return (
        <div className="form-group">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            <DatePicker
                className="form-control input input-bordered mb-4 shadow appearance-none border rounded w-full bg-table-dark border-primary-light rounded-lg py-3 px-4"
                selected={selected}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeInputLabel="Time:"
                // dateFormat="MM/dd/yyyy h:mm aa"
                dateFormat="h:mm aa"
            // showTimeInput

            />
        </div>
    );
}


export const InputProjectObj = ({ label, name, placeholder, onChange }) => {
    const [project_objectives, setProjectObjectives] = useState([
        { objective: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...project_objectives];
        data[index][event.target.name] = event.target.value;
        setProjectObjectives(data);
    }

    const addFields = () => {
        let newfield = { objective: '' }

        setProjectObjectives([...project_objectives, newfield])
    }

    const removeFields = (index) => {
        let data = [...project_objectives];
        data.splice(index, 1)
        setProjectObjectives(data)
    }

    return (
        <div className="">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            {project_objectives.map((input, index) => {
                return (
                    <div key={index}>
                        <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                            <div className="flex justify-start">
                                <input
                                    className="input input-border border-primary-light shadow appearance-none w-[86%]"
                                    name={name}
                                    placeholder={placeholder}
                                    defaultValue={input.objective}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                {project_objectives.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => removeFields(index)}><IconDeleteForm /></button>}
                                {project_objectives.length - 1 === index && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={addFields}><IconPlusForm /></button>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

