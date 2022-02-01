import React, { useRef } from "react";
import { gsap } from "gsap";

type ButtonProps = {
  label: string;
  type?: "submit" | "button";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, type = "button", onClick }) => {
  const refSlide = useRef();
  const refLabel = useRef();

  const slideOut = (isHovered: boolean) => {
    if (!(refSlide.current && refLabel.current)) return;

    const slideWidth = isHovered ? "0%" : "100%";
    const textColor = isHovered ? "black" : "white";

    gsap.to(refSlide.current, { width: slideWidth, duration: 0.3 });
    gsap.to(refLabel.current, { color: textColor, duration: 0.3 });
  };

  return (
    <button
      className="bg-white px-8 h-10 flex items-center justify-center border-2 border-black relative min-w-[160px]"
      type={type}
      onClick={onClick}
      onMouseEnter={() => slideOut(true)}
      onMouseLeave={() => slideOut(false)}
    >
      <div
        ref={refSlide}
        className="w-full h-full bg-black absolute top-0 left-0"
      />
      <span ref={refLabel} className="relative text-white text-xs font-medium">
        {label}
      </span>
    </button>
  );
};

export default Button;
