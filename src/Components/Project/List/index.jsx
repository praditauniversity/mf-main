import React from "react";
import dailyReportIcon from "../../../Assets/Icons/svg/File_dock_duotone.svg";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";
import FetchProjectCharter from "../../../Middleware/Fetchers/FetchProjectCharter";

const ListProject = [
    {
        id: 1,
        name: "Project 1",
        description: "Description 1",
        location: "Location 1",
        jobs: [
            {
                id: 11,
                name: "Job 1",
            },
            {
                id: 12,
                name: "Job 2",
            }
        ],
        company: "Company 1",
        link: "/#/projectdashboard/1",
        favoriteColor: "Red",
    },
    {
        id: 2,
        name: "Project 2",
        description: "Description 1",
        location: "Location 2",
        jobs: [
            {
                id: 21,
                name: "Job 1",
            },
            {
                id: 22,
                name: "Job 2",
            }
        ],
        company: "Company 2",
        link: "/#/projectdashboard/2",
        favoriteColor: "Blue",
    },
    {
        id: 3,
        name: "Project 3",
        description: "Description 1",
        location: "Location 3",
        jobs: [
            {
                id: 31,
                name: "Job 1",
            }
        ],
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
            <th>Project Manager</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Action Badge</th>
            <th></th>
        </tr>
    )
}

const ActionsButton = (props) => {
    const { projectID_Table } = props;

    const buttonName = [
        { id: 1, name: "Project Charter", icon: dailyReportIcon, link: `/#/project-list/${projectID_Table}/charter` },
        { id: 2, name: "Gantt", icon: dailyReportIcon, link: `/#/project-list/${projectID_Table}/gantt` }, // TODO: Change this link to gantt
        { id: 3, name: "Daily Report", icon: dailyReportIcon, link: "/#/dailyreport" },
    ]

    return (
        <>
            {buttonName.map((button) => (
                <a
                    key={button.id}
                    className="badge badge-ghost badge-sm cursor-pointer"
                    href={button.link}
                    //if key is 3, then set the local storage of dailyreport's projectId to the projectID_Table
                    onClick={() => button.id === 3 ? localStorage.setItem('reportProjectID', projectID_Table) : null}
                >
                    <img
                        src={button.icon}
                        alt={button.name}
                        className="w-4 h-4 opacity-75 hover:opacity-100"
                    />
                    <span className="ml-1 mr-1">
                        {button.name}
                    </span>
                </a>
            ))}

        </>
    )
}


const ProjectListPage = () => {
    const projectData = FetchProjectByUserId();

    const filler = () => {
        if (projectData.length > 0) {
            // fill the table with white space
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400 opacity-10 hover:opacity-40 hover:cursor-pointer">
                            <div className="text-4xl font-bold">Other Project</div>
                            <div className="text-md">Add another project?</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }
    const ifProjectDataEmpty = () => {
        if (projectData.length === 0) {
            // fill the table with white space
            return (
                <tr className="h-full" >
                    <td colSpan="7" className="text-center ">
                        <div className="text-gray-400">
                            <div className="text-5xl font-bold">No Project</div>
                            <div className="text-xl">Please add a project</div>
                        </div>
                    </td>
                </tr>
            )
        }
    }

    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4 flex h-full">
            <div className="overflow-y-auto overflow-x-auto w-full h-full">
                <table className="table w-full h-full">
                    {/* <!-- head --> */}
                    <thead>
                        <TableHeader />
                    </thead>
                    {/* <!-- body --> */}
                    <tbody>
                        {projectData.map((project) => (
                            <tr key={project.ID}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{project.name}</div>
                                            <div className="text-sm opacity-50">{project.work_area ? project.work_area : "N/A"}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="truncate w-56 whitespace-nowrap text-ellipsis overflow-hidden">
                                        {project.description ? project.description : "N/A"}
                                    </p>
                                    <span className="badge badge-ghost badge-sm">
                                        project
                                    </span>
                                </td>
                                <td>
                                    <div
                                        className="badge badge-ghost badge-lg cursor-pointer"
                                    >
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral-focus text-neutral-content rounded-full w-4">
                                                {/* take the first alphabet */}
                                                <span className="text-xs uppercase">{project.project_manager[0]}</span>
                                            </div>
                                        </div>
                                        <a
                                            onClick={() => { console.log("click") }}
                                            href="#/useraccount"
                                            className="ml-2 ">
                                            {project.project_manager}
                                        </a>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            {/*parsing from 2023-01-05T04:04:48.377Z to 05 January 2023 */}
                                            <div className="font-bold">{new Date(project.start_project).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
                                            <div className="text-sm opacity-50">{new Date(project.end_project).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            {/* calculate duration */}
                                            {/* <div className="font-bold">{Math.round((new Date(project.end_project) - new Date(project.start_project)) / (1000 * 60 * 60 * 24))} days</div> */}
                                            <div className="font-bold">{project.project_duration} days</div>
                                            <div className="text-sm opacity-50">Duration Project</div>

                                        </div>
                                    </div>
                                </td>
                                {/* maximum 48 pixel width, otherwise it will be on the next line */}
                                <th className="space-x-2 w-48">
                                    <ActionsButton projectID_Table={project.ID} />
                                </th>
                            </tr>
                        ))}
                        {ifProjectDataEmpty()}
                        {filler()}
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
