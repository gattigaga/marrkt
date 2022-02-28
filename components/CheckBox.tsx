import React, { ChangeEvent } from "react";

type Props = {
  label: string;
  name: string;
  id: string;
  value: string;
  isChecked?: boolean;
  onChange?: (event: ChangeEvent<any>) => void;
};

const CheckBox: React.FC<Props> = ({
  label,
  name,
  id,
  value,
  isChecked,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        className="mr-3 border-gray-200  text-black focus:ring-black focus:ring-offset-0"
        id={id}
        type="checkbox"
        name={name}
        onChange={onChange}
        value={value}
        checked={isChecked}
      />
      <label className="text-xs text-black" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
