import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
} from "react";
import Link from "next/link";
import { gsap, Power2 } from "gsap";

import Logo from "./Logo";
import MenuPopup from "./MenuPopup";
import CartPopup from "./CartPopup";
import MenuLink from "./MenuLink";
import { useStore } from "../store/store";
import { supabase } from "../helpers/supabase";

export type Exposed = {
  runTotalItemsAnimation: (
    onAnimationRun: () => void,
    isReverse?: boolean
  ) => void;
};

type Props = {};

const Menu: React.ForwardRefRenderFunction<Exposed, Props> = ({}, ref) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const refContainer = useRef(null);
  const refTotalItems = useRef(null);
  const cartItems = useStore((state) => state.cartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const user = supabase.auth.user();

  const runTotalItemsAnimation = (
    onAnimationRun: () => void,
    isReverse = false
  ) => {
    if (refTotalItems.current) {
      gsap
        .timeline()
        .to(refTotalItems.current, {
          y: isReverse ? 20 : -20,
          duration: 0.3,
          ease: Power2.easeIn,
        })
        .call(onAnimationRun)
        .set(refTotalItems.current, {
          y: isReverse ? -20 : 20,
        })
        .to(refTotalItems.current, {
          y: 0,
          duration: 0.3,
          ease: Power2.easeOut,
        });
    }
  };

  const removeItem = (itemId: string) => {
    runTotalItemsAnimation(() => removeFromCart(itemId), true);
  };

  useImperativeHandle(ref, () => ({
    runTotalItemsAnimation,
  }));

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
          <a className="relative z-10">
            <Logo scale={0.4} />
          </a>
        </Link>

        {/* For smaller screen */}
        <nav className="flex relative z-10 md:hidden">
          <button
            className="mr-6"
            type="button"
            onClick={() => {
              setIsCartOpen(false);
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className="text-xs text-black">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
          </button>
          <button
            className="w-6 h-6 rounded-full bg-black flex justify-center items-center"
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              setIsCartOpen(!isCartOpen);
            }}
          >
            <span ref={refTotalItems} className="text-xs text-white">
              {totalItems}
            </span>
          </button>
        </nav>

        {/* For bigger screen */}
        <nav className="hidden relative z-10 md:flex">
          <ul className="mr-8">
            <li className="inline-block">
              <MenuLink label="Home" href="/" />
            </li>
            <li className="inline-block ml-8">
              <MenuLink label="Products" href="/products" />
            </li>
            <li className="inline-block ml-8">
              <MenuLink
                label={user ? "My Account" : "Login"}
                href={user ? "/account/profile" : "/account/login"}
              />
            </li>
          </ul>
          <button
            className="w-6 h-6 rounded-full bg-black flex justify-center items-center cursor-pointer"
            type="button"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <span ref={refTotalItems} className="text-xs text-white">
              {totalItems}
            </span>
          </button>
        </nav>
      </div>
      <MenuPopup
        onClickBackdrop={() => setIsMenuOpen(false)}
        isOpen={isMenuOpen}
      />
      <CartPopup
        onClickBackdrop={() => setIsCartOpen(false)}
        onClickRemoveItem={removeItem}
        isOpen={isCartOpen}
      />
    </header>
  );
};

export default forwardRef(Menu);
