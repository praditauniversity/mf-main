import React from 'react';
import { useParams } from 'react-router-dom';
import { PrintGanttPage } from '../../Components/Gantt-Component/CustomActivityState';

const GanttChartPage = () => {
    let { ganttID, projectID } = useParams();

    let currentUrl = window.location.href;
    let lastUrl = currentUrl.split('/').pop();
    const project_id = parseInt(lastUrl);

    return (
        <>
        <PrintGanttPage title="Gantt Chart" ganttID={ganttID} projectID={projectID} />
        </>
    )
}
export default GanttChartPage;
