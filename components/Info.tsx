import React from "react";

type Props = {
  label: string;
  value: string;
};

const Info: React.FC<Props> = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xs text-black font-medium">{value}</p>
    </div>
  );
};

export default Info;
