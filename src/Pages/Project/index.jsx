import React from "react";
import CrudProject from "../../Components/Project/crud-project";
import Responses from "../Responses";
import FetchProject from "../../Middleware/Fetchers/FetchProject";
import GetProfile from "../../Components/Auth/GetProfile";

export const RenderProject = () => {
    const profile = GetProfile();
    const project = FetchProject();

    return project ? project.map(({ ID, name, description, user_id }) => (
        <>
        <div key={ID} className="py-3 px-2 border-b border-slate-200">
            <div className="flex items-center ">
                <div className="flex ml-2 items-center">
                    <div className=" text-gray-800 flex">
                        <p className="pr-2"> {ID}. </p> <p> {name}: </p>
                    </div>
                    <p className=" text-gray-600 italic ml-2 "> {description} </p>
                </div>
            </div>
        </div>
        </>
    )) : (
        <div>You don't have any project yet. Please create one.</div>
    );
}

const Project = () => {
    const islogin = localStorage.getItem('token') !== null;
    const HeaderProject = () => {
        return (
            <center>
                <h1 className="text-2xl uppercase tracking-widest font-bold mt-16"> Project </h1>
            </center>
        );
    }

    if (islogin) {
        return (
            <div>
                <HeaderProject />
                <CrudProject />
                <div className="bg-white max-w-sm mx-auto my-10 p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg">
                    <p className="font-bold text-md tracking-widest uppercase">Fetched Project</p>
                    <p className="mb-8 italic text-sm">List of the project available.</p>
                    <RenderProject />
                </div>
            </div>
        );
    }
    return (
        <div> {Responses(401)} </div>
    );
}

export default Project;