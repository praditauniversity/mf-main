import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GetProfile from "../Auth/GetProfile";
import { GET_PROJECT_DATA_BY_ID } from "./Queries";

export function Actual(props) {
    const profile = GetProfile();
    const { value } = props;
    // console.log("Value: " + value);
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    
    useEffect(() => {
        if (data) {
            // console.log("Data Ready - Actual");
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Actual");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Actual");
        }
        refetch();
    }, [data]);
    
    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }     

    function printActual() {
        let act = 0;
        let projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                act = project.cost_actual;
                projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
            }
        });
        return (
            <div>
                <p>
                    {projectCurrency} {act % 1 !== 0 ? act.toFixed(2) : act}
                </p>
            </div>
        );
    }

    return <div>{printActual()}</div>;
}

export function Cost(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            // console.log("Data Ready - Cost");
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Cost");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Cost");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printCost() {
        let cost = 0;
        let projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                cost = project.cost_plan;
                projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
            }
        });
        return (
            <div>
                <p>
                    {projectCurrency} {cost % 1 !== 0 ? cost.toFixed(2) : cost}
                </p>
            </div>
        );
    }

    return <div>{printCost()}</div>;
}

export function Budget(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            console.log("Data Ready - Budget");
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Budget");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Budget");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printBudget() {
        let budget = 0;
        let projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                budget = project.budget;
                projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
            }
        });
        return (
            <div>
                <p>
                    {projectCurrency} {budget % 1 !== 0 ? budget.toFixed(2) : budget}
                </p>
            </div>
        );
    }

    return <div>{printBudget()}</div>;
}

export function Danger(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Dange");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Danger");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printDanger() {
        let danger = 0;
        let projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                const tempDanger = project.cost_plan - project.cost_actual;
                danger = tempDanger <= 0 ? tempDanger * -1 : 0;
                projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
            }
        });
        return (
            <div>
                <p>
                    {projectCurrency} {danger % 1 !== 0 ? danger.toFixed(2) : danger}
                </p>
            </div>
        );
    }

    return <div>{printDanger()}</div>;
}

export function Variance(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Variance");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Variance");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printVariance() {
        let variance = 0;
        let projectCurrency = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                const tempVariance = project.budget - project.cost_actual;
                variance = tempVariance <= 0 ? tempVariance * -1 : 0;
                projectCurrency = project.currency_symbol ? project.currency_symbol : "N/A";
            }
        });
        return (
            <div>
                <p>
                    {projectCurrency} {variance % 1 !== 0 ? variance.toFixed(2) : variance}
                </p>
            </div>
        );
    }

    return <div>{printVariance()}</div>;
}

export function CostHealth(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Cost Health");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Cost Health");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printCostHealth() {
        let costHealth = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                costHealth = project.budget_health;
            }
        });
        return (
            <div>
                <p>
                    {costHealth ? costHealth : "N/A"}
                </p>
            </div>
        );
    }

    return <div>{printCostHealth()}</div>;
}

export function ScheduleHealth(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Schedule Health");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Schedule Health");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printScheduleHealth() {
        let scheduleHealth = "";
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
                    {scheduleHealth ? scheduleHealth : "N/A"}
                </p>
            </div>
        );
    }

    return <div>{printScheduleHealth()}</div>;
}

export function ProgressPercentage(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Progress Percentage");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Progress Percentage");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printProgressPercentage() {
        let projectPercentage = 0;
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
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Project Manager");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Project Manager");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }   

    function printProjectManager() {
        let projectManager = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                projectManager = project.project_manager;
            }
        });
        return (
            <div>
                <p>
                    {projectManager ? projectManager : "N/A"}
                </p>
            </div>
        );
    }

    return <div>{printProjectManager()}</div>;
}

export function Client(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Client");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Client");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    
    
    function printClient() {
        let client = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                client = project.client;
            }
        });
        return (
            <div>
                <p>
                    {client ? client : "N/A"}
                </p>
            </div>
        );
    }

    return <div>{printClient()}</div>;
}

export function ClientContact(props) {
    const profile = GetProfile();
    const { value } = props;
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Client Contact");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Client Contact");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printClientContact() {
        let clientContact = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                clientContact = project.client_contact;
            }
        });
        return (
            <div>
                <p>
                    {clientContact ? clientContact : "N/A"}
                </p>
            </div>
        );
    }

    return <div>{printClientContact()}</div>;
}

export function ProjectStatus(props) {
    const { value } = props;
    const profile = GetProfile();
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Project Status");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Project Status");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printProjectStatus() {
        let projectStatus = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                projectStatus = project.status;
            }
        });
        return (
            <div>
                <p>
                    {projectStatus ? projectStatus : "N/A"}
                </p>
            </div>
        );
    }

    return <div>{printProjectStatus()}</div>;
}

export function Location(props) {
    const { value } = props;
    const profile = GetProfile();
    const { data, loading, error, refetch } = useQuery(GET_PROJECT_DATA_BY_ID, {
        variables: { id: value || '' },
        pollInterval: 1000,
    });
    const [projectData, setProject] = useState([]);
    useEffect(() => {
        if (data) {
            data.project.Data ? setProject(data.project.Data) : console.log("No data - Location");
        } else if (data && !data.project.Data) {
            console.log(`Project with ID ${value} not found in database.`);
            clearProjectIdFromLocalStorage();
        } else {
            console.log("No data - Location");
        }
        refetch();
    }, [data]);

    function clearProjectIdFromLocalStorage() {
        localStorage.removeItem('projectID');
        localStorage.removeItem("ganttID");
        localStorage.removeItem("TPEID");
        localStorage.removeItem("reportProjectID");
        localStorage.removeItem("momProjectID");
    }    

    function printLocation() {
        let location = "";
        projectData.map((project) => {
            if (profile.id === project.user_id) {
                location = project.office_location;
            }
        });
        return (
            <div>
                <p>
                    {location ? location : "N/A"}
                </p>
            </div>
        );
    }

    return <div>{printLocation()}</div>;
}