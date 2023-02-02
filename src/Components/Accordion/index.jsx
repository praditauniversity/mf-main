import React from 'react';


const Accordion = ({ data }) => {
    return (
        <div>
            {data.map((item) => {
                const todayDate = new Date();
                const startDate = new Date(item.start_project);
                const endDate = new Date(item.end_project);
                if (startDate <= todayDate && endDate > todayDate) {
                    const startDateMonth = startDate.toLocaleDateString('en-US', { month: 'short' })
                    const startDateDay = startDate.toLocaleDateString('en-US', { day: '2-digit' })
                    const endDateMonth = endDate.toLocaleDateString('en-US', { month: 'short' })
                    const endDateDay = endDate.toLocaleDateString('en-US', { day: '2-digit' })
                    return (
                        <div
                            tabIndex={0}
                            className="collapse collapse-arrow rounded-lg bg-background-mainframe hover:bg-table-light active:bg-table-dark focus:bg-table-light mb-2 border-none transition 
                  ease-out duration-100"
                        >
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">
                                <h4 className="text-lg font-bold">{item.name}</h4>
                            </div>

                            <div className="collapse-content">
                                <h5 className="text-lg font-bold text-gray-500">Description</h5>
                                <p className="text-md text-gray-500 mt-2">
                                    {item.description ? item.description : 'N/A'}
                                </p>
                                <br></br>
                                <h5 className="text-lg font-bold text-gray-500">Interval</h5>
                                <p className="text-md text-gray-500 mt-2">
                                    {startDateDay} {startDateMonth} - {endDateDay} {endDateMonth}
                                </p>
                                <div className='mt-5'>
                                    {/* <LinkButton link={item.link} id={item.ID} label="View Details" /> */}
                                    <a href="/#/projectdashboard" onClick={() => localStorage.setItem('projectID', item.ID)}>
                                        <button className='btn'>
                                            View Details
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <></>
                    )
                }
            })}
        </div>
    );
};

export default Accordion;