import React from 'react';
import UpdateModalTask from '../Modal/TaskModal/UpdateModalTask';

const Tasks = (props) => {
    const { data, icon, projectName} = props;
    
    const taskStartDate = new Date(data.start_time);
    const taskStartDateMonth = taskStartDate.toLocaleDateString('en-US', { month: 'short' })
    const taskStartDateDay = taskStartDate.toLocaleDateString('en-US', { day: '2-digit' })

    const taskEndDate = new Date(data.end_time);
    const taskEndDateMonth = taskEndDate.toLocaleDateString('en-US', { month: 'short' })
    const taskEndDateDay = taskEndDate.toLocaleDateString('en-US', { day: '2-digit' })

    return (
        <div
        className="flex flex-row justify-between align-center rounded-lg bg-background-mainframe border-primary hover:bg-table-light hover:border-l-8 active:bg-table-dark focus:bg-table-light mb-2 p-5 transition-all ease-out duration-100"
        >
            <div className="flex flex-col">
                <h6 className="text-sm ">{projectName}</h6>
                <h4 className="text-lg font-bold">{data.name}</h4>
                <h6 className="text-xs text-grey ">{taskStartDateDay} {taskStartDateMonth} - {taskEndDateDay} {taskEndDateMonth}</h6>
            </div>

            <a key={data.ID} className="flex justify-center align-center opacity-70 hover:opacity-100 ease-out duration-100">
                <UpdateModalTask taskData={data} icon={icon} />
            </a>
            
            
        </div>
    );};

export default Tasks;