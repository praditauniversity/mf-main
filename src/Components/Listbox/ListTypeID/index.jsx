import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TYPE_DATA } from '../../GraphQL/Queries';

const ListProjectType = () => {
    const [typeID, setTypeID] = React.useState(localStorage.getItem('typeID') ? localStorage.getItem('typeID') : "1");

    useEffect(() => {
        localStorage.setItem('typeID', typeID);
        console.log("typeID", typeID);
    }, [typeID]);

    function printListTypeName() {
        const { data, loading, error } = useQuery(GET_TYPE_DATA);
        const [typeName, setTypeName] = useState([]);
        // if (loading) return <p>Loading...</p>;
        // if (error) return <p>Error :(</p>;

        useEffect(() => {
            if (data) {
                console.log("Data Ready list type");
                setTypeName(data.projectType.Data);
                console.log("Data Ready", data.projectType.Data);
            } else {
                console.log("No data list type");
            }
            console.log("USE EFFECT list type");
        }, [data]);

        return typeName.map(({ ID, name }) => (
            <>
                {/* {console.log("ID VALUE TYPE", typeof ID)} */}
                {/* {console.log("ID VALUE TYPE", typeof ID.toString())} */}
                <option value={ID}>{name}</option>
            </>
        ));
    }

    const handleChange = (event) => {
        setTypeID(event.target.value);
        window.location.reload();
        // localStorage.setItem('selectedOption', selectedOption);
    };

    return (
        <div className="flex flex-col items-center">
            <select value={typeID} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                {/* <option value="1">Project Anomaly</option>
                <option value="2">Project Alpha</option>
                <option value="3">Project Beta</option>
                <option value="4">Project Gamma</option> */}
                {printListTypeName()}
            </select>
            {/* {<Actual value={selectedOption} />} */}
            {console.log("OPTION val project id:", typeof typeID, typeID)}
            {console.log("OPTION val type id:", typeof typeID, typeID)}
        </div>
    );
}

export default ListProjectType;