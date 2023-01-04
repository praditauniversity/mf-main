import React, { useState } from "react";
import'./AddModal.css'

const Addnewresource = () => {
    // const [inputFields, setInputFields] = useState([
    //     { name: '', age: '' }
    // ])
    const [inputFields, setInputFields] = useState([
        { resource: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { resource: '' }

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <div>
            {inputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <div>
                            <div className="pb-2 flex justify-start" id="inputWithButton">
                                <input
                                    className="input input-bordered border-primary-light w-full bg-table-dark"
                                    name='resource'
                                    placeholder='Enter your resource'
                                    value={input.resource}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                {(inputFields.length!==1)?<button className="text-primary ml-2" onClick={() => removeFields(index)}>X</button>:''}
                                {/* <button onClick={() => removeFields(index)}>Remove</button> */}
                                
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className='pb-2 pl-2'>
                <button className='text-primary' onClick={addFields}>+ New List</button>
            </div>
        </div>
    );
}

export default Addnewresource;