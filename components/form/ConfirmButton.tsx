import React from "react";

type Props = {
  label: string;
  className?: string;
  onClick: () => void;
};

const ConfirmButton = ({ label, className = "", onClick }: Props) => {
  return (
    <button
      onClick={event => {
        event.preventDefault();
        onClick();
      }}
      className={`px-3 py-2 text-sm font-medium text-white bg-neutral-900 rounded-md ${className}`}
    >
      {label}
    </button>
  );
};

export default ConfirmButton;
