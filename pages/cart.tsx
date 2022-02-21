import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useRef } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

import Menu from "../components/Menu";
import Counter from "../components/Counter";
import { numberToCurrency } from "../helpers/formatter";
import { getSubtotal } from "../helpers/math";
import { useStore } from "../store/store";
import { supabase } from "../helpers/supabase";
import { apiURL } from "../config/app";

const CartPage: NextPage = () => {
  const refMenu = useRef(null);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);
  const increaseItemQty = useStore((state) => state.increaseItemQty);
  const decreaseItemQty = useStore((state) => state.decreaseItemQty);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const invoiceCode = useMemo(() => `INV/${Date.now()}`, []);

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

  const checkout = async (shipping: {
    person_name: string;
    address_1?: string;
    address_2?: string;
    admin_area_1?: string;
    admin_area_2?: string;
    postal_code?: string;
    country_code: string;
  }) => {
    if (!user) return;

    try {
      const body = JSON.stringify({
        user_id: user.id,
        invoice_code: invoiceCode,
        shipping: {
          person_name: shipping.person_name,
          address_1: shipping.address_1,
          address_2: shipping.address_2,
          admin_area_1: shipping.admin_area_1,
          admin_area_2: shipping.admin_area_2,
          postal_code: shipping.postal_code,
          country_code: shipping.country_code,
        },
        items: cartItems.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      });

      await fetch(`${apiURL}/checkout`, {
        method: "POST",
        body,
      });

      clearCart();
      toast("Transaction completed !");
    } catch (error) {
      console.log(error);
      toast("Failed to submit checkout data !");
    }
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
              <div className="w-64 ml-auto flex flex-col items-end">
                <div className="w-full flex justify-between py-4 mb-8">
                  <p className="text-xs font-medium text-black">Subtotal</p>
                  <p className="text-xs text-black">
                    {numberToCurrency(subtotal)}
                  </p>
                </div>
                <PayPalButtons
                  className="rounded-none w-full"
                  style={{
                    color: "black",
                    layout: "horizontal",
                    height: 40,
                    shape: "rect",
                    label: "checkout",
                    tagline: false,
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          invoice_id: invoiceCode,
                          items: cartItems.map((item) => {
                            return {
                              name: item.product.name,
                              quantity: `${item.quantity}`,
                              category: "PHYSICAL_GOODS",
                              unit_amount: {
                                currency_code: "USD",
                                value: `${item.product.price}`,
                              },
                            };
                          }),
                          amount: {
                            breakdown: {
                              item_total: {
                                currency_code: "USD",
                                value: `${subtotal}`,
                              },
                            },
                            value: `${subtotal}`,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const shipping = details.purchase_units[0].shipping;

                      if (!shipping) {
                        toast("Failed to get shipping data !");
                        return;
                      }

                      checkout({
                        person_name: shipping.name.full_name,
                        address_1: shipping.address.address_line_1,
                        address_2: shipping.address.address_line_2,
                        admin_area_1: shipping.address.admin_area_1,
                        admin_area_2: shipping.address.admin_area_2,
                        postal_code: shipping.address.postal_code,
                        country_code: shipping.address.country_code,
                      });
                    });
                  }}
                  onError={() => {
                    toast("Failed to checkout !");
                  }}
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
