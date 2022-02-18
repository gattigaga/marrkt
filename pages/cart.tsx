import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useRef } from "react";

import Menu from "../components/Menu";
import Button from "../components/Button";
import Counter from "../components/Counter";
import { numberToCurrency } from "../helpers/formatter";
import { getSubtotal } from "../helpers/math";
import { useStore } from "../store/store";
import { supabase } from "../helpers/supabase";

const CartPage: NextPage = () => {
  const refMenu = useRef(null);
  const cartItems = useStore((state) => state.cartItems);
  const increaseItemQty = useStore((state) => state.increaseItemQty);
  const decreaseItemQty = useStore((state) => state.decreaseItemQty);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const subtotal = useMemo(() => {
    const items = cartItems.map((item) => ({
      price: item.product.price,
      quantity: item.quantity,
    }));

    return getSubtotal(items);
  }, [cartItems]);

  const increase = (itemId: string) => {
    refMenu.current?.runTotalItemsAnimation(() => increaseItemQty(itemId));
  };

  const decrease = (itemId: string) => {
    refMenu.current?.runTotalItemsAnimation(() => decreaseItemQty(itemId));
  };

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu ref={refMenu} />
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
            {!!cartItems.length && (
              <tbody>
                {cartItems.map((item) => {
                  const { publicURL: thumbnailURL } = supabase.storage
                    .from("general")
                    .getPublicUrl(`products/${item.product.thumbnail}`);

                  return (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-4">
                        <div className="flex">
                          <img
                            className="w-16 h-16 mr-6 object-cover"
                            src={thumbnailURL as string}
                            alt={item.product.name}
                          />
                          <div className="w-40 mr-auto py-2">
                            <p className="text-black text-xs font-medium truncate text-ellipsis overflow-hidden mb-1">
                              {item.product.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {numberToCurrency(item.product.price)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <Counter
                            value={item.quantity}
                            onClickIncrease={() => increase(item.id)}
                            onClickDecrease={() => decrease(item.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <p className="text-xs text-black text-center">
                          {numberToCurrency(item.product.price * item.quantity)}
                        </p>
                      </td>
                      <td>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <p className="text-black text-xs underline">
                              Remove
                            </p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
            {!cartItems.length && (
              <tbody>
                <tr>
                  <td colSpan={4}>
                    <p className="text-center text-xs mt-6">
                      There&lsquo;s no items in the cart.
                    </p>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          {!!cartItems.length && (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
