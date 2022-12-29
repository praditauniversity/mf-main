import React, { useEffect, useState } from 'react';
import GetProfile from '../../Auth/GetProfile';
import { useQuery, gql } from '@apollo/client';
import { GET_PROJECT_DATA } from '../../GraphQl/Queries'; 
import { Actual } from '../../GraphQl/ProjectByIdQueries';

const ListboxProjectName = () => {
    const [ selectedOption, setSelectedOption ] = React.useState(localStorage.getItem('selectedOption')? localStorage.getItem('selectedOption') : "1");
    
    useEffect(() => {
        // Update the selectedOption value in local storage whenever it changes
        localStorage.setItem('selectedOption', selectedOption);
        console.log("selectedOption", selectedOption);
    }, [selectedOption]);

    function printListProjectName() {
        const profile = GetProfile();
        const { loading, error, data } = useQuery(GET_PROJECT_DATA);
        const [projectData, setProject] = useState([]);
        // if (loading) return <p>Loading...</p>;
        // if (error) return <p>Error :(</p>;

        useEffect(() => {
            if (data) {
                console.log("Data Ready");
                setProject(data.project.Data);
            } else {
                console.log("No data");
            }
        }, [data]);
        
        return projectData.map(({ ID, name, user_id }) => (
            <>
            {/* {console.log("ID VALUE TYPE", typeof ID)} */}
            {/* {console.log("ID VALUE TYPE", typeof ID.toString())} */}
            {profile.id === user_id ? (
                <option value={ID}>{name}</option>
            ) : (
                <option></option>
            )}
            </>
        ));
    }

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        window.location.reload();   
        // localStorage.setItem('selectedOption', selectedOption);
    };

    return (
        <div className="flex flex-col items-center">
            <select value={selectedOption} onChange={handleChange} className="select select-ghost select-sm w-full max-w-lg">
                {/* <option value="1">Project Anomaly</option>
                <option value="2">Project Alpha</option>
                <option value="3">Project Beta</option>
                <option value="4">Project Gamma</option> */}
                {printListProjectName()}
            </select>
            {/* {<Actual value={selectedOption} />} */}
            {console.log("OPTION val:", typeof selectedOption, selectedOption)}
        </div>
    );
}

export default ListboxProjectName;