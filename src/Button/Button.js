import React from "react";
import Loading from "../Common/Loading";
import PropTypes from "prop-types";

const Button = ({
  children,
  className = "",
  isLoading = false,
  type = "button",
  ...props
}) => {
  const child = !!isLoading ? <Loading></Loading> : children;
  return (
    <button
      type={type}
      className={`select-none bg-[#1DC071] text-white font-[500] text-lg w-full py-4 text-center rounded-lg disabled:opacity-[0.6] ${
        isLoading ? "opacity-[0.6] select-none cursor-default" : ""
      } ${className}`}
      {...props}
    >
      {child}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
};
export default Button;
