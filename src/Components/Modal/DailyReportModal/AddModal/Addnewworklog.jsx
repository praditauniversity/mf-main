import React, { useEffect, useState } from "react";
import { IconDeleteForm, IconPlusForm } from "../../../Icons/icon";
import './AddModal.css'

const Addnewworklog = () => {

    // const [inputFields, setInputFields] = useState([
    //     { name: '', description: '', status: '', hour: '' }
    // ])
    const [ inputFields, setInputFields,setWorkLogName,setWorkLogDesc,setWorkLogStatus,setWorkLogHour] = useWorkLog()

    const handleFormChange = (index, event) => {

        let data = [...inputFields];
        const dataevent=event.target.name;
        data[index][event.target.name] = event.target.value;
        console.log("awawawaaw",data)
        console.log("awawawaaw",inputFields)

        var work_log_name = [];
        var work_log_desc = [];
        var work_log_status = [];
        var work_log_hour = [];


        var getdatanewwork = data.map((item) => {
            work_log_name.push(item.work_log_name)
            work_log_desc.push(item.work_log_desc)
            work_log_status.push(item.work_log_status)
            work_log_hour.push(item.work_log_hour)
            return;
        })
        console.log ("testing111",getdatanewwork)
        
        setWorkLogName(work_log_name);
        setWorkLogDesc(work_log_desc);
        setWorkLogStatus(work_log_status);
        setWorkLogHour(work_log_hour);
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
                {console.log(inputFields)}
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
        const [work_log_name, setWorkLogName] = useState([]);
        const [work_log_desc, setWorkLogDesc] = useState([]);
        const [work_log_status, setWorkLogStatus] = useState([]);
        const [work_log_hour, setWorkLogHour] = useState([]);
        useEffect(() => {
            setWorkLogName(inputFields[work_log_name]);
            setWorkLogDesc(inputFields[work_log_desc]);
            setWorkLogStatus(inputFields[work_log_status]);
            setWorkLogHour(inputFields[work_log_hour]);

        }, [inputFields]);
        return [inputFields, setInputFields, work_log_name, work_log_desc, work_log_status, work_log_hour,setWorkLogName,setWorkLogDesc,setWorkLogStatus,setWorkLogHour];
    }
    
    export default Addnewworklog;