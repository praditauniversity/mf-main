import React, { useState } from "react";
import './AddModal.css'
import '../../../../Assets/svgbutton/svgbutton.css'
import { IconDeleteForm, IconPlusForm } from "../../../Icons/icon";

const Addnewresource = () => {
    // const [inputFields, setInputFields] = useState([
    //     { name: '', age: '' }
    // ])
    // const [inputFields, setInputFields] = useState([
    //     { resource: '' }
    // ])
    const [resources, setResources] = useState(['']);

    const handleFormChange = (value, index) => {
        // let data = [...inputFields];
        // data[index][event.target.name] = event.target.value;
        // setInputFields(data);
        const dataResources = resources.map((resourcesItem, resourcesIndex) => {
            return resourcesIndex === index ? value : resourcesItem
        })
        setResources(dataResources)
        console.log("DATA", dataResources)
        console.log("RESOURCES", resources)
    }

    const addFields = () => {
        // let newfield = { resource: '' }
        // setInputFields([...inputFields, newfield])
        setResources([...resources, ''])
    }

    const removeFields = (index) => {
        // let data = [...inputFields];
        // data.splice(index, 1)
        // setInputFields(data)
        let dataResources = [...resources];
        dataResources.splice(index, 1)
        console.log("removefields", resources)
        console.log("removefields", dataResources)
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
            {/* <div className='pb-2 pl-2'>
                <button className='text-primary' onClick={addFields}>+ New List</button>
            </div> */}
        </div>
    );
}

export default Addnewresource;