import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";
import BeatLoader from "react-spinners/BeatLoader";

import Layout from "../../../components/Layout";
import OrderItem from "../../../components/OrderItem";
import Pagination from "../../../components/Pagination";
import { supabase } from "../../../helpers/supabase";
import AccountMenu from "../../../components/AccountMenu";
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

  const { orders, totalPages } = await (async () => {
    const params = {
      user_id: user?.id,
      page: urlQuery?.page || 1,
    };

    const res = await axios.get("/orders", { params });
    const { data: orders, metadata } = res.data;

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

type Props = {
  orders: (models.Order & {
    items: (models.CartItem & { product: models.Product })[];
  })[];
  totalPages: number;
};

const OrdersPage: NextPage<Props> = ({ orders, totalPages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const currentPage = Number(router.query.page as string) || 1;

  return (
    <Layout>
      <Head>
        <title>Orders | Marrkt</title>
      </Head>

      <main className="min-h-screen">
        {!isLoading && (
          <div
            className="flex flex-col-reverse px-4 pt-28 pb-24 md:flex-row md:px-8"
            data-scroll-section
          >
            <div className="flex-1 mt-16 md:mt-0 md:mr-16">
              <AccountMenu
                onLogoutStart={() => setIsLoading(true)}
                onLogoutEnd={() => setIsLoading(false)}
              />
            </div>
            <div className="md:w-3/4">
              <h1 className="text-md font-medium text-black mb-8">Orders</h1>
              {!!orders.length && (
                <>
                  <div className="mb-8">
                    {orders.map((order) => {
                      const { publicURL: thumbnailURL } = supabase.storage
                        .from("general")
                        .getPublicUrl(
                          `products/${order.items[0].product.thumbnail}`
                        );

                      return (
                        <OrderItem
                          key={order.id}
                          code={order.invoice_code}
                          thumbnail={thumbnailURL || ""}
                          totalItems={order.items_count}
                          amount={order.total}
                          date={order.created_at}
                          url={`/account/orders/${order.invoice_code}`}
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
                </>
              )}
              {!orders.length && (
                <div>
                  <p className="text-xs text-black">
                    There&lsquo;s no orders found.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {isLoading && (
          <div
            className="w-full mt-40 flex flex-col items-center"
            data-scroll-section
          >
            <BeatLoader color="black" size={24} loading />
            <p className="mt-6 text-md text-black text-center">
              Signing out...
            </p>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default OrdersPage;
