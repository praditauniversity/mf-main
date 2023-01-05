import React from "react";
import Tasks from "../Tasks/index.jsx";
import VerticalTabs from "./verticalTabs";
import Trash from "../../Assets/Icons/svg/Trash.svg";
import { useState } from "react";
import FetchActivity from "../../Middleware/Fetchers/FetchActivity.jsx";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const activityData = FetchActivity();

  // const [someTask, setSomeTask] = useState([
  //   { id: 1, icon: Trash, projectName: "Project anomaly", taskName: "Make project charter", date: "30 Aug" },
  //   { id: 2, icon: Trash, projectName: "Project anomaly", taskName: "Plan the BMC with team", date: "30 Aug" },
  //   { id: 3, icon: Trash, projectName: "Project anomaly", taskName: "User requirements", date: "30 Aug" },
  // ]);

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
                To-do
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
                 Completed
              </a>
            </li>
          </ul>

          <div className="flex flex-col min-w-0 break-words bg-white w-full rounded">
            <div className="px-4 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <VerticalTabs />
                </div>

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {activityData.map((item) => {
                    const status = item.phase.name;
                    if ( status === "Done") {
                      return (
                        <Tasks id={item.ID} icon={Trash} projectName="Project Z" taskName={item.name} date={item.start_time} />  
                      )
                    }
                  })
                  }
                </div>

              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Tabs;