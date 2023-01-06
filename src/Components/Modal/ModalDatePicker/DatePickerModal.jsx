import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Styles = styled.div`
 .react-datepicker-wrapper,
 .react-datepicker__input-container,
 .react-datepicker__input-container input {
   width: 100%;
 }

 .react-datepicker__close-icon::before,
 .react-datepicker__close-icon::after {
   background-color: purple;
 }
`;

export default function TableDatePicker() {
    return (
        <Styles>
            <ModalDatePicker />
        </Styles>
        // <ModalDatePicker />
    );
}

export function ModalDatePicker() {
    const [date, setDate] = useState(null);
    // useEffect(() => {
    //     // Check if the page is being refreshed
    //     if (performance.navigation.type === 1) {
    //       // Clear the selected date if the page is being refreshed
    //       setSelectedDate(null);
    //     }
    //   }, []);

    return (
        <DatePicker
            isClearable
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="MM/DD/YYYY"
            className="w-full bg-table-dark border-primary-light rounded-lg py-3 px-4"
        />
    )
}

{/* <input type="text" placeholder="Enter start date" className="input input-bordered w-full bg-table-dark border-primary-light" /> */ }