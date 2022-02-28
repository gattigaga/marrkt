import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

import Menu from "../components/Menu";
import { numberToCurrency } from "../helpers/formatter";
import { getSubtotal } from "../helpers/math";
import { useStore } from "../store/store";
import { supabase } from "../helpers/supabase";
import axios from "../helpers/axios";

const CheckoutPage: NextPage = () => {
  const refMenu = useRef(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);
  const invoiceCode = useMemo(() => `${Date.now()}`, []);
  const router = useRouter();

  const user = supabase.auth.user();

  const subtotal = useMemo(() => {
    const items = cartItems.map((item) => ({
      price: item.product.price,
      quantity: item.quantity,
    }));

    return getSubtotal(items);
  }, [cartItems]);

  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const checkout = async (shipping: {
    person_name: string;
    address_1?: string;
    address_2?: string;
    admin_area_1?: string;
    admin_area_2?: string;
    postal_code?: string;
    country_code: string;
  }) => {
    if (!user) {
      toast("Cannot checkout ! You should logged in before.");
      return;
    }

    setIsCheckingOut(true);

    try {
      const body = {
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
      };

      await axios.post("/checkout", body);
      await router.push(`/account/orders/${invoiceCode}`);

      clearCart();
      toast("Transaction completed !");
    } catch (error) {
      console.log(error);
      toast("Failed to submit checkout data !");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Checkout | Marrkt</title>
      </Head>

      <Menu ref={refMenu} />
      <main className="min-h-screen flex flex-col items-center">
        <div className="w-1/3 pt-28 pb-24">
          {!isCheckingOut && (
            <div className="p-8 border">
              <h1 className="text-md font-medium text-black mt-4 mb-8">
                Checkout
              </h1>
              <p className="text-xs text-gray-500 mb-1">
                Invoice:&nbsp;&nbsp;&nbsp;
                <span className="text-black font-medium">#{invoiceCode}</span>
              </p>
              <p className="text-xs text-gray-500 mb-1">
                Payment Method:&nbsp;&nbsp;&nbsp;
                <span className="text-black font-medium">Paypal</span>
              </p>
              <table className="w-full mt-4">
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
                      <p className="text-xs font-medium text-black text-right">
                        Subtotal
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
                            <p className="text-center text-xs text-black">
                              {item.quantity}
                            </p>
                          </td>
                          <td>
                            <p className="text-xs text-black text-right">
                              {numberToCurrency(
                                item.product.price * item.quantity
                              )}
                            </p>
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
                <>
                  <div className="mb-8 mt-6">
                    <div className="w-full flex justify-between py-2">
                      <p className="text-xs text-black">Subtotal</p>
                      <p className="text-xs text-black">
                        {numberToCurrency(subtotal)}
                      </p>
                    </div>
                    <div className="w-full flex justify-between py-2">
                      <p className="text-xs text-black">Shipping Cost</p>
                      <p className="text-xs text-black">
                        {numberToCurrency(shippingCost)}
                      </p>
                    </div>
                    <div className="w-full flex justify-between py-2">
                      <p className="text-xs font-bold text-black">Total</p>
                      <p className="text-lg text-black font-bold">
                        {numberToCurrency(total)}
                      </p>
                    </div>
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
                      if (!actions.order) {
                        return Promise.resolve();
                      }

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
                </>
              )}
            </div>
          )}
          {isCheckingOut && (
            <div className="mt-40 flex flex-col items-center">
              <BeatLoader color="black" size={24} loading />
              <p className="mt-6 text-md text-black text-center">
                Please wait...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
