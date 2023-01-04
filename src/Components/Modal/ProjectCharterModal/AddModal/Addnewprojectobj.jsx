import React, { useState } from "react";
import './AddModal.css'

const Addnewprojectobj = () => {
    const [inputFields, setInputFields] = useState([
        { objective: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { objective: '' }

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <div className="">
            {inputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <div className="pb-2 w-full min-w-5xl">
                            <div className="flex justify-start">
                                <input
                                    className="input input-bordered border-primary-light w-11/12 bg-table-dark tracking-normal"
                                    name='objective'
                                    placeholder='Enter your objective'
                                    value={input.objective}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                {inputFields.length !== 1 && <button className="text-primary ml-2" onClick={() => removeFields(index)}>X</button>}
                                {inputFields.length - 1 === index && <button className="text-primary ml-2" onClick={addFields}>+</button>}
                            </div>
                        </div>
                    </div>
                )
            })}
            {/* <div className='pb-2 pl-2 col-span-1' >
                <button className='text-primary' onClick={addFields}>+ New List</button>
            </div> */}
        </div>
    );
}

export default Addnewprojectobj;