import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_DATA_BY_ID } from "./Queries";
import { functionalUpdate } from "react-table";
import GetProfile from "../Auth/GetProfile";

export function Actual(props) {
    const profile = GetProfile();
    const { value } = props;
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
        var act = 0;
        var projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                act = project.cost_actual;
                projectCurrency = project.currency_symbol;
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

export function Cost(props) {
    const profile = GetProfile();
    const { value } = props;
    // console.log("Value: " + value);
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

    function printCost() {
        var cost = 0;
        var projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                cost = project.cost_plan;
                projectCurrency = project.currency_symbol;
            }
        });
        return (
            <div>
                <p>
                    {projectCurrency} {cost.toFixed(2)}
                </p>
            </div>
        );
    }

    return <div>{printCost()}</div>;
}

export function Budget(props) {
    const profile = GetProfile();
    const { value } = props;
    // console.log("Value: " + value);
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

    function printBudget() {
        var budget = 0;
        var projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                budget = project.budget;
                projectCurrency = project.currency_symbol;
            }
        });
        return (
            <div>
                <p>
                    {projectCurrency} {budget.toFixed(2)}
                </p>
            </div>
        );
    }

    return <div>{printBudget()}</div>;
}

export function Danger(props) {
    const profile = GetProfile();
    const { value } = props;
    // console.log("Value: " + value);
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

    function printDanger() {
        var danger = 0;
        var projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                danger = project.cost_actual - project.cost_plan;
                projectCurrency = project.currency_symbol;
            }
        });
        return (
            <div>
                <p>
                    {projectCurrency} {danger.toFixed(2)}
                </p>
            </div>
        );
    }

    return <div>{printDanger()}</div>;
}

export function Variance(props) {
    const profile = GetProfile();
    const { value } = props;
    // console.log("Value: " + value);
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

    function printVariance() {
        var variance = 0;
        var projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                variance = project.budget - project.cost_actual;
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

export function CostHealth(props) {
    const profile = GetProfile();
    const { value } = props;
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

    function printCostHealth() {
        var costHealth = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                // costHealth = project.cost_actual / project.cost_plan;
                costHealth = project.budget_health;
            }
        });
        return (
            <div>
                <p>
                    {/* {costHealth.toFixed(2)}% */}
                    {costHealth}
                </p>
            </div>
        );
    }

    return <div>{printCostHealth()}</div>;
}