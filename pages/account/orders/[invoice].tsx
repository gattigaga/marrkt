import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useRouter } from "next/router";
import { format } from "date-fns";

import Layout from "../../../components/Layout";
import { supabase } from "../../../helpers/supabase";
import AccountMenu from "../../../components/AccountMenu";
import Info from "../../../components/Info";
import { numberToCurrency } from "../../../helpers/formatter";
import axios from "../../../helpers/axios";
import * as models from "../../../types/models";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query: urlQuery,
}) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const order = await (async () => {
    const { invoice } = urlQuery;
    const res = await axios.get(`/orders/${invoice}`);
    const result = res.data.data;

    return result;
  })();

  return {
    props: {
      order,
    },
  };
};

type Props = {
  order: models.Order & {
    items: (models.CartItem & { product: models.Product })[];
    shipping: models.ShippingItem;
  };
};

const OrderDetailPage: NextPage<Props> = ({ order }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const subtotal = order.total;
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      const luxy = require("luxy.js");

      luxy.init();
    }
  }, []);

  return (
    <div id="luxy">
      <Head>
        <title>Order #{router.query.invoice} | The World #1 Marketplace</title>
      </Head>

      <Layout>
        <main className="min-h-screen flex flex-col-reverse px-4 pt-28 pb-24 md:flex-row md:px-8">
          {!isLoading && (
            <>
              <div className="flex-1 mt-16 md:mt-0 md:mr-16">
                <AccountMenu
                  onLogoutStart={() => setIsLoading(true)}
                  onLogoutEnd={() => setIsLoading(false)}
                />
              </div>
              <div className="md:w-3/4">
                <h1 className="text-md font-medium text-black mb-8">
                  Order #{router.query.invoice}
                </h1>
                <div>
                  <div className="mb-8">
                    <h2 className="text-sm font-medium text-black mb-6">
                      General
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                      <Info label="Invoice" value={`#${order.invoice_code}`} />
                      <Info label="Payment Method" value="Paypal" />
                      <Info
                        label="Total Items"
                        value={`${order.items_count} pcs`}
                      />
                      <Info
                        label="Date"
                        value={format(
                          new Date(order.created_at),
                          "EEEE, dd MMM yyyy HH:mm"
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-12">
                    <h2 className="text-sm font-medium text-black mb-6">
                      Shipping
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                      <Info
                        label="Person Name"
                        value={order.shipping.person_name}
                      />
                      <Info
                        label="Country Code"
                        value={order.shipping.country_code}
                      />
                      <div className="col-span-2">
                        <Info
                          label="Postal Code"
                          value={order.shipping.postal_code || "-"}
                        />
                      </div>
                      <Info
                        label="Address Line 1"
                        value={order.shipping.address_1}
                      />
                      <Info
                        label="Address Line 2"
                        value={order.shipping.address_2 || "-"}
                      />
                      <Info
                        label="Admin Area 1"
                        value={order.shipping.admin_area_1}
                      />
                      <Info
                        label="Admin Area 2"
                        value={order.shipping.admin_area_2 || "-"}
                      />
                    </div>
                  </div>

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
                          <p className="text-xs font-medium text-black text-right">
                            Subtotal
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => {
                        const { publicURL: thumbnailURL } = supabase.storage
                          .from("general")
                          .getPublicUrl(`products/${item.product.thumbnail}`);

                        const subtotal =
                          Number(item.product.price) * Number(item.quantity);

                        return (
                          <tr
                            key={item.id}
                            className="border-b border-gray-200"
                          >
                            <td className="py-4">
                              <div className="flex">
                                <Image
                                  className="w-16 h-16 object-cover"
                                  src={thumbnailURL || ""}
                                  alt={item.product.name}
                                  width={64}
                                  height={64}
                                />
                                <div className="w-24 ml-4 mr-auto md:w-40">
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
                                {numberToCurrency(subtotal)}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="mt-6 flex flex-col items-end md:ml-auto md:w-72">
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
                      <p className="text-lg font-bold text-black">
                        {numberToCurrency(total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {isLoading && (
            <div className="w-full mt-40 flex flex-col items-center">
              <BeatLoader color="black" size={24} loading />
              <p className="mt-6 text-md text-black text-center">
                Signing out...
              </p>
            </div>
          )}
        </main>
      </Layout>
    </div>
  );
};

export default OrderDetailPage;
