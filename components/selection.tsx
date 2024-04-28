import React from "react";

const SelectComponent = ({ categories, label, ...otherProps }: any) => {
  return (
    <div className="flex flex-col items-center space-x-2 ">
      <label htmlFor="category" className="p-2">
        Choose a Type {label}
      </label>
      <select {...otherProps}>
        {categories.map((category: any, index: any) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
