import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PrintGantt, PrintGanttPage } from '../../Components/Gantt-Component/CustomActivityState';
import { useMutation } from '@apollo/client';

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
