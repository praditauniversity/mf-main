import React, { useState } from "react";
import './AddModal.css'
import '../../../../Assets/svgbutton/svgbutton.css'
import { IconDeleteForm, IconPlusForm } from "../../../Icons/icon";

const Addnewresource = () => {
    const [resources, setResources] = useState(['']);

    const handleFormChange = (value, index) => {
        const dataResources = resources.map((resourcesItem, resourcesIndex) => {
            return resourcesIndex === index ? value : resourcesItem
        })
        setResources(dataResources)
    }

    const addFields = () => {
        setResources([...resources, ''])
    }

    const removeFields = (index) => {
        let dataResources = [...resources];
        dataResources.splice(index, 1)
        setResources(dataResources)
    }

    return (
        <div>
            {resources.map((input, index) => {
                return (
                    <div key={index}>
                        <div className="pb-2 w-full min-w-5xl">
                            <div className="flex justify-start">
                                <input
                                    className="input input-bordered border-primary-light w-[86%] bg-table-dark tracking-normal"
                                    name='resources'
                                    placeholder='Enter your resources'
                                    value={input}
                                    onChange={event => handleFormChange(event.target.value, index)}
                                />
                                {resources.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={() => removeFields(index)}><IconDeleteForm /></button>}
                                {resources.length - 1 === index && <button  className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg ml-2" onClick={addFields}><IconPlusForm /></button>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Addnewresource;