import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

type CartProps = {
  isOpen?: boolean;
  onClickBackdrop?: () => void;
};

const Cart: React.FC<CartProps> = ({ isOpen, onClickBackdrop }) => {
  const refBackdrop = useRef();
  const refCart = useRef();

  useEffect(() => {
    if (refBackdrop.current && refCart.current) {
      if (isOpen) {
        gsap
          .timeline()
          .set(refBackdrop.current, {
            display: "flex",
          })
          .to(refBackdrop.current, {
            opacity: 1,
            duration: 0.2,
          })
          .to(refCart.current, {
            height: "100%",
            duration: 0.3,
          });
      } else {
        gsap
          .timeline()
          .to(refCart.current, {
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
    }
  }, [isOpen]);

  return (
    <div
      ref={refBackdrop}
      className="fixed flex flex-col top-0 left-0 z-1 w-full h-full p-2 bg-black/50"
      onClick={onClickBackdrop}
    >
      <div
        ref={refCart}
        style={{ width: 400, height: "100%" }}
        className="bg-white self-end"
        onClick={(event) => event.stopPropagation()}
      ></div>
    </div>
  );
};

export default Cart;
