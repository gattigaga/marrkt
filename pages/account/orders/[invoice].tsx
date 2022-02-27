import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";

import Menu from "../../../components/Menu";
import { supabase } from "../../../helpers/supabase";
import AccountMenu from "../../../components/AccountMenu";
import Info from "../../../components/Info";
import { apiURL } from "../../../config/app";
import { numberToCurrency } from "../../../helpers/formatter";

export const getServerSideProps = async ({ req, query: urlQuery }) => {
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
    const res = await fetch(`${apiURL}/orders/${invoice}`);
    const { data } = await res.json();

    return data;
  })();

  return {
    props: {
      order,
    },
  };
};

const OrderDetailPage: NextPage = ({ order }) => {
  const router = useRouter();

  console.log(order);

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="min-h-screen flex px-4 pt-28 pb-24 md:px-8">
        <div className="flex-1 mr-16">
          <AccountMenu />
        </div>
        <div className="w-3/4 ml-auto">
          <h1 className="text-md font-medium text-black mb-8">
            Order #{router.query.invoice}
          </h1>
          <div>
            <div className="mb-12">
              <h2 className="text-sm font-medium text-black mb-6">General</h2>
              <div className="grid grid-cols-4 gap-4">
                <Info label="Invoice" value={`#${order.invoice_code}`} />
                <Info label="Payment Method" value="Paypal" />
                <Info label="Total Items" value={`${order.items_count} pcs`} />
                <Info
                  label="Date"
                  value={format(
                    new Date(order.created_at),
                    "EEEE, dd MMM yyyy HH:mm"
                  )}
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-black mb-6">Shipping</h2>
              <div className="grid grid-cols-4 gap-4">
                <Info label="Person Name" value={order.shipping.person_name} />
                <Info
                  label="Country Code"
                  value={order.shipping.country_code}
                />
                <div className="col-span-2">
                  <Info
                    label="Postal Code"
                    value={order.shipping.postal_code}
                  />
                </div>
                <Info
                  label="Address Line 1"
                  value={order.shipping.address_1 || "-"}
                />
                <Info
                  label="Address Line 2"
                  value={order.shipping.address_2 || "-"}
                />
                <Info
                  label="Admin Area 1"
                  value={order.shipping.admin_area_1 || "-"}
                />
                <Info
                  label="Admin Area 2"
                  value={order.shipping.admin_area_2 || "-"}
                />
              </div>
            </div>

            <table className="w-full mt-12">
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
                          {numberToCurrency(item.product.price * item.quantity)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="w-full flex justify-between py-4 mb-8">
              <p className="text-xs font-medium text-black">Subtotal</p>
              <p className="text-lg text-black font-bold">
                {numberToCurrency(order.total)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailPage;
