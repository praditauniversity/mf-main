import React from 'react';
import Badge from '../../Badge/Badge';
import {IconDelete, IconEdit, IconInfo} from "../../../Components/Icons/icon";
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import "./table.css";
import ViewModalRole from '../../Modal/MasterPageModal/ViewModal/ViewModalRole';
import UpdateModalRole from '../../Modal/MasterPageModal/UpdateModal/UpdateModalRole';
import DeleteModalRole from '../../Modal/MasterPageModal/DeleteModal/DeleteModalRole';



const RoleLists = () => {
    const data = [
        {
            id: "34",
            name: "Admin",
            description: "Actually just admin",
            createdby: "Super Admin",
            color: "primary",
        },
        {
            id: "35",
            name: "User",
            description: "Actually just user",
            createdby: "Admin",
            color: "primary",
        },
        {
            id: "37",
            name: "Master",
            description: "Actually just master",
            createdby: "Admin",
            color: "primary",
        },
        {
            id: "49",
            name: "Manager",
            description: "Actually just manager",
            createdby: "Super Admin",
            color: "primary",
        },
        {
            id: "51",
            name: "Member",
            description: "Actually just member",
            createdby: "Super Admin",
            color: "primary",
        },
        {
            id: "62",
            name: "C-level",
            description: "Literally the C-level person",
            createdby: "Super Admin",
            color: "primary",
        },
        {
            id: "67",
            name: "Test",
            description: "Test only",
            createdby: "Super Admin",
            color: "primary",
        },
    ];
    return (
        <div className="rounded-xl shadow-lg bg-white pt-6">
            <TableHeader placeholder="Search Roles" modalname="Role Modal" />
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full table-hover h-1/3">
                    <thead>
                        <tr>
                            <th align="center" className="opacity-70">No</th>
                            <th align="center" className="opacity-70">ID</th>
                            <th align="center" className="opacity-70">Role Name</th>
                            <th align="center" className="opacity-70">Description</th>
                            <th align="center" className="opacity-70">Created By</th>
                            <th align="center" className="opacity-70">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td align="center" className="font-semibold">{index + 1}</td>
                                <td align="center" className="font-semibold">{item.id}</td>
                                <td align="center" className="font-semibold"><Badge color={item.color} text={item.name}/></td>
                                <td align="center" className="font-semibold">{item.description}</td>
                                <td align="center" className="font-semibold">{item.createdby}</td>
                                <td align="center">
                                    <button className="px-1" id="icon">
                                        <ViewModalRole 
                                            roleId={item.id}
                                            roleName={item.name}
                                            roleDescription={item.description}
                                            roleColor={item.color}
                                        />
                                    </button>
                                    <button className="px-1" id="icon">
                                        <UpdateModalRole
                                            roleId={item.id}   
                                            roleName={item.name}
                                            roleDescription={item.description}
                                            roleColor={item.color}
                                        />
                                    </button>
                                    <button className="px-1" id="icon">
                                        <DeleteModalRole
                                            roleId={item.id}
                                            roleName={item.name}
                                            roleDescription={item.description}
                                            roleColor={item.color}
                                        />
                                    </button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <TableFooter />
        </div>
    );
}

export default RoleLists;