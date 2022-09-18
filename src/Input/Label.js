import React from "react";
import PropTypes from "prop-types";

const Label = ({ forHtml, className = "", children, ...props }) => {
  return (
    <label
      className={`select-none font-[500] text-lg cursor-pointer ${className}`}
      {...props}
      htmlFor={forHtml}
    >
      {children}
    </label>
  );
};
Label.propTypes = {
  forHtml: PropTypes.string,
  children: PropTypes.string.isRequired,
};
export default Label;
