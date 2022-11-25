import React from "react";
import { useQuery, gql } from '@apollo/client';
import AddProject from "./Project/add-project";

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;

function FetchProject() {
    const { loading, error, data } = useQuery(GET_PROJECT);
    if (localStorage.getItem('token') === null) {
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return data.project.Data.map(({ ID, name, description, user_id }) => (
        <div key={ID} className="
            justify-between items-center
            py-3 px-2 
            border-b border-slate-200 
            border-l-4 border-l-transparent
        ">

        <div className="flex items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex ml-2 items-center">
                <h3 className=" text-black-800 ">
                    {ID}. {name}:
                </h3>
                <p className=" text-gray-800 italic ml-2 ">
                    {description}
                </p>
            </div>

        </div>
        </div>
    ));
}

export default function Project() {
    const islogin = localStorage.getItem('token') !== null;
    if (islogin) {
        return (
            <div className="">
                <h1 className="text-sky-500">Project</h1>
                <AddProject />
                <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                    <h2>Fetched Project</h2>
                    <FetchProject />
                </div>
            </div>
        );
    }
    return (
        <div>
            <h1>Project</h1>
            <p>Not logged in</p>
        </div>
    );
}