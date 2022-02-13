import type { NextPage } from "next";
import Head from "next/head";
import Filter from "../../components/Filter";

import Menu from "../../components/Menu";
import Pagination from "../../components/Pagination";
import Product from "../../components/Product";
import { apiUrl } from "../../config/app";
import { collectionToArray } from "../../helpers/adapter";

export async function getServerSideProps() {
  const categories = await (async () => {
    const res = await fetch(`${apiUrl}/categories.json`);
    const data = await res.json();

    const result = collectionToArray<{
      name: string;
      slug: string;
    }>(data);

    return result;
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
        <h2 className="text-md font-medium mb-4">
          All Products ({products.length})
        </h2>
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
              <Pagination initialPage={0} totalPages={2} />
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
