import React from "react";
const InputField = React.forwardRef((props, ref) => {
    return(
        <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{props.label}</label>
            <input 
                ref={ref} 
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " {...props} />
        </div>
    );
});
export default InputField;