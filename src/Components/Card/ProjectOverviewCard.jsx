import React from "react";
import ListboxProjectName from "../Listbox/ListProjectName";


const ProjectOverviewCard = (props) => {
  const { title1, description1, title2, description2, title3, description3 } = props;
  return (
    <div className="bg-white flex justify-between mx-auto items-center align-middle flex-row rounded-lg h-32">
      <div className="py-4 px-12">
        <p className="py-1 text-md pl-3">{title1}</p>
        <div>
        <ListboxProjectName />
        </div>
        {/* <p className={`py-1 font-semibold text-xl`}>{description1}</p> */}
      </div>
      <div className="py-4 px-12">
        <p className="py-1 text-md">{title2}</p>
        <p className={`py-1 font-semibold text-xl`}>{description2}</p>
      </div>
      <div className="py-4 px-12">
        <p className="py-1 text-md">{title3}</p>
        <p className={`py-1 font-semibold text-xl`}>{description3}</p>
      </div>
    </div>
  );
};

export default ProjectOverviewCard;
