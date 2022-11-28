import React from "react";

export const InputField = ({ value, label, name, placeholder, type, onChange }) => (
  <div className="form-group">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
    <input
      type={type}
      value={value}
      name={name}
      className="form-control mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export const InputTextArea = ({ value, label, name, placeholder, type, onChange }) => (
    <div className="form-group">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{label}</label>
        <textarea
            type={type}
            value={value}
            name={name}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
);

export const InputFieldWithLabelAndSubtitle = ({ label, subtitle, value, placeholder, onChange }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <p className="text-xs text-gray-500">{subtitle}</p>
            <input
                className="border border-gray-300 rounded-md p-2 mt-1 mb-4"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};