import React from "react";
import Tasks from "../Tasks/index";
import NoTasks from "../Tasks/NoTasks";

const TabsDailyReminder = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
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
                Calender
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

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <Tasks />
                    <Tasks />
                    <Tasks />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <NoTasks />
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default TabsDailyReminder;