import React from "react";

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
                            <th align="center" className="opacity-70">Name (Of Team or Person)</th>
                            <th align="center" className="opacity-70">Description of Work</th>
                            <th align="center" className="opacity-70">Status</th>
                            <th align="center" className="opacity-70">Number of Hour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td align="center" className="font-semibold">{item.name}</td>
                                <td align="center" className="font-semibold">{item.description}</td>
                                <td align="center" className="font-semibold">{item.status}</td>
                                <td align="center" className="font-semibold">{item.numberofhour}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyReportList;
