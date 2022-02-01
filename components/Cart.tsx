import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

import CartItem from "./CartItem";
import Button from "./Button";
import { numberToCurrency } from "../helpers/formatter";

type CartProps = {
  isOpen?: boolean;
  onClickBackdrop?: () => void;
};

const Cart: React.FC<CartProps> = ({ isOpen, onClickBackdrop }) => {
  const refBackdrop = useRef();
  const refCart = useRef();

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

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [items]);

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
            height: "auto",
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
        style={{ width: 400 }}
        className="bg-white self-end max-h-full flex flex-col px-6 pt-24 pb-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="max-h-full overflow-y-scroll">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <div key={item.id}>
                <CartItem
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  image="https://via.placeholder.com/128x128"
                />
                {!isLast && <div className="w-full border-t border-gray-200" />}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
          <p className="text-xs text-black">Subtotal</p>
          <p className="text-xs text-black">{numberToCurrency(subtotal)}</p>
        </div>
        <div className="flex flex-col items-end mt-4">
          <Button label="Checkout" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
