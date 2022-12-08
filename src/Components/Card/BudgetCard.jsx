import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";

const BudgetCard = (props) => {
  const { icon, title, description, content, colorIcon, borderColor } = props;
  return (
    <div className="bg-white flex justify-between mx-auto items-start align-middle flex-row h-32">
      <div className="py-4 px-4">
        <p className="py-1 text-md">{title}</p>
        <p className="py-1 font-semibold text-md">{description}</p>
        <p className="py-1 opacity-70 text-sm">{content}</p>
      </div>
      <div className={`border-8 ${borderColor} py-4 px-4 bg-red-400 m-auto w-24 h-24 text-center opacity items-center ${colorIcon}`} style={{ borderRadius: "9999px" }}>
      {/* <i className={`py-4 px-4 bg-red-400 m-auto w-22 h-22 text-center items-center ${colorIcon}`} style={{ borderRadius: "9999px" }}> */}
        <FontAwesomeIcon classname="text-center align-middle items-center content-center" icon={faDollar} size="3x" />
      {/* </i> */}
      </div>
    </div>
  );
};

export default BudgetCard;
