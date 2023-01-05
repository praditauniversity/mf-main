import React, { useState } from "react";
import { IconDeleteForm, IconPlusForm } from "../../../Icons/icon";
import './AddModal.css'

const Addnewworklog = () => {

    const [inputFields, setInputFields] = useState([
        { name: '', description: '', status: '', hour: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { name: '', description: '', status: '', hour: '' }

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <div>
            <div className="">
                {/* <div className="grid grid-cols-25">
                    <div className="col-span-5">
                        <label className="label">
                            <p className='text-base font-medium'>Name</p>
                        </label>
                    </div>
                    <div className="col-span-6">
                        <label className="label">
                            <p className='text-base font-medium'>Work Description</p>
                        </label>
                    </div>
                    <div className="col-span-5">
                        <label className="label">
                            <p className='text-base font-medium'>Stsatus</p>
                        </label>
                    </div>
                    <div className="col-span-5">
                        <label className="label">
                            <p className='text-base font-medium'>Number of Hour</p>
                        </label>
                    </div>
                </div> */}
                <div className="pt-2 w-full max-w-5xl">
                    <div className=" flex justify-start gap-3">
                        <div className="w-[20%]">
                            <label className="label">
                                <p className='text-base font-medium'>Name</p>
                            </label>
                        </div>
                        <div className="w-[20%]">
                            <label className="label">
                                <p className='text-base font-medium'>Work Description</p>
                            </label>
                        </div>
                        <div className="w-[20%]">
                            <label className="label">
                                <p className='text-base font-medium'>Status</p>
                            </label>
                        </div>
                        <div className="w-[20%]">
                            <label className="label">
                                <p className='text-base font-medium'>Number of Hour</p>
                            </label>
                        </div>
                    </div>
                </div>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <div className="pb-2 w-full max-w-5xl" id="buttonInside">
                                    <div className="flex justify-start gap-3">
                                        <input
                                            className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                            name='phases'
                                            placeholder='Enter name'
                                            value={input.name}
                                            onChange={event => handleFormChange(index, event)}
                                        />
                                        <input
                                            className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                            name='enddate'
                                            placeholder='Enter description'
                                            value={input.description}
                                            onChange={event => handleFormChange(index, event)}
                                        />
                                        <input
                                            className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                            name='enddate'
                                            placeholder='Enter status'
                                            value={input.status}
                                            onChange={event => handleFormChange(index, event)}
                                        />
                                        <input
                                            className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                            name='enddate'
                                            placeholder='Enter hour'
                                            value={input.hour}
                                            onChange={event => handleFormChange(index, event)}
                                        />

                                        {inputFields.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg" onClick={() => removeFields(index)}><IconDeleteForm /></button>}
                                        {inputFields.length - 1 === index && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg" onClick={addFields}><IconPlusForm /></button>}
                                    </div>
                                    {/* <div className="flex justify-end">
                                        {(inputFields.length !== 1) ? <button className="text-primary ml-2" onClick={() => removeFields(index)}>X</button> : ''}
                                    </div> */}

                                    {/* <div className='grid grid-cols-15 gap-3 pt-2'>
                                    <div className='col-span-7'>
                                        <label className="label">
                                            <p className='text-base font-medium'>Phases</p>
                                        </label>
                                        <input
                                            className="input input-bordered w-full"
                                            name='phases'
                                            placeholder='Enter phase'
                                            value={input.phases}
                                            onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className='col-span-7'>
                                        <label className="label">
                                            <p className='text-base font-medium'>End Date</p>
                                        </label>
                                        <input
                                            className="input input-bordered w-full  "
                                            name='enddate'
                                            placeholder='Enter end date'
                                            value={input.enddate}
                                            onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-span-1 pt-14">
                                        {(inputFields.length !== 1) ? <button className="text-primary ml-2" onClick={() => removeFields(index)}>X</button> : ''}
                                    </div>

                                </div> */}

                                    {/* <button onClick={() => removeFields(index)}>Remove</button> */}
                                    {/* <input
                                    className="input input-bordered w-full"
                                    name='phases'
                                    placeholder='Enter phase'
                                    value={input.phases}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                <input
                                    className="input input-bordered w-full"
                                    name='enddate'
                                    placeholder='Enter end date'
                                    value={input.enddate}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                {(inputFields.length !== 1) ? <button className="text-primary ml-2" onClick={() => removeFields(index)}>X</button> : ''} */}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* <div className='pb-2 pl-2'>
                <button className='text-primary' onClick={addFields}>+ New List</button>
            </div> */}
        </div>
    );
}

export default Addnewworklog;