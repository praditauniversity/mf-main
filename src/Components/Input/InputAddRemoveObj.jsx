import React, { useState } from "react";
import { IconDeleteForm, IconPlusForm } from "../Icons/icon";
import './input.css'
import '../../Assets/svgbutton/svgbutton.css'

const InputAddRemoveObj = ({ label, name, placeholder, onChange, value}) => {
    const [inputFields, setInputFields] = useState([
        { objective: '' }
    ])

    const handleFormChange = (index, event) => {
        const { name, value } = event.target;
        let data = [...inputFields];
        // data[index][event.target.name] = event.target.value;
        data[index][name] = value
        setInputFields(data);
    }

    const addFields = () => {
        setInputFields([...inputFields, {objective: ''}])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <div className="">
            <label className="block uppercase tracking-wide text-darkest text-xs font-bold mb-2">{label}</label>
            {inputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                            <div className="flex justify-start">
                                <input
                                    className="input border-primary-light shadow appearance-none w-[86%] text-darkest leading-tight focus:outline-none focus:shadow-outline"
                                    name={name}
                                    placeholder={placeholder}
                                    // disabled={disabled}
                                    // error={error}
                                    defaultValue={input.inputFields}
                                    onChange={event => handleFormChange(index, event)}
                                />
                                {inputFields.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => removeFields(index)}><IconDeleteForm /></button>}
                                {inputFields.length - 1 === index && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={addFields}><IconPlusForm /></button>}
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

export default InputAddRemoveObj;