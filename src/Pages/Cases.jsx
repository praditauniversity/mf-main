import React from 'react';
import useToggle from '../Middleware/useToggle';

// create task list component

const TaskList = () => {

    // MD: master data for status
    const [completed, setCompleted] = useToggle();

    const tasks = [
        {
            id: 1,
            name: "Create a task list component",
            status: completed ? "Completed" : "Todo",
        },
        {
            id: 2,
            name: "Create a task list component",
            status: completed ? "Completed" : "Todo",
        },
    ];

    return (
        <div>
            {tasks.map((item) => { return (
                <div key={item.id}>
                    {item.name}: {item.status}
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >{item.status}</button>
                </div>
            )})}

        </div>
    );
};

const Cases = () => {
    return (
        <div>
            <TaskList />
        </div>
    );
};

export default Cases;
