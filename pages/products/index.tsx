import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";

import Filter from "../../components/Filter";
import Menu from "../../components/Menu";
import Pagination from "../../components/Pagination";
import Product from "../../components/Product";
import { apiURL } from "../../config/app";
import { supabase } from "../../helpers/supabase";

export const getServerSideProps = async ({ query: urlQuery }) => {
  const categories = await (async () => {
    const res = await fetch(`${apiURL}/product-categories`);
    const { data } = await res.json();

    return data;
  })();

  const { products, totalPages } = await (async () => {
    const query = queryString.stringify({
      ...urlQuery,
      page: urlQuery?.page || 1,
    });

    const res = await fetch(`${apiURL}/products?${query}`);
    const { data: products, metadata } = await res.json();

    return { products, totalPages: metadata.totalPages };
  })();

  return {
    props: {
      categories,
      products,
      totalPages,
    },
  };
};

const ProductsPage: NextPage = ({ categories, products, totalPages }) => {
  const router = useRouter();

  const currentPage = Number(router.query.page as string) || 1;

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
              <>
                <div className="grid grid-cols-2 gap-4 mb-8 sm:gap-y-6 md:grid-cols-4 md:gap-y-8">
                  {products.map((product) => {
                    const { publicURL: imageURL } = supabase.storage
                      .from("general")
                      .getPublicUrl(`products/${product.thumbnail}`);

                    return (
                      <Product
                        key={product.id}
                        image={imageURL as string}
                        name={product.name}
                        price={product.price}
                        url={`/products/${product.slug}`}
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

                      router.push(`/products?${query}`);
                    }}
                  />
                </div>
              </>
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
