import React from "react";
import Link from "next/link";
import Image from "next/image";

import { numberToCurrency } from "../helpers/formatter";

type Props = {
  image: string;
  name: string;
  price: number;
  url: string;
};

const Product: React.FC<Props> = ({ image, name, price, url }) => {
  const formattedPrice = numberToCurrency(price);

  return (
    <Link href={url}>
      <a className="group">
        <figure>
          <div className="overflow-hidden">
            <Image
              className="w-full aspect-square mb-2 transition-all duration-300 group-hover:scale-125 sm:mb-3"
              src={image}
              alt={name}
              width={320}
              height={320}
            />
          </div>
          <figcaption>
            <p className="text-xs truncate text-ellipsis overflow-hidden font-medium sm:mb-1">
              {name}
            </p>
            <p className="text-xs text-gray-500">{formattedPrice}</p>
          </figcaption>
        </figure>
      </a>
    </Link>
  );
};

export default Product;
