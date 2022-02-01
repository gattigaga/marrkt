import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

import Logo from "./Logo";

type MenuProps = {};

const Menu: React.FC<MenuProps> = ({}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const refContainer = useRef();
  const refLine1 = useRef();
  const refLine2 = useRef();
  const refLine3 = useRef();

  const totalCartItems = 3;
  const headerBackgroundColor = isCartOpen ? "" : "bg-white";

  const headerBorderColor = isCartOpen
    ? "border-gray-200/[0]"
    : "border-gray-200";

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

  useEffect(() => {
    window.addEventListener("scroll", function () {
      const isAtTheTop = window.scrollY == 0;

      if (!refContainer.current) return;

      if (isAtTheTop) {
        gsap.to(refContainer.current, {
          borderColor: "rgba(229 231 235, 0)",
          background: "rgba(255, 255, 255, 0)",
          duration: 0.5,
        });
      } else {
        gsap.to(refContainer.current, {
          borderColor: "rgba(229 231 235, 1)",
          background: "rgba(255, 255, 255, 0.9)",
          duration: 0.5,
        });
      }
    });
  }, []);

  return (
    <header className="fixed px-2 mt-2 w-full">
      <div
        ref={refContainer}
        className={`flex items-center justify-between px-4 py-6 border border-gray-200/[0] md:px-6`}
      >
        <Link href="/">
          <a>
            <Logo scale={0.4} />
          </a>
        </Link>
        <nav className="flex relative z-10">
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
                <div
                  ref={refLine3}
                  className="w-0 border-t border-black mt-1"
                />
              </div>
            </li>
          </ul>
          <button
            className="w-6 h-6 rounded-full bg-black flex justify-center items-center cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="text-xs text-white">{totalCartItems}</span>
          </button>
        </nav>
      </div>

      {/* Cart */}
      {isCartOpen && (
        <div
          className="fixed flex flex-col top-0 left-0 z-1 w-full h-full p-2 bg-black/50"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            style={{ width: 400, height: "100%" }}
            className="bg-white self-end"
            onClick={(event) => event.stopPropagation()}
          ></div>
        </div>
      )}
    </header>
  );
};

export default Menu;
