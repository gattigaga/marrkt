import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import BeatLoader from "react-spinners/BeatLoader";

type Props = {
  label: string;
  type?: "submit" | "button";
  color?: "black" | "white";
  isLoading?: boolean;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  label,
  type = "button",
  color = "black",
  isLoading,
  onClick,
}) => {
  const refSlide = useRef(null);
  const refLabel = useRef(null);

  const slideOut = (isHovered: boolean) => {
    if (!(refSlide.current && refLabel.current)) return;

    const slideWidth = isHovered ? "0%" : "100%";

    const textColor = (() => {
      if (isHovered) {
        return color === "black" ? "black" : "white";
      }

      return color === "black" ? "white" : "black";
    })();

    gsap.to(refSlide.current, { width: slideWidth, duration: 0.3 });
    gsap.to(refLabel.current, { color: textColor, duration: 0.3 });
  };

  useEffect(() => {
    if (isLoading !== undefined) {
      slideOut(!!isLoading);
    }
  }, [isLoading]);

  return (
    <button
      className={`w-[128px] h-10 flex items-center justify-center border-2 border-${color} relative box-content`}
      type={type}
      onClick={isLoading ? undefined : onClick}
      onMouseEnter={() => {
        if (isLoading) return;
        slideOut(true);
      }}
      onMouseLeave={() => {
        if (isLoading) return;
        slideOut(false);
      }}
      onFocus={() => {
        if (isLoading) return;
        slideOut(true);
      }}
      onBlur={() => {
        if (isLoading) return;
        slideOut(false);
      }}
    >
      <div
        ref={refSlide}
        className={`w-full h-full bg-${color} absolute top-0 left-0 box-content`}
      />
      {!isLoading && (
        <span
          ref={refLabel}
          className="relative text-white text-xs font-medium"
        >
          {label}
        </span>
      )}
      {isLoading && <BeatLoader color="black" size={8} loading />}
    </button>
  );
};

export default Button;
