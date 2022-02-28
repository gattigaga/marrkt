import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/router";

import CartItem from "./CartItem";
import Button from "./Button";
import { numberToCurrency } from "../helpers/formatter";
import { getSubtotal } from "../helpers/math";
import CartInfo from "./CartInfo";
import { supabase } from "../helpers/supabase";
import { useStore } from "../store/store";

type CartPopupProps = {
  isOpen?: boolean;
  onClickRemoveItem: (itemId: string) => void;
  onClickBackdrop?: () => void;
};

const CartPopup: React.FC<CartPopupProps> = ({
  isOpen,
  onClickRemoveItem,
  onClickBackdrop,
}) => {
  const refBackdrop = useRef(null);
  const refCart = useRef(null);
  const refCartContent = useRef(null);
  const router = useRouter();
  const cartItems = useStore((state) => state.cartItems);

  const subtotal = useMemo(() => {
    const items = cartItems.map((item) => ({
      price: item.product.price,
      quantity: item.quantity,
    }));

    return getSubtotal(items);
  }, [cartItems]);

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
          <div className="h-24" />
          {!!cartItems.length && (
            <>
              <div className="max-h-full overflow-y-auto">
                {cartItems.map((item, index) => {
                  const isLast = index === cartItems.length - 1;

                  const { publicURL: thumbnailURL } = supabase.storage
                    .from("general")
                    .getPublicUrl(`products/${item.product.thumbnail}`);

                  return (
                    <div key={item.id}>
                      <CartItem
                        name={item.product.name}
                        quantity={item.quantity}
                        price={item.product.price}
                        image={thumbnailURL as string}
                        onClickRemove={() => onClickRemoveItem(item.id)}
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
                <Button label="Checkout" onClick={() => router.push("/cart")} />
              </div>
              <div className="h-6" />
            </>
          )}
          {!cartItems.length && (
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
