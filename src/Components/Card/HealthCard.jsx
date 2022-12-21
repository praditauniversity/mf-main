import React from "react";


const HealthCard = (props) => {
  const { title, description, colorIcon } = props;
  return (
    <div className="bg-white flex justify-center mx-auto items-center align-middle flex-row rounded-lg h-32">
      <div className="py-4 px-4 text-center">
        <p className="py-1 text-md">{title}</p>
        <p className={`py-1 font-semibold text-xl ${colorIcon}`}>{description}</p>
      </div>
    </div>
  );
};

export default HealthCard;
