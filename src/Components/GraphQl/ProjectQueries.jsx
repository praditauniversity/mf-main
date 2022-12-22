import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GANTT_DATA, GET_PROJECT_DATA } from "./Queries";
import { functionalUpdate } from "react-table";
import GetProfile from "../Auth/GetProfile";

export function SumActual() {
  const profile = GetProfile();
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
      if (profile.id === project.user_id) {
        sumAct = sumAct + project.cost_actual;
        projectCurrency = project.currency_symbol;
      } 
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumAct.toFixed(2)}
        </p>
      </div>
    );
  }

  return <div>{printSumActual()}</div>;
}

export function SumCost() {
  const profile = GetProfile();
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
      if (profile.id === project.user_id) {
        sumCost = sumCost + project.cost_plan;
        projectCurrency = project.currency_symbol;
      } 
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumCost.toFixed(2)}
        </p>
      </div>
    );
  }

  return <div>{printSumCost()}</div>;
}

export function SumBudget() {
  const profile = GetProfile();
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
      if (profile.id === project.user_id) {
        sumBudget = sumBudget + project.budget;
        projectCurrency = project.currency_symbol;
      } 
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumBudget.toFixed(2)}
        </p>
      </div>
    );
  }

  return <div>{printSumBudget()}</div>;
}

export function SumDanger(){
  const profile = GetProfile();
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
    var sumAct = 0;
    var sumCost = 0;
    var sumDanger = 0;
    var projectCurrency = "";
    projectdata.map((project) => {
      if (profile.id === project.user_id) {
        sumAct = sumAct + project.cost_actual;
        sumCost = sumCost + project.cost_plan;
        sumDanger = sumAct - sumCost;
        projectCurrency = project.currency_symbol;
      } 
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumDanger.toFixed(2)}
        </p>
      </div>
    );
  }

  return <div>{printSumDanger()}</div>;
}

export function Variance(){
  const profile = GetProfile();
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
    var sumBudget = 0;
    var sumAct = 0;
    var variance = 0;
    var projectCurrency = "";
    projectdata.map((project) => {
      if (profile.id === project.user_id) {
        sumBudget = sumBudget + project.budget;
        sumAct = sumAct + project.cost_actual;
        variance = sumBudget - sumAct;
        projectCurrency = project.currency_symbol;
      } 
    });
    return (
      <div>
        <p>
          {projectCurrency} {variance.toFixed(2)}
        </p>
      </div>
    );
  }

  return <div>{printVariance()}</div>;
}