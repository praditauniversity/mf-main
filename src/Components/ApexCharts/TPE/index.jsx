import React, { useState, useEffect } from "react";
import ListboxProject from "../../Listbox/ListboxProject/index.jsx";
import BarChart from "./chart.jsx";

const TPECard = () => {
    const [savedOption, setSavedOption] = useState(localStorage.getItem('TPEID')); 
    useEffect(() => {
        savedOption !=0? setSavedOption(savedOption) : setSavedOption(0);
    }, []);
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
                    <BarChart value={savedOption} />
                </div>
                <div className="py-4 flex justify-end">
                    <button className="font-semibold text-sm text-primary">
                        Detail Project Overview
                    </button>
                </div>
            </div>
        );
}

export default TPECard;