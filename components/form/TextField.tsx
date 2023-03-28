import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  pattern?: string;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  bordered?: boolean
};

const TextField = ({
  value,
  onChange,
  type = "text",
  pattern = "[0-9]{4}",
  className = "",
  placeholder,
  maxLength,
  bordered = false,
}: Props) => {
  return (
    <input
      type={type}
      value={value}
      pattern={pattern}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={event => onChange(event.target.value)}
      className={`outline-none px-3 py-2 rounded-lg ${className} ${
        bordered ? "border border-gray-300 focus:border-gray-400" : ""
      }`}
    />
  );
};

export default TextField;
