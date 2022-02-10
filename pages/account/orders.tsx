import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useMemo } from "react";
import AccountMenu from "../../components/AccountMenu";

import Menu from "../../components/Menu";
import OrderItem from "../../components/OrderItem";
import Pagination from "../../components/Pagination";

const OrdersPage: NextPage = () => {
  const items = useMemo(() => {
    return [...Array(5)].map((_, index) => {
      return {
        id: index + 1,
        thumbnail: "/images/person.jpg",
        code: "INV/230895",
        totalItems: 3,
        amount: 5000,
        date: "2021-05-21 08:30:00",
        url: "/",
      };
    });
  }, []);

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
            {items.map((item) => {
              return (
                <OrderItem
                  key={item.id}
                  code={item.code}
                  thumbnail={item.thumbnail}
                  totalItems={item.totalItems}
                  amount={item.amount}
                  date={item.date}
                  url={item.url}
                />
              );
            })}
          </div>
          <div className="flex justify-center">
            <Pagination initialPage={0} totalPages={10} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
