import type { NextPage } from "next";
import Head from "next/head";
import Filter from "../../components/Filter";

import Menu from "../../components/Menu";
import Pagination from "../../components/Pagination";
import Product from "../../components/Product";

export async function getServerSideProps() {
  const categories = await (async () => {
    const res = await fetch(
      "https://marrkt-916b3-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json"
    );

    const data = await res.json();

    return data;
  })();

  return {
    props: {
      categories,
    },
  };
}

const ProductsPage: NextPage = ({ categories }) => {
  const products = [...Array(10)].map((_, index) => ({
    id: index,
    image: "https://via.placeholder.com/320x320",
    name: "CB 01 Black",
    price: 189,
    url: "/products/cb-01-black",
  }));

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="px-4 pt-28 pb-24 md:px-8">
        <h2 className="text-md font-medium mb-4">All Products (50)</h2>
        <div className="flex">
          <div className="mr-12">
            <div className="grid grid-cols-2 gap-4 mb-8 sm:gap-y-6 md:grid-cols-4 md:gap-y-8">
              {products.map((product) => {
                return (
                  <Product
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    url={product.url}
                  />
                );
              })}
            </div>
            <div className="flex justify-center">
              <Pagination initialPage={0} totalPages={10} />
            </div>
          </div>
          <div className="w-1/3">
            <Filter categories={categories} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
