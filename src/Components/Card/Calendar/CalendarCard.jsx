import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

const CalendarCard = () => {
    const [date, setDate] = useState(new Date());

    const data = [
        {
            id: 1,
            date: '8',
            title: 'BioThermal Application at Project Suiza',
        },
        {
            id: 2,
            date: '12',
            title: 'Bay Institute Guardia',
        },
        {
            id: 3,
            date: '21',
            title: 'Sensors and traffic monitoring',
        },
        {
            id: 4,
            date: '24',
            title: 'Appointment with Guardia',
        }
    ]

    return (
        <div className="rounded-xl shadow-lg bg-white py-5 px-3 calendarapp">
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} />
            </div>
            <div className='px-3 pt-5'>
                <h3 className="font-bold">Meeting</h3>
                {data.map((item) => (
                    <div className="flex align-center pt-2 text-[16px]">
                        <p className="font-bold text-secondary pr-2 w-8">{item.date}</p>
                        <p className='pl-2'>{item.title}</p>
                    </div>
                    ))
                }
                
                
            </div>
        </div>
    );
};
export default CalendarCard;
