import React from "react";
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
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumAct % 1 !== 0 ? sumAct.toFixed(2) : sumAct}
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
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumCost % 1 !== 0 ? sumCost.toFixed(2) : sumCost}
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
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumBudget % 1 !== 0 ? sumBudget.toFixed(2) : sumBudget}
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
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumDanger % 1 !== 0 ? sumDanger.toFixed(2) : sumDanger}
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
    let sumVariance = 0;
    let projectCurrency = "";
    projectData.map((project) => {
      sumBudget = sumBudget + project.budget;
      sumAct = sumAct + project.cost_actual;
      const tempVariance = sumBudget - sumAct;
      sumVariance = tempVariance <= 0 ? tempVariance * -1 : 0;
      projectCurrency = projectData[0].currency_symbol ? projectData[0].currency_symbol : "N/A";
    });
    return (
      <div>
        <p>
          {projectCurrency} {sumVariance % 1 !== 0 ? sumVariance.toFixed(2) : sumVariance}
        </p>
      </div>
    );
  }

  return <div>{printSumVariance()}</div>;
}