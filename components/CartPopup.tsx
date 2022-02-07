import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

import CartItem from "./CartItem";
import Button from "./Button";
import { numberToCurrency } from "../helpers/formatter";
import { getSubtotal } from "../helpers/math";
import CartInfo from "./CartInfo";

type CartPopupProps = {
  isOpen?: boolean;
  onClickBackdrop?: () => void;
};

const CartPopup: React.FC<CartPopupProps> = ({ isOpen, onClickBackdrop }) => {
  const refBackdrop = useRef<HTMLElement>();
  const refCart = useRef<HTMLElement>();
  const refCartContent = useRef<HTMLElement>();

  const items = useMemo(
    () => [
      {
        id: 1,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
      {
        id: 2,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
      {
        id: 3,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
      {
        id: 4,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
      {
        id: 5,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
      {
        id: 6,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
      {
        id: 7,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
    ],
    []
  );

  const subtotal = useMemo(() => getSubtotal(items), [items]);

  useEffect(() => {
    const showCart = () => {
      if (refBackdrop.current && refCart.current && refCartContent.current) {
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
            height: "auto",
            duration: 0.3,
          })
          .to(refCartContent.current, {
            opacity: 1,
            duration: 0.5,
          });
      }
    };

    const hideCart = () => {
      if (refBackdrop.current && refCart.current && refCartContent.current) {
        gsap
          .timeline()
          .to(refCartContent.current, {
            opacity: 0,
            duration: 0.5,
          })
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
    };

    if (isOpen) {
      showCart();
    } else {
      hideCart();
    }
  }, [isOpen]);

  return (
    <div
      ref={refBackdrop}
      className="fixed flex-col top-0 left-0 z-1 w-full h-full p-2 bg-black/50 opacity-0"
      onClick={onClickBackdrop}
    >
      <div
        ref={refCart}
        style={{ width: 400 }}
        className="bg-white self-end max-h-full h-0 px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div ref={refCartContent} className="h-full flex flex-col opacity-0">
          <div className="h-32" />
          {!!items.length && (
            <>
              <div className="max-h-full overflow-y-scroll">
                {items.map((item, index) => {
                  const isLast = index === items.length - 1;

                  return (
                    <div key={item.id}>
                      <CartItem
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        image={item.image}
                        isRemovable
                      />
                      {!isLast && (
                        <div className="w-full border-t border-gray-200" />
                      )}
                    </div>
                  );
                })}
              </div>
              <CartInfo label="Subtotal" value={numberToCurrency(subtotal)} />
              <div className="border-b border-gray-200" />
              <div className="flex flex-col items-end mt-4">
                <Button label="Checkout" />
              </div>
              <div className="h-6" />
            </>
          )}
          {!items.length && (
            <>
              <p className="text-xs text-center">
                There&lsquo;s no items in the cart.
              </p>
              <div className="h-12" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
