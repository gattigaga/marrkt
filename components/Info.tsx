import React from "react";

type InfoProps = {
  label: string;
  value: string;
};

const Info: React.FC<InfoProps> = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xs text-black font-medium">{value}</p>
    </div>
  );
};

export default Info;
