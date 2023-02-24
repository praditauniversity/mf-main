import React, { useEffect } from "react";
import "./RadioButton.css";

const ChooseColor = (props) => {
  const { color } = props;

  useEffect(() => {
  }, [color]);

  return (

    <div class="button">
        <input type="radio" id="a25" name="check-substitution-2" className="w-[30px] h-[30px]"/>
        <label class={`rounded-full w-[24px] h-[24px] bg-${color}`} for="a25"></label>
    </div>
  );
};

export default ChooseColor;