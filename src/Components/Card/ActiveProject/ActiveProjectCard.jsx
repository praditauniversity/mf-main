import React from "react";

//ini gabisa
const useStyles = () => ({
    gridHeight: {
        height: '1000px'
    }
})

const ActiveProjectCard = () => {
    const classes = useStyles();

    return (
        <div className="rounded-xl shadow-sm bg-white">
            <div>
                <div className="pt-8 pb-8 pl-12 pr-12 flex justify-between">
                    <div className="flex justify-start">
                        <p className="text-lg font-semibold ">Active Projects</p>
                    </div>
                </div>
            </div>
            <div className="h-96 border-t-2 border-b-2">
                <div className="pt-6 pb-6 pl-12 pr-12">
                    <div className="pt-4">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <p className="text-base font-semibold ">Solar Panel Smart Lab</p>
                            </div>
                            <div className="flex justify-end">
                                <div className="dropdown dropdown-button">
                                    {/* <button tabIndex={0} className="btn btn-outline text-xs">:</button> */}
                                    <button tabIndex={0} className="text-base font-black">:</button>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                        <li><a>Edit</a></li>
                                        <li><a>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs opacity-70 align-text-bottom">Sulawesi Selatan</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <p className="text-base font-semibold ">Winter Wonderland</p>
                            </div>
                            <div className="flex justify-end">
                                <div className="dropdown dropdown-button">
                                    {/* <button tabIndex={0} className="btn btn-outline text-xs">:</button> */}
                                    <button tabIndex={0} className="text-base font-black">:</button>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                        <li><a>Edit</a></li>
                                        <li><a>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs opacity-70 align-text-bottom">Singapore</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <p className="text-base font-semibold ">Reverie Product...</p>
                            </div>
                            <div className="flex justify-end">
                                <div className="dropdown dropdown-button">
                                    {/* <button tabIndex={0} className="btn btn-outline text-xs">:</button> */}
                                    <button tabIndex={0} className="text-base font-black">:</button>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                        <li><a>Edit</a></li>
                                        <li><a>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs opacity-70 align-text-bottom">Jakarta Barat</p>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <p className="text-base font-semibold ">Meraki Development</p>
                            </div>
                            <div className="flex justify-end">
                                <div className="dropdown dropdown-button">
                                    {/* <button tabIndex={0} className="btn btn-outline text-xs">:</button> */}
                                    <button tabIndex={0} className="text-base font-black">:</button>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                                        <li><a>Edit</a></li>
                                        <li><a>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs opacity-70 align-text-bottom">Kalimantan Utara</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-8 pb-8 pl-12 pr-12 flex justify-end">
                <button className="font-semibold text-sm text-primary">
                    View All Projects
                </button>
            </div>
        </div>
    )

}

export default ActiveProjectCard;