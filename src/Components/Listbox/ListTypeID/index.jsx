import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TYPE_DATA } from '../../GraphQL/Queries';

const ListProjectType = () => {
    const [typeID, setTypeID] = React.useState(localStorage.getItem('typeID') ? localStorage.getItem('typeID') : "1");

    useEffect(() => {
        localStorage.setItem('typeID', typeID);
    }, [typeID]);

    function printListTypeName() {
        const { data, loading, error } = useQuery(GET_TYPE_DATA, {
            pollInterval: 1000,
        });
        const [typeName, setTypeName] = useState([]);

        useEffect(() => {
            if (data) {
                setTypeName(data.projectType.Data);
            } else {
                console.log("No data list type");
            }
        }, [data]);

        return typeName.map(({ ID, name }) => (
            <>
                <option value={ID}>{name}</option>
            </>
        ));
    }

    const handleChange = (event) => {
        setTypeID(event.target.value);
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center">
            <select value={typeID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                {printListTypeName()}
            </select>
        </div>
    );
}

export default ListProjectType;