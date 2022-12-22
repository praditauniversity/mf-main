import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

const CalendarCard = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="rounded-xl shadow-sm bg-white pt-2 px-3 calendarapp">
            {/* <Typography className="header">React Calendar</Typography> */}
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} />
            </div>
            {/* <Grid className="text-center">Selected date: {date.toDateString()}</Grid> */}
        </div>
    );
};
export default CalendarCard;
