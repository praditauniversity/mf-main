import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GANTT_DATA, GET_PROJECT_DATA } from "./Queries";

export function SumActual() {
    const { error, loading, data } = useQuery(GET_PROJECT_DATA);
    const [projectdata, setProject] = useState([]);
  
    useEffect(() => {
      if (data) {
        console.log("Data Ready");
        console.log(data);
        setProject(data.project.Data);
      } else {
        console.log("No data");
      }
    }, [data]);
  
    function printSumActual() {
      var sumAct = 0;
      var projectCurrency = "";
      projectdata.map((project) => {
        sumAct = sumAct + project.cost_actual;
        projectCurrency = project.currency_symbol;
      });
      return (
        <div>
          <p>
            {projectCurrency} {sumAct}
          </p>
        </div>
      );
    }
  
    return <div>{printSumActual()}</div>;
  }
  
  export function SumCost() {
    const { error, loading, data } = useQuery(GET_PROJECT_DATA);
    const [projectdata, setProject] = useState([]);
  
    useEffect(() => {
      if (data) {
        console.log("Data Ready");
        console.log(data);
        setProject(data.project.Data);
      } else {
        console.log("No data");
      }
    }, [data]);
  
    function printSumCost() {
      var sumCost = 0;
      var projectCurrency = "";
      projectdata.map((project) => {
        sumCost = sumCost + project.cost_plan;
        projectCurrency = project.currency_symbol;
      });
      return (
        <div>
          <p>
            {projectCurrency} {sumCost}
          </p>
        </div>
      );
    }
  
    return <div>{printSumCost()}</div>;
  }
  