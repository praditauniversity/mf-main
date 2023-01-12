import React, { useEffect, useState } from "react";
import { IconDeleteForm, IconPlusForm } from "../../../Icons/icon";
import './AddModal.css'

const Addnewworklog = () => {

    // const [inputFields, setInputFields] = useState([
    //     { name: '', description: '', status: '', hour: '' }
    // ])
    const [worklog, inputFields, setInputFields] = useWorkLog()

    const handleFormChange = (index, event) => {

        let data = [...inputFields];
        const dataevent=event.target.name;
        data[index][event.target.name] = event.target.value;
        console.log("awawawaaw",data)
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { work_log_name: '', work_log_desc: '', work_log_status: '', work_log_hour: '' }

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
                                            name='work_log_name'
                                            placeholder='Enter name'
                                            // value={input.name}
                                            onChange={event => handleFormChange(index, event)}
                                        />
                                        <input
                                            className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                            name='work_log_desc'
                                            placeholder='Enter description'
                                            // value={input.description}
                                            onChange={event => handleFormChange(index, event)}
                                        />
                                        <input
                                            className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                            name='work_log_status'
                                            placeholder='Enter status'
                                            // value={input.status}
                                            onChange={event => handleFormChange(index, event)}
                                        />
                                        <input
                                            className="input input-bordered border-primary-light bg-table-dark tracking-normal w-[20%]"
                                            name='work_log_hour'
                                            placeholder='Enter hour'
                                            // value={input.hour}
                                            onChange={event => handleFormChange(index, event)}
                                        />

                                        {inputFields.length !== 1 && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg" onClick={() => removeFields(index)}><IconDeleteForm /></button>}
                                        {inputFields.length - 1 === index && <button className="bg-primary hover:bg-primary-800 py-2.5 px-2.5 rounded-lg" onClick={addFields}><IconPlusForm /></button>}
                                    </div>
                                     </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}
 export function useWorkLog(){
        const [inputFields, setInputFields] = useState([
            { work_log_name: '', work_log_desc: '', work_log_status: '', work_log_hour: '' },
        ]);
        const [workLog, setWorkLog] = useState([]);
        useEffect(() => {
            setWorkLog(inputFields);
        }, [inputFields]);
        return [workLog, inputFields, setInputFields,setWorkLog];
 }

export default Addnewworklog;