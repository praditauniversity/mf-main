import React from 'react';
import Badge from '../../Badge/Badge';
import {IconDelete, IconEdit, IconInfo} from "../../../Components/Icons/icon";
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import "./table.css";

const UserLists = () => {
    const data = [
        {
            id: "34",
            name: "Alisah Natalie",
            company: "PT. Raksa Jaya Serbaguna",
            role: "Admin",
            position: "Project Manager",
            color: "primary",
        },
    ];
    return (
        <div className="rounded-xl shadow-lg bg-white pt-6">
            <TableHeader placeholder="Search Users" modalname="User Modal" />
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full table-hover h-1/3">
                    <thead>
                        <tr>
                            <th align="center" className="opacity-70">No</th>
                            <th align="center" className="opacity-70">Full Name</th>
                            <th align="center" className="opacity-70">Company</th>
                            <th align="center" className="opacity-70">Role</th>
                            <th align="center" className="opacity-70">Jabatan</th>
                            <th align="center" className="opacity-70">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td align="center" className="font-semibold">{index + 1}</td>
                                <td align="center" className="font-semibold">{item.name}</td>
                                <td align="center" className="font-semibold">{item.company}</td>
                                <td align="center" className="font-semibold"><Badge color={item.color} text={item.role}/></td>
                                <td align="center" className="font-semibold">{item.position}</td>
                                <td align="center">
                                    <button className="px-1" id="icon">
                                        <IconEdit />
                                    </button>
                                    <button className="px-1" id="icon">
                                        <IconDelete />
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

export default UserLists;