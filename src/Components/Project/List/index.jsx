import React from "react";
import subtask from "../../../Assets/Icons/svg/Subtask_bw.svg";

const ListProject = [
    {
        id: 1,
        name: "Project 1",
        description: "Description 1",
        location: "Location 1",
        job: "Job 1",
        company: "Company 1",
        link: "/#/projectdashboard/1",
        favoriteColor: "Red",
    },
    {
        id: 2,
        name: "Project 2",
        description: "Description 1",
        location: "Location 2",
        job: "Job 2",
        company: "Company 2",
        link: "/#/projectdashboard/2",
        favoriteColor: "Blue",
    },
    {
        id: 3,
        name: "Project 3",
        description: "Description 1",
        location: "Location 3",
        job: "Job 3",
        company: "Company 3",
        link: "/#/projectdashboard/3",
        favoriteColor: "Green",
    }
]

const TableHeader = () => {
    return (
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Favorite Color</th>
            <th>Actions</th>
            <th></th>
        </tr>
    )
}

const ActionsButton = () => {
    const buttonName = [
        { name: "Gantt", icon: subtask, },
        { name: "Project Charter", icon: subtask, },
        { name: "Daily Report", icon: subtask, }
    ]

    return (
        <>
            {buttonName.map((button) => (
                <div className="tooltip" data-tip={button.name}>
                    <img
                        src={button.icon}
                        alt={button.name}
                        className="w-6 h-6 opacity-75 hover:opacity-100"
                    />
                </div>
            ))}
        </>
    )
}


const ProjectListPage = (props) => {
    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4 flex min-full">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <TableHeader />
                    </thead>
                    <tbody>
                        {ListProject.map((project) => (
                            <tr key={project.id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{project.name}</div>
                                            <div className="text-sm opacity-50">{project.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {project.description}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{project.job}</span>
                                </td>
                                <td>{project.favoriteColor}</td>
                                <th
                                    className="space-x-2"
                                >
                                    <ActionsButton />
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <TableHeader />
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ProjectListPage;
