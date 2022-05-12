import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

import useUserQuery from "../hooks/user/use-user-query";

type Props = {
  isOpen?: boolean;
  onClickBackdrop?: () => void;
};

const MenuPopup: React.FC<Props> = ({ isOpen, onClickBackdrop }) => {
  const refBackdrop = useRef(null);
  const refPopup = useRef(null);
  const refPopupContent = useRef(null);

  const { data: myself } = useUserQuery();

  useEffect(() => {
    const showMenu = () => {
      if (refBackdrop.current && refPopup.current && refPopupContent.current) {
        gsap
          .timeline()
          .set(refBackdrop.current, {
            display: "flex",
          })
          .to(refBackdrop.current, {
            opacity: 1,
            duration: 0.2,
          })
          .to(refPopup.current, {
            height: "auto",
            duration: 0.3,
          })
          .to(refPopupContent.current, {
            opacity: 1,
            duration: 0.5,
          });
      }
    };

    const hideMenu = () => {
      if (refBackdrop.current && refPopup.current && refPopupContent.current) {
        gsap
          .timeline()
          .to(refPopupContent.current, {
            opacity: 0,
            duration: 0.5,
          })
          .to(refPopup.current, {
            height: 0,
            duration: 0.3,
          })
          .to(refBackdrop.current, {
            opacity: 0,
            duration: 0.2,
          })
          .set(refBackdrop.current, {
            display: "none",
          });
      }
    };

    if (isOpen) {
      showMenu();
    } else {
      hideMenu();
    }
  }, [isOpen]);

  return (
    <div
      ref={refBackdrop}
      className="block fixed flex-col top-0 left-0 z-1 w-full h-full p-2 bg-black/50 opacity-0 md:hidden"
      onClick={onClickBackdrop}
    >
      <div
        ref={refPopup}
        className="bg-white self-end w-full max-h-full h-0"
        onClick={(event) => event.stopPropagation()}
      >
        <div ref={refPopupContent} className="h-full flex flex-col opacity-0">
          <div className="h-20" />
          <p className="pl-4 mb-4 text-lg font-medium text-black">Menu</p>
          <Link href="/">
            <a>
              <div className="py-2 px-4 border-t border-gray-200">
                <p className="text-xs text-black">Home</p>
              </div>
            </a>
          </Link>
          <Link href="/products">
            <a>
              <div className="py-2 px-4 border-t border-gray-200">
                <p className="text-xs text-black">Products</p>
              </div>
            </a>
          </Link>
          <Link href={myself ? "/account/profile" : "/account/login"}>
            <a>
              <div className="py-2 px-4 border-t border-b border-gray-200">
                <p className="text-xs text-black">
                  {myself ? "My Account" : "Login"}
                </p>
              </div>
            </a>
          </Link>
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
};

export default MenuPopup;
