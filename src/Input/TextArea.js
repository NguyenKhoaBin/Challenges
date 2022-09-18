import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({
  name,
  control,
  className = "",
  placeholder = "",
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <textarea
      name={name}
      {...field}
      {...props}
      id={name}
      placeholder={placeholder}
      className={`px-[25px] py-[15px] text-[#B2B3BD] text-base outline-none resize-none rounded-lg ${className}`}
      cols="30"
      rows="5"
    ></textarea>
  );
};

export default TextArea;
