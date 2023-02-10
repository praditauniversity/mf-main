import React, { useEffect } from "react";
import "./RadioButton.css";

const ChooseColor = (props) => {
  const { color } = props;

  useEffect(() => {
    // Trigger a re-render when the color prop changes
  }, [color]);

  return (
    // <button className="p-[10px] hover:border hover:border-grey-light hover:shadow-md active:border-grey-light active:shadow-md rounded-md w-[48px] h-[48px] transition duration-200 ease-in-out">
    //   <div className={`rounded-full w-[28px] h-[28px] bg-${color}`} />
    //   <input type="radio" name="color" className={`radio checked:bg-${color}`} />
    // </button>
    <div class="button">
        <input type="radio" id="a25" name="check-substitution-2" className="w-[30px] h-[30px]"/>
        <label class={`rounded-full w-[24px] h-[24px] bg-${color}`} for="a25"></label>
    </div>
  );
};

export default ChooseColor;