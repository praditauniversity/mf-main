import React, { useState } from "react";
import { IconDeleteForm, IconPlusForm } from "../../../Icons/icon";
import '../../../../Assets/svgbutton/svgbutton.css'
import './AddModal.css'

const Addnewrisk = () => {
    // const [inputFields, setInputFields] = useState([
    //     { name: '', age: '' }
    // ])
    const [inputFields, setInputFields] = useState([
        { risk: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { risk: '' }

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
                        <div className="pb-2 w-full min-w-5xl">
                            <div className="flex justify-start">
                                <input
                                    className="input input-bordered border-primary-light w-[86%] bg-table-dark tracking-normal"
                                    name='risk'
                                    placeholder='Enter your objective'
                                    value={input.risk}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                {inputFields.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => removeFields(index)}><IconDeleteForm /></button>}
                                {inputFields.length - 1 === index && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={addFields}><IconPlusForm /></button>}
                            </div>
                        </div>
                    </div>
                )
            })}
            {/* <div className='pb-2 pl-2'>
                <button className='text-primary' onClick={addFields}>+ New List</button>
            </div> */}
        </div>
    );
}

export default Addnewrisk;