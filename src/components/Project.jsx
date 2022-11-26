import React from "react";
import { useQuery, gql } from '@apollo/client';
import CrudProject from "./Project/crud-project";
import Responses from "../Responses";
import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;

function FetchProject() {
    const { loading, error, data } = useQuery(GET_PROJECT);
    if (loading) return <Skeleton />;
    if (error) return <p>Error</p>;

    return data.project.Data.map(({ ID, name, description, user_id }) => (
        <div key={ID} className="
            justify-between items-center
            py-3 px-2 
            border-b border-slate-200 
            border-l-4 border-l-transparent
        ">

        <div className="flex items-center ">
            {/* <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> */}
            <div className="flex ml-2 items-center">
                <div className=" text-gray-800 flex">
                    <p className="pr-2"> {ID}. </p>
                    <p> {name}: </p>
                </div>
                <p className=" text-gray-600 italic ml-2 ">
                    {description}
                </p>
            </div>

        </div>
        </div>
    ));
}


export default function Project() {
    // const islogin = localStorage.getItem('token') !== null;
    const islogin = sessionStorage.getItem('token') !== null;
    const HeaderProject = () => {
        return (
            <center>
                <h1 className="text-2xl uppercase tracking-widest font-bold w-screen mt-16"> Project </h1>
            </center>
        );
    }

    if (islogin) {
        return (
            <div>
                <HeaderProject />
                <CrudProject />
                <div className="max-w-sm mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg">
                    <p className="font-bold text-md tracking-widest uppercase">Fetched Project</p>
                    <p className="mb-8 italic text-sm">List of the project available.</p>
                    <FetchProject />
                </div>
            </div>
        );
    }
    return (
        <div> {Responses(401)} </div>
    );
}