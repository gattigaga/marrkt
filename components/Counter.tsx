import React from "react";

type Props = {
  value: number;
  onClickIncrease: (value: number) => void;
  onClickDecrease: (value: number) => void;
};

const Counter: React.FC<Props> = ({
  value,
  onClickIncrease,
  onClickDecrease,
}) => {
  return (
    <div className="w-18 flex items-center">
      <button
        className="w-6 h-6 bg-black text-white cursor-pointer"
        type="button"
        onClick={() => onClickDecrease(value - 1)}
      >
        -
      </button>
      <p className="w-4 text-xs text-black text-center mx-2">{value}</p>
      <button
        className="w-6 h-6 bg-black text-white"
        onClick={() => onClickIncrease(value + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
