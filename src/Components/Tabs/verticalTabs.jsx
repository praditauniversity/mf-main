import React from "react";

const VerticalTabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
        <div className="flex flex-wrap flex-col">
            <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-col" role="tablist">
                <li className= {"-mb-px mr-2 last:mr-0 flex-auto pb-3 sm:pt-3 " +
                    (openTab === 1
                        ? "border-b-4 border-primary"
                        : "border-b-4 border-transparent")
                }>
                <a
                    className={
                    "text-lg font-bold px-5 py-3 rounded leading-normal " +
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
                    Today
                </a>
                </li>

                <li className= {"-mb-px mr-2 last:mr-0 flex-auto pb-3 sm:pt-3 " +
                (openTab === 2
                    ? "border-b-4 border-primary"
                    : "border-b-4 border-transparent")}>
                <a
                    className={
                    "text-lg font-bold px-5 py-3 rounded leading-normal " +
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
                    Overdue
                </a>
                </li>

                <li className= {"-mb-px mr-2 last:mr-0 flex-auto pb-3 sm:pt-3 " +
                (openTab === 3
                    ? "border-b-4 border-primary"
                    : "border-b-4 border-transparent")}>
                <a
                    className={
                    "text-lg font-bold px-5 py-3 rounded leading-normal " +
                    (openTab === 3
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
                    Next
                </a>
                </li>
            </ul>

            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <p>
                        Collaboratively administrate empowered markets via
                        plug-and-play networks. Dynamically procrastinate B2C users
                        after installed base benefits.
                        <br />
                        <br /> Dramatically visualize customer directed convergence
                        without revolutionary ROI.
                    </p>
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <p>
                        Completely synergize resource taxing relationships via
                        premier niche markets. Professionally cultivate one-to-one
                        customer service with robust ideas.
                        <br />
                        <br />
                        Dynamically innovate resource-leveling customer service for
                        state of the art customer service.
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default VerticalTabs;