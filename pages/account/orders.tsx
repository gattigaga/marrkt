import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

import Menu from "../../components/Menu";
import OrderItem from "../../components/OrderItem";
import Pagination from "../../components/Pagination";
import { supabase } from "../../helpers/supabase";
import AccountMenu from "../../components/AccountMenu";
import { apiURL } from "../../config/app";

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

  const { orders, totalPages } = await (async () => {
    const query = queryString.stringify({
      user_id: user?.id,
      page: urlQuery?.page || 1,
    });

    const res = await fetch(`${apiURL}/orders?${query}`);
    const { data: orders, metadata } = await res.json();

    return {
      orders,
      totalPages: metadata.totalPages,
    };
  })();

  return {
    props: {
      orders,
      totalPages,
    },
  };
};

const OrdersPage: NextPage = ({ orders, totalPages }) => {
  const router = useRouter();
  const currentPage = Number(router.query.page as string) || 1;

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
          <h1 className="text-md font-medium text-black mb-8">Orders</h1>
          <div className="mb-8">
            {orders.map((order) => {
              const { publicURL: thumbnailURL } = supabase.storage
                .from("general")
                .getPublicUrl(`products/${order.items[0].product.thumbnail}`);

              return (
                <OrderItem
                  key={order.id}
                  code={order.invoice_code}
                  thumbnail={thumbnailURL as string}
                  totalItems={order.items_count}
                  amount={order.total}
                  date={order.created_at}
                  url="/"
                />
              );
            })}
          </div>
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(pageIndex) => {
                const query = queryString.stringify({
                  ...router.query,
                  page: pageIndex,
                });

                router.push(`/account/orders?${query}`);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
