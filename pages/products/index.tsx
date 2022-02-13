import type { NextPage } from "next";
import Head from "next/head";
import queryString from "query-string";

import Filter from "../../components/Filter";
import Menu from "../../components/Menu";
import Product from "../../components/Product";
import { apiUrl } from "../../config/app";
import { collectionToArray } from "../../helpers/adapter";

export async function getServerSideProps({ query }) {
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
    const { keyword } = query;

    const params = {
      orderBy: `"name"`,
      startAt: keyword && `"${keyword}"`,
      endAt: keyword && `"${keyword}\uf8ff"`,
    };

    const stringifiedParams = queryString.stringify(params);
    const res = await fetch(`${apiUrl}/products.json?${stringifiedParams}`);
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
        <div className="flex">
          <div className="flex-1 mr-12">
            {!!products.length && (
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
            )}
            {!products.length && (
              <p className="text-xs text-black text-center mt-8">
                There&lsquo;s no products found.
              </p>
            )}
          </div>
          <div className="w-64">
            <Filter categories={categories} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
