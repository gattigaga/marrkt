import React from "react";

import { numberToCurrency } from "../helpers/formatter";

type CartItemProps = {
  name: string;
  quantity: number;
  price: number;
  image: string;
  onClickRemove?: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  quantity,
  price,
  image,
  onClickRemove,
}) => {
  const total = price * quantity;

  return (
    <div className="flex py-4">
      <img className="w-16 h-16 mr-6 object-cover" src={image} alt={name} />
      <div className="w-40 mr-auto py-2">
        <p className="text-black text-xs font-medium truncate text-ellipsis overflow-hidden mb-1">
          {name}
        </p>
        <p className="text-gray-500 text-xs">
          {numberToCurrency(price)} x {quantity}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between py-2">
        <p className="text-black text-xs">{numberToCurrency(total)}</p>
        <button type="button" onClick={onClickRemove}>
          <p className="text-black text-xs underline">Remove</p>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
