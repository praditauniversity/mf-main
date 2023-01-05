import React, { useEffect } from "react";
import Tasks from "../Tasks";
import NoTasks from "../Tasks/NoTasks";
import Counter from "../Counter";
import Done from "../../Assets/Icons/svg/Done.svg";
import { useState } from "react";
import { GET_ACTIVITY_GANTT_ID } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";

const VerticalTabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);

  const [ganttID, setGanttID] = React.useState(localStorage.getItem('ganttID') ? localStorage.getItem('ganttID') : "1");

  const { data, loading, error } = useQuery(GET_ACTIVITY_GANTT_ID, {
    variables: { gantt_id: ganttID, sort: "start_time asc" }
  });
  const [activityData, setActivity] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data Ready Activity");
      setActivity(data.activityGetGanttID.data);
      // console.log(data.activityGetGanttID.data);
    } else {
      console.log("No data Activity");
    }
    console.log("USE EFFECT ACTIVITY");
  }, [data]);

  const todayTaskLength = activityData.filter((item) => {
    const todayDate = new Date();
    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);
    const status = item.phase.name;
    return startDate == todayDate && endDate > todayDate && status === "Todo";
  }).length;

  const overdueTaskLength = activityData.filter((item) => {
    const todayDate = new Date();
    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);
    const status = item.phase.name;
    return startDate < todayDate && endDate < todayDate && status === "Todo";
  }).length;

  const nextTaskLength = activityData.filter((item) => {
    const todayDate = new Date();
    const startDate = new Date(item.start_time);
    const endDate = new Date(item.end_time);
    const status = item.phase.name;
    return startDate > todayDate && endDate > todayDate && status === "Todo";
  }).length;

  // const [someTask, setSomeTask] = useState([
  //   { id: 1, icon: Done, projectName: "Project anomaly", taskName: "Make moodboard", date: "14 Sep" },
  //   { id: 2, icon: Done, projectName: "Project anomaly", taskName: "Create wireframe", date: "14 Sep" },
  //   { id: 3, icon: Done, projectName: "Project anomaly", taskName: "Make the Lo-Fi model", date: "14 Sep" },
  //   { id: 4, icon: Done, projectName: "Project anomaly", taskName: "Make the Hi-Fi model", date: "14 Sep" },
  //   { id: 5, icon: Done, projectName: "Project anomaly", taskName: "Usability testing", date: "14 Sep" },
  // ]);

  // const [someTask1, setSomeTask1] = useState([
  //   { id: 1, icon: Done, projectName: "Project anomaly", taskName: "Discovery requirements", date: "12 Sep" },
  // ]);

  // const [someTask2, setSomeTask2] = useState([]);

  // const someTaskLength = someTask.length;
  // const someTask1Length = someTask1.length;
  // const someTask2Length = someTask2.length;
  
  return (
    <>
      <div className="flex flex-wrap flex-row grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 lg:mt-0 mt-2">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-col xl:border-r-2 xl:border-b-0 md:border-b-2 xl:col-span-3 lg:col-span-12 lg:mb-3"
          role="tablist"
        >
          <li
            className={
              "-mb-px last:mr-0 pb-3 sm:pt-3 rounded-md flex align-center justify-between pr-10 " +
              (openTab === 1 ? "bg-primary" : "border-b-4 border-transparent")
            }
          >
            <a
              className={
                "text-lg font-bold px-5 py-3 rounded leading-normal " +
                (openTab === 1
                  ? "text-background-snow" + " bg-" + color
                  : "text-" + color + "-600 hover:text-primary")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Today
            </a>

            <div className="mt-1">
            {
            (openTab === 1) 
            ? (<Counter value={todayTaskLength} textColor="primary" bgColor="background-snow"/>) 
            : (<Counter value={todayTaskLength} textColor="background-snow" bgColor="primary"/>)
            }
            </div>
            
          </li>

          <li
            className={
              "-mb-px last:mr-0 pb-3 sm:pt-3 rounded-md flex align-center justify-between pr-10 " +
              (openTab === 2 ? "bg-primary" : "border-b-4 border-transparent")
            }
          >
            <a
              className={
                "text-lg font-bold px-5 py-3 rounded leading-normal " +
                (openTab === 2
                  ? "text-background-snow" + " bg-" + color
                  : "text-" + color + "-600 hover:text-primary")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Overdue
            </a>

            <div className="mt-1">
                {
                (openTab === 2) 
                ? (<Counter value={overdueTaskLength} textColor="primary" bgColor="background-snow"/>) 
                : (<Counter value={overdueTaskLength} textColor="background-snow" bgColor="primary"/>)
                }
            </div>
            

          </li>

          <li
            className={
              "-mb-px last:mr-0 pb-3 sm:pt-3 rounded-md flex align-center justify-between pr-10 " +
              (openTab === 3 ? "bg-primary" : "border-b-4 border-transparent")
            }
          >
            <a
              className={
                "text-lg font-bold px-5 py-3 rounded leading-normal " +
                (openTab === 3
                  ? "text-background-snow" + " bg-" + color
                  : "text-" + color + "-600 hover:text-primary")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Next
            </a>

            <div className="mt-1">
                {
                (openTab === 3) 
                ? (<Counter value={nextTaskLength} textColor="primary" bgColor="background-snow"/>) 
                : (<Counter value={nextTaskLength} textColor="background-snow" bgColor="primary"/>)
                }
            </div>
            
          </li>
        </ul>

        <div className="relative flex flex-col min-w-0 break-words bg-white mb-6 rounded col-span-9">
          <div className="px-4 flex-auto rounded-lg max-h-[400px] overflow-y-scroll scrollbar">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                {todayTaskLength === 0 
                ? <NoTasks height="100"/> 
                : activityData.map((item) => (
                  <Tasks id={item.ID} icon={item.icon} projectName={item.project_id} taskName={item.name} date={new Date()} />  
                ))
                }
              </div>

              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                {overdueTaskLength === 0 
                ? <NoTasks height="100"/> 
                : activityData.map((item) => (
                  <Tasks id={item.ID} icon={item.icon} projectName={item.project_id} taskName={item.name} date={item.end_time} />  
                ))
                }
              </div>

              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                {nextTaskLength === 0 
                ? <NoTasks height="100"/> 
                : activityData.map((item) => (
                    <Tasks id={item.ID} icon={item.icon} projectName={item.project_id} taskName={item.name} date={item.start_time} />  
                ))
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalTabs;