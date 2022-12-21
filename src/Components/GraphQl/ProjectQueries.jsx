import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GANTT_DATA, GET_PROJECT_DATA } from "./Queries";
import { functionalUpdate } from "react-table";

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

export function SumBudget() {
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

  function printSumBudget() {
    var sumBudget = 0;
    var projectCurrency = "";
    projectdata.map((project) => {
      sumBudget = sumBudget + project.budget;
      projectCurrency = project.currency_symbol;
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumBudget}
        </p>
      </div>
    );
  }

  return <div>{printSumBudget()}</div>;
}

export function SumDanger(){
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

  function printSumDanger() {
    var sumDanger = 0;
    var projectCurrency = "";
    projectdata.map((project) => {
      sumDanger = project.cost_actual - project.cost_plan;
      projectCurrency = project.currency_symbol;
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumDanger}
        </p>
      </div>
    );
  }

  return <div>{printSumDanger()}</div>;
}

export function Variance(){
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

  function printVariance() {
    var variance = 0;
    var projectCurrency = "";
    projectdata.map((project) => {
      variance = project.budget - project.cost_actual;
      projectCurrency = project.currency_symbol;
    });
    return (
      <div>
        <p>
          {projectCurrency} {variance}
        </p>
      </div>
    );
  }

  return <div>{printVariance()}</div>;
}