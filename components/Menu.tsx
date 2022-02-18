import React, { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { gsap } from "gsap";

import Logo from "./Logo";
import CartPopup from "./CartPopup";
import { useStore } from "../store/store";
import { supabase } from "../helpers/supabase";

type MenuProps = {};

const Menu: React.FC<MenuProps> = ({}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const refContainer = useRef();
  const refLine1 = useRef();
  const refLine2 = useRef();
  const refLine3 = useRef();
  const cartItems = useStore((state) => state.cartItems);

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const user = supabase.auth.user();

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
    const animation = () => {
      const isScrollAtTheTop = window.scrollY == 0;

      if (!refContainer.current) return;
      if (isCartOpen) return;

      if (isScrollAtTheTop) {
        gsap.to(refContainer.current, {
          borderColor: "rgba(229 231 235, 0)",
          background: "rgba(255, 255, 255, 0)",
          duration: 0.3,
        });
      } else {
        gsap.to(refContainer.current, {
          borderColor: "rgba(229 231 235, 1)",
          background: "rgba(255, 255, 255, 0.9)",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", animation);

    return () => {
      window.removeEventListener("scroll", animation);
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (refContainer.current) {
      const isScrollAtTheTop = window.scrollY == 0;

      if (isCartOpen) {
        gsap.to(refContainer.current, {
          borderColor: "rgba(229 231 235, 0)",
          background: "rgba(255, 255, 255, 0)",
          duration: 0.5,
        });
      } else {
        if (!isScrollAtTheTop) {
          gsap.to(refContainer.current, {
            borderColor: "rgba(229 231 235, 1)",
            background: "rgba(255, 255, 255, 0.9)",
            duration: 0.5,
          });
        }
      }
    }
  }, [isCartOpen]);

  return (
    <header className="fixed px-2 mt-2 w-full z-10">
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
                <a>
                  <div className="flex flex-col">
                    <span className="text-xs">Home</span>
                    <div
                      ref={refLine1}
                      className="w-0 border-t border-black mt-1"
                    />
                  </div>
                </a>
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
                <a>
                  <div className="flex flex-col">
                    <span className="text-xs">Products</span>
                    <div
                      ref={refLine2}
                      className="w-0 border-t border-black mt-1"
                    />
                  </div>
                </a>
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
              <Link href={user ? "/account/profile" : "/account/login"}>
                <a>
                  <div className="flex flex-col">
                    <span className="text-xs">
                      {user ? "My Account" : "Login"}
                    </span>
                    <div
                      ref={refLine3}
                      className="w-0 border-t border-black mt-1"
                    />
                  </div>
                </a>
              </Link>
            </li>
          </ul>
          <button
            className="w-6 h-6 rounded-full bg-black flex justify-center items-center cursor-pointer"
            type="button"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="text-xs text-white">{totalItems}</span>
          </button>
        </nav>
      </div>
      <CartPopup
        onClickBackdrop={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
      />
    </header>
  );
};

export default Menu;
