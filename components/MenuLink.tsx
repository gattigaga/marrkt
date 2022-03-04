import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type Props = {
  href: string;
  label: string;
  color?: "black" | "white";
};

const MenuLink: React.FC<Props> = ({ href, label, color = "black" }) => {
  const refLine = useRef(null);

  const showLine = () => {
    gsap
      .timeline()
      .set(refLine.current, { alignSelf: "flex-start" })
      .to(refLine.current, { width: "100%" });
  };

  const hideLine = () => {
    gsap
      .timeline()
      .set(refLine.current, { alignSelf: "flex-end" })
      .to(refLine.current, { width: "0%" });
  };

  return (
    <Link href={href}>
      <a onMouseEnter={showLine} onMouseLeave={hideLine}>
        <div className="flex flex-col">
          <span className={`text-xs text-${color}`}>{label}</span>
          <div ref={refLine} className={`w-0 border-t border-${color} mt-1`} />
        </div>
      </a>
    </Link>
  );
};

export default MenuLink;
