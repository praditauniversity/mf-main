import React, { useEffect, useState } from "react";
import ListboxProject from "../../Listbox/ListboxProject/index.jsx";
import DetailTPE from "../../Modal/FutureUpdateModal/DetailTPE/DetailTPE.jsx";
import BarChart from "./chart.jsx";

const TPECard = () => {
    const [TpeID,setTPEID] = useState(localStorage.getItem('TPEID'));
    useEffect(() => {
        setTPEID(localStorage.getItem('TPEID'));
    }, [TpeID]);
    return (
        <div className="rounded-xl shadow-lg bg-white py-6 px-12">
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <div className="flex justify-start">
                            <p className="text-sm place-self-center">Total Project Expenditure</p>
                            {/* <p className="text-sm ml-1">By Duration</p> */}
                        </div>
                        <div className="flex justify-end">
                            {/* <p className="text-sm ">Solar Panel Smart Lab</p> */}
                            <div className="mb-1">
                                <ListboxProject />
                            </div>
                        </div>
                    </div>
                    <div className="pt-1 pb-4 flex justify-start">
                        <p className="text-xl font-semibold text-white ">2.597</p>
                        <p className="text-xs opacity-70 align-text-bottom text-white">Human</p>
                    </div>
                </div>
                <div className="py-4">
                    <BarChart value={TpeID} />
                </div>
                <div className="py-4 flex justify-end">
                    {/* <button className="font-semibold text-sm text-primary">
                        Detail Project Overview
                    </button> */}
                    <DetailTPE />
                </div>
            </div>
        );
    }
    
    export default TPECard;