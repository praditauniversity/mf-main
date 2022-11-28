import React, {useEffect,useState} from "react";
import { useQuery, gql } from '@apollo/client';

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;

export const FetchProject = () => {
    const { data } = useQuery(GET_PROJECT);
    const [project, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            setProject(data.project.Data);
        }
    }
    , [data]);
    return project;
}

export const RenderProject = () => {
    const project = FetchProject();
    return project ? project.map(({ ID, name, description }) => (
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
    )) : null;
}