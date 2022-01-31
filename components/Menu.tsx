import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type MenuProps = {};

const Menu: React.FC<MenuProps> = ({}) => {
  const refLine1 = useRef();
  const refLine2 = useRef();
  const refLine3 = useRef();

  const totalCartItems = 3;

  const showLine = (element: gsap.TweenTarget) => {
    gsap
      .timeline()
      .set(element, { alignSelf: "flex-start" })
      .to(element, { width: "100%" });
  };

  const hideLine = (element: gsap.TweenTarget) => {
    gsap
      .timeline()
      .set(element, { alignSelf: "flex-end" })
      .to(element, { width: "0%" });
  };

  return (
    <header className="flex items-center justify-between h-5 px-10 py-8 bg-white">
      <Link href="/">
        <a>
          <h1 className="font-bold text-2xl">marrkt.</h1>
        </a>
      </Link>
      <nav className="flex">
        <ul className="mr-8">
          <li
            className="inline-block"
            onMouseEnter={() => {
              if (refLine1.current) {
                showLine(refLine1.current);
              }
            }}
            onMouseLeave={() => {
              if (refLine1.current) {
                hideLine(refLine1.current);
              }
            }}
          >
            <Link href="/">
              <div className="flex flex-col">
                <a className="text-xs" href="#">
                  Home
                </a>
                <div
                  ref={refLine1}
                  className="w-0 border-t border-black mt-1"
                />
              </div>
            </Link>
          </li>
          <li
            className="inline-block ml-8"
            onMouseEnter={() => {
              if (refLine2.current) {
                showLine(refLine2.current);
              }
            }}
            onMouseLeave={() => {
              if (refLine2.current) {
                hideLine(refLine2.current);
              }
            }}
          >
            <Link href="/products">
              <div className="flex flex-col">
                <a className="text-xs" href="#">
                  Products
                </a>
                <div
                  ref={refLine2}
                  className="w-0 border-t border-black mt-1"
                />
              </div>
            </Link>
          </li>
          <li
            className="inline-block ml-8"
            onMouseEnter={() => {
              if (refLine3.current) {
                showLine(refLine3.current);
              }
            }}
            onMouseLeave={() => {
              if (refLine3.current) {
                hideLine(refLine3.current);
              }
            }}
          >
            <div className="flex flex-col">
              <a className="text-xs" href="#">
                My Account
              </a>
              <div ref={refLine3} className="w-0 border-t border-black mt-1" />
            </div>
          </li>
        </ul>
        <div className="w-6 h-6 rounded-full bg-black flex justify-center items-center">
          <span className="text-xs text-white">{totalCartItems}</span>
        </div>
      </nav>
    </header>
  );
};

export default Menu;
