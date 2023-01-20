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
    var sumAct = 0;
    var projectCurrency = "";
    projectData.map((project) => {
      sumAct = sumAct + project.cost_actual;
      projectCurrency = project.currency_symbol;
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
    var sumCost = 0;
    var projectCurrency = "";
    projectData.map((project) => {
      sumCost = sumCost + project.cost_plan;
      projectCurrency = project.currency_symbol;
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
    var sumBudget = 0;
    var projectCurrency = "";
    projectData.map((project) => {
      sumBudget = sumBudget + project.budget;
      projectCurrency = project.currency_symbol;
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
    var sumAct = 0;
    var sumCost = 0;
    var sumDanger = 0;
    var projectCurrency = "";
    projectData.map((project) => {
      sumAct = sumAct + project.cost_actual;
      sumCost = sumCost + project.cost_plan;
      sumDanger = sumAct - sumCost;
      projectCurrency = project.currency_symbol;
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
    var sumBudget = 0;
    var sumAct = 0;
    var variance = 0;
    var projectCurrency = "";
    projectData.map((project) => {
      sumBudget = sumBudget + project.budget;
      sumAct = sumAct + project.cost_actual;
      variance = sumBudget - sumAct;
      projectCurrency = project.currency_symbol;
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