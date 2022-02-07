import type { NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import Button from "../components/Button";

import Menu from "../components/Menu";
import { numberToCurrency } from "../helpers/formatter";
import { getSubtotal } from "../helpers/math";

const CartPage: NextPage = () => {
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

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="min-h-screen flex flex-col items-center">
        <div className="w-2/3 pt-28 pb-24">
          <h1 className="text-md font-medium text-black mt-4 mb-8">My Cart</h1>
          <table className="w-full">
            <thead className="border-b-2 border-black">
              <th className="py-4">
                <p className="text-xs font-medium text-black text-left">
                  Product
                </p>
              </th>
              <th className="py-4">
                <p className="text-xs font-medium text-black">QTY</p>
              </th>
              <th className="py-4">
                <p className="text-xs font-medium text-black">Subtotal</p>
              </th>
              <th className="py-4">
                <p className="text-xs font-medium text-black text-right">
                  Remove
                </p>
              </th>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4">
                      <div className="flex">
                        <img
                          className="w-16 h-16 mr-6 object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="w-40 mr-auto py-2">
                          <p className="text-black text-xs font-medium truncate text-ellipsis overflow-hidden mb-1">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {numberToCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs text-black text-center">
                        x{item.quantity}
                      </p>
                    </td>
                    <td>
                      <p className="text-xs text-black text-center">
                        {numberToCurrency(item.price * item.quantity)}
                      </p>
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <button type="button" onClick={() => {}}>
                          <p className="text-black text-xs underline">Remove</p>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex">
            <div className="w-64 ml-auto flex flex-col items-end">
              <div className="w-full flex justify-between py-4 mb-8">
                <p className="text-xs font-medium text-black">Subtotal</p>
                <p className="text-xs text-black">
                  {numberToCurrency(subtotal)}
                </p>
              </div>
              <Button label="Checkout" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
