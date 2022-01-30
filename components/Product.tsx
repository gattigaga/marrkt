import React from "react";
import { numberToCurrency } from "../helpers/formatter";

type Product = {
  image: string;
  name: string;
  price: number;
  url: string;
};

const Product: React.FC<Product> = ({ image, name, price, url }) => {
  const formattedPrice = numberToCurrency(price);

  return (
    <a href={url}>
      <figure>
        <img
          className="w-full aspect-square mb-2 sm:mb-3"
          src={image}
          alt={name}
        />
        <figcaption>
          <p className="text-xs truncate text-ellipsis overflow-hidden font-medium sm:mb-1">
            {name}
          </p>
          <p className="text-xs text-gray-500">{formattedPrice}</p>
        </figcaption>
      </figure>
    </a>
  );
};

export default Product;
