import React, { useState } from "react";
import { IconDeleteForm, IconPlusForm } from "../Icons/icon";
import './input.css'
import '../../Assets/svgbutton/svgbutton.css'

const InputAddRemoveRisk = ({ label, name, placeholder, onChange, disabled, error }) => {
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
        </div>
    );
}

export default InputAddRemoveRisk;