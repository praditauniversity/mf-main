import React from "react";
import Tasks from "../Tasks";
import NoTasks from "../Tasks/NoTasks";
import Counter from "../Counter";

const VerticalTabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
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
                  : "text-" + color + "-600")
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
            ? (<Counter value="5" textColor="primary" bgColor="background-snow"/>) 
            : (<Counter value="5" textColor="background-snow" bgColor="primary"/>)
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
                  : "text-" + color + "-600")
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
                ? (<Counter value="1" textColor="primary" bgColor="background-snow"/>) 
                : (<Counter value="1" textColor="background-snow" bgColor="primary"/>)
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
                  : "text-" + color + "-600")
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
                ? (<Counter value="0" textColor="primary" bgColor="background-snow"/>) 
                : (<Counter value="0" textColor="background-snow" bgColor="primary"/>)
                }
            </div>
            
          </li>
        </ul>

        <div className="relative flex flex-col min-w-0 break-words bg-white mb-6 rounded col-span-9">
          <div className="px-4 flex-auto rounded-lg">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <Tasks />
                <Tasks />
                <Tasks />
                <Tasks />
                <Tasks />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <Tasks />
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <NoTasks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalTabs;