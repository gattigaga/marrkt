import React, { ChangeEvent, FocusEvent } from "react";

type CheckBoxProps = {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange?: (event: ChangeEvent<any>) => void;
  onBlur?: (event: FocusEvent<any, Element>) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  name,
  id,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="flex items-center">
      <input
        className="mr-3 text-black focus:ring-black"
        id={id}
        type="checkbox"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <label className="text-xs text-black" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
