import React, { useState } from "react";
import Done from "../../Assets/Icons/svg/Done.svg";
import Tasks from "../Tasks/index";
import NoTasks from "../Tasks/NoTasks";

const TabsDailyReminder = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);

  const [taskList, setTaskList] = useState([]);

  const [someTask, setSomeTask] = useState([
    { id: 1, icon: Done, projectName: "Project anomaly", taskName: "Make moodboard", date: "14 Sep" },
    { id: 2, icon: Done, projectName: "Project anomaly", taskName: "Create wireframe", date: "14 Sep" },
    { id: 3, icon: Done, projectName: "Project anomaly", taskName: "Make the Lo-Fi model", date: "14 Sep" },
    { id: 4, icon: Done, projectName: "Project anomaly", taskName: "Make the Hi-Fi model", date: "14 Sep" },
    { id: 5, icon: Done, projectName: "Project anomaly", taskName: "Usability testing", date: "14 Sep" },
  ]);

  const [someTask1, setSomeTask1] = useState([]);

  const someTaskLength = someTask.length;
  const someTask1Length = someTask1.length;

  return (
    <>
      <div className="flex flex-wrap">
          <ul className="flex mb-0 list-none flex-wrap pb-4 flex-row" role="tablist">
            <li className= {"-mb-px mr-2 last:mr-0 flex-auto text-center pb-3 sm:pt-3 " +
                (openTab === 1
                    ? "border-b-4 border-primary"
                    : "border-b-4 border-transparent")
            }>
            <a
                className={
                  "text-lg font-bold px-5 py-3 rounded leading-normal hover:text-primary transition ease-out duration-300 " +
                  (openTab === 1
                    ? "text-" + color + " bg-background-snow" + "border-b-4 border-" + color 
                    : "text-" + color + "-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Calendar
              </a>
            </li>

            <li className= {"-mb-px mr-2 last:mr-0 flex-auto text-center pb-3 sm:pt-3 " +
            (openTab === 2
                ? "border-b-4 border-primary"
                : "border-b-4 border-transparent")}>
              <a
                className={
                  "text-lg font-bold px-5 py-3 rounded leading-normal hover:text-primary transition ease-out duration-300 " +
                  (openTab === 2
                    ? "text-" + color + " bg-background-snow" + "border-b-4 border-" + color 
                    : "text-" + color + "-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                 Agenda
              </a>
            </li>
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded ">
            <div className="px-4 py-5 flex-auto overflow-y-scroll scrollbar">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                {someTaskLength === 0 
                ? <NoTasks height="100"/> 
                : someTask.map((item) => (
                  <Tasks id={item.id} icon={item.icon} projectName={item.projectName} taskName={item.taskName} date={item.date} />
                ))
                }
                </div>

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                {someTask1Length === 0 
                ? <NoTasks height="100"/> 
                : someTask1.map((item) => (
                  <Tasks id={item.id} icon={item.icon} projectName={item.projectName} taskName={item.taskName} date={item.date} />
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

export default TabsDailyReminder;