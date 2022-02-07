import React from "react";

type CounterProps = {
  value: number;
  onClickIncrease: (value: number) => void;
  onClickDecrease: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({
  value,
  onClickIncrease,
  onClickDecrease,
}) => {
  const isDecreasable = value > 0;
  const decreaseBackgroundColor = isDecreasable ? "bg-black" : "bg-gray-200";
  const decreaseTextColor = isDecreasable ? "text-white" : "text-gray-500";

  return (
    <div className="w-18 flex items-center">
      <button
        className={`w-6 h-6 ${decreaseBackgroundColor} ${decreaseTextColor}`}
        type="button"
        onClick={() => {
          if (isDecreasable) {
            onClickDecrease(value - 1);
          }
        }}
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
