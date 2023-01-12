import React, { useEffect, useState } from "react";
import { IconDeleteForm, IconPlusForm } from "../../../Icons/icon";
import './AddModal.css'
import '../../../../Assets/svgbutton/svgbutton.css'

const Addnewequipment = () => {
    // const [inputFields, setInputFields] = useState([
    //     { equipment: '' }
    // ])
    const [equipment, inputFields, setInputFields] = useEquipment()

    
    
    const handleFormChange = (index, event) => {
        // console.log("SEWIWIWIWIWIWIWIWII", equipment[0].equipment);
        let data = [...inputFields];
        const dataEvent = event.target.name;
        data[index].dataEvent = event.target.value;
        console.log("SEWIWIWIWIWIWIWIWII", data);
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { equipment: '' }

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
                        <div className="pb-2 w-full min-w-5xl" id="buttonInside">
                            <div className="flex justify-start">
                                <input
                                    className="input input-bordered border-primary-light w-[86%] bg-table-dark tracking-normal"
                                    name='equipment'
                                    placeholder='Enter your equipment'
                                    // value={equipment}
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
export function useEquipment(){
    const [inputFields, setInputFields] = useState([
        { equipment: '' }
    ])
    const [equipment, setEquipment] = useState([]);
    useEffect(() => {
        setEquipment(inputFields);
    },[inputFields])

        return [equipment,inputFields, setInputFields,setEquipment];
    
}


export default Addnewequipment ;