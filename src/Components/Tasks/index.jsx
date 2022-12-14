import React from 'react';

const Tasks = (props) => {
    const { id, icon, projectName, taskName, startDate, endDate } = props;
    
    const taskStartDate = new Date(startDate);
    const taskStartDateMonth = taskStartDate.toLocaleDateString('en-US', { month: 'short' })
    const taskStartDateDay = taskStartDate.toLocaleDateString('en-US', { day: '2-digit' })

    const taskEndDate = new Date(endDate);
    const taskEndDateMonth = taskEndDate.toLocaleDateString('en-US', { month: 'short' })
    const taskEndDateDay = taskEndDate.toLocaleDateString('en-US', { day: '2-digit' })

    return (
        <div
        className="flex flex-row justify-between align-center rounded-lg bg-background-mainframe border-primary hover:bg-table-light hover:border-l-8 active:bg-table-dark focus:bg-table-light mb-2 p-5 transition-all ease-out duration-100"
        >
            <div className="flex flex-col">
                <h6 className="text-sm ">{projectName}</h6>
                <h4 className="text-lg font-bold">{taskName}</h4>
                <h6 className="text-xs text-grey ">{taskStartDateDay} {taskStartDateMonth} - {taskEndDateDay} {taskEndDateMonth}</h6>
            </div>

            <a href="#" key={id} className="flex justify-center align-center opacity-70 hover:opacity-100 ease-out duration-100">
                <img src={icon} className="w-12"></img>
            </a>
            
            
        </div>
    );};

export default Tasks;