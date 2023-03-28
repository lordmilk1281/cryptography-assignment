import React from "react";

type Props = {
  children: React.ReactNode;
};

const HelperLayout = ({ children }: Props) => {
  return <div className="mx-auto container sm:px-0 px-4">{children}</div>;
};

export default HelperLayout;
