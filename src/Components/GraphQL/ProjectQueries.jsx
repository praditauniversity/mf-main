import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT_DATA_BY_USER_ID } from "./Queries";
import { functionalUpdate } from "react-table";
import GetProfile from "../Auth/GetProfile";
import FetchProjectByUserId from "../../Middleware/Fetchers/FetchProjectByUserId";

export function SumActual() {
  const profile = GetProfile();
  const projectData = FetchProjectByUserId(); 

  function printSumActual() {
    let sumAct = 0;
    let projectCurrency = "";
    projectData.map((project) => {
      sumAct = sumAct + project.cost_actual;
      // projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
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
  const projectData = FetchProjectByUserId();

  function printSumCost() {
    let sumCost = 0;
    let projectCurrency = "";
    projectData.map((project) => {
      sumCost = sumCost + project.cost_plan;
      // projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
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
  const projectData = FetchProjectByUserId();

  function printSumBudget() {
    let sumBudget = 0;
    let projectCurrency = "";
    projectData.map((project) => {
      sumBudget = sumBudget + project.budget;
      // projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
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

export function SumDanger() {
  const profile = GetProfile();
  const projectData = FetchProjectByUserId();

  function printSumDanger() {
    let sumAct = 0;
    let sumCost = 0;
    let sumDanger = 0;
    let projectCurrency = "";
    projectData.map((project) => {
      sumAct = sumAct + project.cost_actual;
      sumCost = sumCost + project.cost_plan;
      const tempDanger = sumCost - sumAct;
                sumDanger = tempDanger <= 0 ? tempDanger * -1 : 0;
      // projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
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

export function SumVariance() {
  const profile = GetProfile();
  const projectData = FetchProjectByUserId();

  function printSumVariance() {
    let sumBudget = 0;
    let sumAct = 0;
    let variance = 0;
    let projectCurrency = "";
    projectData.map((project) => {
      sumBudget = sumBudget + project.budget;
      sumAct = sumAct + project.cost_actual;
      variance = sumBudget - sumAct;
      // projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
    });
    return (
      <div>
        <p>
          {projectCurrency} {variance.toFixed(2)}
        </p>
      </div>
    );
  }

  return <div>{printSumVariance()}</div>;
}