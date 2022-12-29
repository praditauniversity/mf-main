import React from "react";
import { IconEdit, IconDelete } from "../../Icons/icon";

const DailyReportList = () => {
    const data = [
        {
            name: "Julia Pepey",
            description: "Anomaly Detection",
            status: "Done",
            numberofhour: "6",
        },
        {
            name: "Marina Ria",
            description: "Highfidelity Anomaly",
            status: "In Progress",
            numberofhour: "5",
        },
        {
            name: "Rika Mana",
            description: "Performance Detection Testing",
            status: "In Progress",
            numberofhour: "8",
        },
        {
            name: "Christina Pretty",
            description: "Designing UI Application",
            status: "Done",
            numberofhour: "4",
        },
    ];
    return (
        <div className="rounded-xl shadow-lg bg-white pt-6">
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full table-hover h-1/3">
                    <thead>
                        <tr>
                            <th align="center">Name (Of Team or Person)</th>
                            <th align="center">Description of Work</th>
                            <th align="center">Status</th>
                            <th align="center">Number of Hour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td align="center">{item.name}</td>
                                <td align="center">{item.description}</td>
                                <td align="center">{item.status}</td>
                                <td align="center">{item.numberofhour}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyReportList;
