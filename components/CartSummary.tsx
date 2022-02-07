import React, { useMemo } from "react";

import { numberToCurrency } from "../helpers/formatter";
import { getSubtotal } from "../helpers/math";
import CartInfo from "./CartInfo";
import CartItem from "./CartItem";

const CartSummary = () => {
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
    ],
    []
  );

  const subtotal = useMemo(() => getSubtotal(items), [items]);

  const shippingCost = 0;
  const total = subtotal + shippingCost;

  return (
    <div className="border-b border-gray-200">
      <div>
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
              {!isLast && <div className="w-full border-t border-gray-200" />}
            </div>
          );
        })}
      </div>

      <CartInfo label="Subtotal" value={numberToCurrency(subtotal)} />
      <CartInfo
        label="Shipping"
        value={shippingCost ? numberToCurrency(shippingCost) : "Free"}
      />
      <CartInfo label="Total" value={numberToCurrency(total)} />
    </div>
  );
};

export default CartSummary;
