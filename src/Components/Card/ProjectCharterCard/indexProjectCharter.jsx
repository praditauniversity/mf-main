import React, { useState } from "react";
import { IconSearch } from "../../Icons/icon";
import '../../../Assets/svgbutton/svgbutton.css'
import TableFooter from "./TableFooter";
import PCList from "./ListProjectCharterPage";
import FetchProjectByUserId from "../../../Middleware/Fetchers/FetchProjectByUserId";
import { useEffect } from "react";
import FutureUpdateFilter from "../../Modal/FutureUpdateModal/Filter/FutureUpdateFilter";

const ProjectCharterPage = (props) => {
    const { icon } = props;
    const iconA = <IconSearch />;

    const [page, setPage] = useState(1);

    const projectData = FetchProjectByUserId();

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5) // hardcode
    const [totalItems, setTotalItems] = useState(0)

    useEffect (() => {
        if (projectData) {
            setTotalItems(projectData.length)
        } else {
            console.log("Data Project Charter null");
        }
    }, [projectData])

    const totalPages = Math.ceil(totalItems / itemsPerPage) ? Math.ceil(totalItems / itemsPerPage) : 1

    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage)      
    }
    
    const increaseTotalItems = () => {
        setTotalItems(totalItems + 1);
    };

    const decreaseTotalItems = () => {
        setTotalItems(totalItems - 1);
    };

    return (
        <div className="rounded-xl shadow-lg bg-white py-4 px-4">
            {/* Snackbar */}
            <div id="snackbar">Project created successfully!</div>
            <div id="snackbarupd">Project updated successfully!</div>
            <div id="snackbardel">Project deleted successfully!</div>
            <div>
                <div className="pt-4 pb-0 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-xl font-semibold px-2">Project Charter</p>
                    </div>
                </div>

                <div className="px-8">
                    <div className="py-10">
                        <div>
                            <div className="py-2 w-full bg-grey-light text-center">
                                <p className="text-sm font-semibold opacity-70">Charter List</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="content-end items-end text-right">
                            <div className="flex justify-end align-middle items-center text-center">
                                <input
                                    className="form-control shadow appearance-none border rounded py-1 px-3 text-darkest leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder={"Search"}
                                />
                                <div className="px-1" id="icon"><FutureUpdateFilter/></div>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="2xl:col-span-15 col-span-12">
                            <PCList 
                                page={currentPage} 
                                limit={itemsPerPage} 
                                sort="ID asc" 
                                totalItems={totalItems} 
                                updateTotalItems={decreaseTotalItems} 
                                onPageChange={handlePageChange} 
                                totalPages={totalPages} 
                            />
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="content-end items-end">
                            <TableFooter
                                limit={itemsPerPage} 
                                sort="ID asc"
                                totalItems={totalItems}
                                updateTotalItems={increaseTotalItems}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectCharterPage;
