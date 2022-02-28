import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { numberToCurrency } from "../helpers/formatter";

type Props = {
  code: string;
  thumbnail: string;
  totalItems: number;
  amount: number;
  date: string;
  url: string;
};

const OrderItem: React.FC<Props> = ({
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
          <Image
            className="w-16 h-16 object-cover"
            src={thumbnail}
            alt={code}
            width={64}
            height={64}
          />
          <div className="flex-1 ml-6">
            <p className="text-xs font-medium text-black mb-2">#{code}</p>
            <p className="text-xs text-gray-500">
              Total items: {totalItems} pcs
            </p>
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
