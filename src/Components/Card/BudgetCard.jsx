import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";

const BudgetCard = (props) => {
  const { icon, title, description, content, colorIcon } = props;
  return (
    <div className="bg-white flex justify-between mx-auto items-start align-middle flex-row rounded-lg h-32">
      <div className="py-4 px-4">
        <p className="py-1 text-md">{title}</p>
        <p className="py-1 font-semibold text-md">{description}</p>
        <p className="py-1 opacity-70 text-sm">{content}</p>
      </div>
      <div className={`py-4 px-4 my-auto ${colorIcon}`}>
        <FontAwesomeIcon icon={faDollar} size="4x" />
      </div>
    </div>
  );
};

export default BudgetCard;
