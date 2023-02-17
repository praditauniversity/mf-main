import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GetProfile from "../../Auth/GetProfile.jsx";
import { GET_PROJECT_DATA_BY_USER_ID } from "../../GraphQL/Queries.jsx";
import ListboxProject from "../../Listbox/ListboxProject/index.jsx";
import DetailTPE from "../../Modal/FutureUpdateModal/DetailTPE/DetailTPE.jsx";
import BarChart from "./chart.jsx";

const TPECard = () => {
    const profile = GetProfile();
    const { data, refetch } = useQuery(GET_PROJECT_DATA_BY_USER_ID, {
        variables: { userId: profile.id, sort: "ID asc" },
    });
    const [TpeID,setTPEID] = useState(localStorage.getItem('TPEID'));
    console.log("TPECard TpeID",TpeID)
    useEffect(() => {
        if (data) {
            setTPEID(localStorage.getItem('TPEID'));
            if (data.projectByUserId.Data.length !== 0) {

                //if local storage is empty, set to first project id
                localStorage.getItem('TPEID') === null ? localStorage.setItem('TPEID', data.projectByUserId.Data[0].ID) : console.log("TpeID is not null");
                TpeID === null ? setTPEID(data.projectByUserId.Data[0].ID) : setTPEID(localStorage.getItem('TPEID'));
            }
            if (data.projectByUserId.Data.length === 0){
                localStorage.removeItem('TPEID');
            }
        }

        refetch({ userId: String(profile.id), sort: "ID asc" });
    }, [TpeID,data]);
    console.log("TPECard TpeID AFTER",TpeID)
    return (
        <div className="rounded-xl shadow-lg bg-white py-6 px-12">
        {console.log("RENDER TPECARD")}
                <div>
                    <div className="pt-4 pb-0 flex justify-between">
                        <div className="flex justify-start">
                            <p className="text-sm place-self-center">Total Project Expenditure</p>
                        </div>
                        <div className="flex justify-end">
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
                    <DetailTPE />
                </div>
            </div>
        );
    }
    
    export default TPECard;