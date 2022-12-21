import React from "react";
import AddProject from "./Operation/AddProject";
import DeleteProject from "./Operation/DeleteProject";
import UpdateProject from "./Operation/UpdateProject";

const HeadingOne = ({ label }) => {
    return (
        <label className="block py-2 mb-4 text-md uppercase font-bold text-gray-800 tracking-widest">{label}</label>
    );
}

const CrudProject = () => {
    const projectAction = [
        {
            label: "Add Project",
            component: <AddProject />
        },
        {
            label: "Update Project",
            component: <UpdateProject />
        },
        {
            label: "Delete Project",
            component: <DeleteProject />
        }
    ];

    return (
        <div className="max-w-sm mx-auto my-10 rounded-xl sm:max-w-lg">
            {projectAction.map((action, index) => (
                <div key={index} className="max-w-sm mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 sm:max-w-lg">
                    <HeadingOne label={action.label} />
                    {action.component}
                </div>
            ))}
        </div>
    );

}

export default CrudProject;