import React, { useState } from "react";
import './AddModal.css'

const Addnewphase = () => {
    const [inputFields, setInputFields] = useState([
        { phases: '', enddate: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { phases: '', enddate: '' }

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
                <div className="grid grid-cols-18 gap-4">
                    <div className="col-span-9">
                        <label className="label">
                            <p className='text-base font-medium'>Phases</p>
                        </label>
                    </div>
                    <div className="col-span-9">
                        <label className="label">
                            <p className='text-base font-medium'>End Date</p>
                        </label>
                    </div>
                </div>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <div className="pb-2 flex justify-between" id="inputWithButton">
                                    <div className="flex justify-start w-full max-w-5xl gap-4">
                                        <input
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
                                    </div>
                                    <div className="flex justify-end">
                                        {(inputFields.length !== 1) ? <button className="text-primary ml-2" onClick={() => removeFields(index)}>X</button> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='pb-2 pl-2'>
                <button className='text-primary' onClick={addFields}>+ New List</button>
            </div>
        </div>
    );
}

export default Addnewphase;