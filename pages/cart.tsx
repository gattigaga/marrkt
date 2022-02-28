import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useMemo, useRef } from "react";

import Menu from "../components/Menu";
import Counter from "../components/Counter";
import { numberToCurrency } from "../helpers/formatter";
import { getSubtotal } from "../helpers/math";
import { useStore } from "../store/store";
import { supabase } from "../helpers/supabase";
import Button from "../components/Button";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const CartPage: NextPage = () => {
  const router = useRouter();
  const refMenu = useRef(null);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);
  const increaseItemQty = useStore((state) => state.increaseItemQty);
  const decreaseItemQty = useStore((state) => state.decreaseItemQty);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const user = supabase.auth.user();

  const subtotal = useMemo(() => {
    const items = cartItems.map((item) => ({
      price: item.product.price,
      quantity: item.quantity,
    }));

    return getSubtotal(items);
  }, [cartItems]);

  const increaseQty = (itemId: string) => {
    refMenu.current?.runTotalItemsAnimation(() => increaseItemQty(itemId));
  };

  const decreaseQty = (itemId: string) => {
    refMenu.current?.runTotalItemsAnimation(
      () => decreaseItemQty(itemId),
      true
    );
  };

  const removeItem = (itemId: string) => {
    refMenu.current?.runTotalItemsAnimation(() => removeFromCart(itemId), true);
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
              <tr>
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
              </tr>
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
                          <Image
                            className="w-16 h-16 object-cover"
                            src={thumbnailURL as string}
                            alt={item.product.name}
                            width={64}
                            height={64}
                          />
                          <div className="w-40 ml-6 mr-auto py-2">
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
                            onClickIncrease={() => increaseQty(item.id)}
                            onClickDecrease={() => decreaseQty(item.id)}
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
                            onClick={() => removeItem(item.id)}
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
              <div className="w-72 mt-6 ml-auto flex flex-col items-end">
                <div className="w-full flex justify-between py-2 mb-8">
                  <p className="text-xs text-black">Subtotal</p>
                  <p className="text-xs text-black">
                    {numberToCurrency(subtotal)}
                  </p>
                </div>
                <Button
                  label="Checkout"
                  onClick={() => router.push("/checkout")}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartPage;
