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

export function ScheduleHealth(props) {
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

    function printScheduleHealth() {
        var scheduleHealth = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                const dateNow = new Date();
                const dateEnd = new Date(project.end_project);
                if (dateNow == dateEnd) {
                    scheduleHealth = "On Schedule";
                }
                else if (dateNow < dateEnd) {
                    scheduleHealth = "Early Schedule";
                } else if (dateNow > dateEnd) {
                    scheduleHealth = "Behind Schedule";
                }
            }
        });
        return (
            <div>
                <p>
                    {scheduleHealth}
                </p>
            </div>
        );
    }

    return <div>{printScheduleHealth()}</div>;
}

export function ProgressPercentage(props) {
    const profile = GetProfile();
    const {value} = props;
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
    function printProgressPercentage() {
        var projectPercentage = 0;
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                projectPercentage = project.progress_percentage;
            } 
        });
        return (
            <div>
            <p>
                {Math.Round(projectPercentage)}
            </p>
            </div>
        );
    }
    
    return <div>{printProgressPercentage()}</div>;
}

export function ProjectManager(props) {
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

    function printProjectManager() {
        var projectManager = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                projectManager = project.project_manager;
            }
        });
        return (
            <div>
                <p>
                    {projectManager}
                </p>
            </div>
        );
    }

    return <div>{printProjectManager()}</div>;
}

export function Client(props) {
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

    function printClient() {
        var client = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                client = project.client;
            }
        });
        return (
            <div>
                <p>
                    {client}
                </p>
            </div>
        );
    }

    return <div>{printClient()}</div>;
}

export function ClientContact(props) {
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

    function printClientContact() {
        var clientContact = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                clientContact = project.client_contact;
            }
        });
        return (
            <div>
                <p>
                    {clientContact}
                </p>
            </div>
        );
    }

    return <div>{printClientContact()}</div>;
}

export function ProjectStatus(props) {
    const { value } = props;
    const profile = GetProfile();
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

    function printProjectStatus() {
        var projectStatus = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                projectStatus = project.status;
            }
        });
        return (
            <div>
                <p>
                    {projectStatus}
                </p>
            </div>
        );
    }

    return <div>{printProjectStatus()}</div>;
}

export function Location(props) {
    const { value } = props;
    const profile = GetProfile();
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

    function printLocation() {
        var location = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                location = project.office_location;
            }
        });
        return (
            <div>
                <p>
                    {location}
                </p>
            </div>
        );
    }
    
    return <div>{printLocation()}</div>;
}