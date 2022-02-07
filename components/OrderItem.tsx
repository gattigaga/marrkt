import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { numberToCurrency } from "../helpers/formatter";

type OrderItemProps = {
  code: string;
  thumbnail: string;
  totalItems: number;
  amount: number;
  date: string;
  url: string;
};

const OrderItem: React.FC<OrderItemProps> = ({
  code,
  thumbnail,
  totalItems,
  amount,
  date,
  url,
}) => {
  return (
    <Link href={url}>
      <a>
        <div className="flex border-b border-gray-200 py-4">
          <img
            className="w-16 h-16 mr-6 object-cover"
            src={thumbnail}
            alt={code}
          />
          <div className="flex-1">
            <p className="text-xs text-black mb-2">{code}</p>
            <p className="text-xs text-gray-500">Total items: {totalItems}</p>
            <p className="text-xs text-gray-500">
              {format(new Date(date), "EEEE, dd MMM yyyy hh:mm")}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-md font-medium text-black mb-2">
              {numberToCurrency(amount)}
            </p>
            <span className="text-[0.5rem] font-bold text-white bg-amber-500 px-2 py-1">
              PENDING
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default OrderItem;
