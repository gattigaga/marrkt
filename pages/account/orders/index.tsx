import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

import Layout from "../../../components/Layout";
import OrderItem from "../../../components/OrderItem";
import Pagination from "../../../components/Pagination";
import supabase from "../../../helpers/supabase";
import AccountMenu from "../../../components/AccountMenu";
import { withAuthGuard } from "../../../helpers/server";
import useOrdersQuery from "../../../hooks/orders/use-orders-query";

export const getServerSideProps: GetServerSideProps = withAuthGuard(
  async ({}) => {
    return {
      props: {},
    };
  }
);

type Props = {};

const OrdersPage: NextPage<Props> = ({}) => {
  const router = useRouter();

  const currentPage = Number(router.query.page as string) || 1;

  const { data: orderData } = useOrdersQuery(currentPage);

  const orders = orderData?.data || [];
  const totalPages = orderData?.metadata.totalPages || 1;

  return (
    <Layout>
      <Head>
        <title>Orders | Marrkt</title>
      </Head>

      <main className="min-h-screen">
        <div className="flex flex-col-reverse px-4 pt-28 pb-24 md:flex-row md:px-8">
          <div className="flex-1 mt-16 md:mt-0 md:mr-16">
            <AccountMenu />
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
      </main>
    </Layout>
  );
};

export default OrdersPage;
