import React from "react";

type StepsProps = {
  items: string[];
  activeIndex?: number;
};

const Steps: React.FC<StepsProps> = ({ items, activeIndex = 0 }) => {
  return (
    <div className="flex items-center">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isDone = index < activeIndex;

        return (
          <div key={item}>
            <span
              className={`text-xs ${isDone ? "text-gray-300" : "text-black"}`}
            >
              {item}
            </span>
            {!isLast && (
              <span
                className={`mx-3 text-sm ${
                  isDone ? "text-gray-300" : "text-black"
                }`}
              >
                &gt;
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
