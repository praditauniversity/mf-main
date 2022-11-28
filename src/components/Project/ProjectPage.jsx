import React from "react";
import CrudProject from "./crud-project";
import { RenderProject } from "./FetchProject";
import Responses from "../../Responses";


const Project = () => {
    const islogin = sessionStorage.getItem('token') !== null;
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