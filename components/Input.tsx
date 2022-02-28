import React, { ChangeEvent, FocusEvent } from "react";

type Props = {
  label: string;
  name: string;
  id: string;
  value: string;
  type?: "text" | "email" | "password";
  disabled?: boolean;
  hasError?: boolean;
  errorText?: string;
  onChange?: (event: ChangeEvent<any>) => void;
  onBlur?: (event: FocusEvent<any, Element>) => void;
};

const Input: React.FC<Props> = ({
  label,
  name,
  id,
  value,
  type = "text",
  disabled,
  hasError,
  errorText,
  onChange,
  onBlur,
}) => {
  return (
    <div>
      <label className="text-xs text-black mb-2 block" htmlFor={id}>
        {label}
      </label>
      <input
        className="border border-gray-200 px-4 py-3 text-xs w-full focus:ring-black focus:border-black"
        id={id}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
      />
      {hasError && <p className="text-xs text-red-600 mt-2">{errorText}</p>}
    </div>
  );
};

export default Input;
