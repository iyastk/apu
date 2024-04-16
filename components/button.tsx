import React from "react";

const Button = ({ children, buttonClass, ...otherProps }: any) => {
  return (
    <button className={buttonClass} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
