import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT_DATA_BY_ID } from "./Queries";
import { functionalUpdate } from "react-table";
import GetProfile from "../Auth/GetProfile";

export function Actual(props) {
    const profile = GetProfile();
    const {value} = props;
    console.log("Value: " + value);
    const { data, loading, error } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value },
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
      if (data) {
        console.log("Data Ready");
        setProject(data.project.Data);
        console.log(projectData);
      } else {
        console.log("No data");
      }
    }, [data]);
  
    function printActual() {
        // const [item, setItem] = useState(null);
        // const [id, setId] = useState(value);

        // useEffect(() => {
        //     const filteredItem = projectData.filter(item => item.id === id)[0];
        //     setItem(filteredItem);
        // }, [id]);

        var act = 0;
        var projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                act = project.cost_actual;
                projectCurrency = project.currency_symbol;
                // act = item.cost_actual;
                // projectCurrency = item.currency_symbol;
            } 
        });
        return (
            <div>
            <p>
                {projectCurrency} {act.toFixed(2)}
            </p>
            </div>
        );
    }
    
    return <div>{printActual()}</div>;
}

// export function projectDetails(props) {
//     const {id} = props;
//     const { data, loading, error } = useQuery(GET_PROJECT_DATA_BY_ID, {
//       variables: { id: props.id },
//     });
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error!</p>;
  
//     return (
//       <div>
//         <h1>{data.project.name}</h1>
//         {/* render other project details */}
//       </div>
//     );
//   }