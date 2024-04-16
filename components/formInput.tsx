import React from "react";

const FormInput = ({ label, ...otherProps }: any) => {
  return (
    <div>
      <label htmlFor="" className="p-2">
        {label}
      </label>
      <input {...otherProps} />
    </div>
  );
};

export default FormInput;
