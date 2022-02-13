import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
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

  const products = await (async () => {
    const params = {
      orderBy: `"name"`,
    };

    const res = await fetch(
      `${apiUrl}/products.json?${new URLSearchParams(params).toString()}`
    );

    const data = await res.json();

    const result = collectionToArray<{
      name: string;
      slug: string;
      images: string[];
      price: number;
      description: string;
      categoryId: string;
    }>(data);

    return result;
  })();

  return {
    props: {
      categories,
      products,
    },
  };
}

const ProductsPage: NextPage = ({ categories, products }) => {
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
                    image={product.images[0]}
                    name={product.name}
                    price={product.price}
                    url={`/products/${product.slug}`}
                  />
                );
              })}
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
