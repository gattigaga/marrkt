import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";

import Filter from "../../components/Filter";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import Product from "../../components/Product";
import supabase from "../../helpers/supabase";
import useProductsQuery from "../../hooks/products/use-products-query";

type Props = {};

const ProductsPage: NextPage<Props> = ({}) => {
  const router = useRouter();

  const { data: productsData } = useProductsQuery({
    ...router.query,
    page: (router.query?.page || "1") as string,
  });

  const products = productsData?.data || [];
  const totalPages = productsData?.metadata.totalPages;
  const currentPage = Number(router.query?.page as string) || 1;

  return (
    <Layout>
      <Head>
        <title>Products | Marrkt</title>
      </Head>

      <main className="px-6 pt-28 pb-24 md:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mb-16 md:mr-12">
            {!!products.length && (
              <>
                <div className="grid grid-cols-2 gap-4 mb-8 sm:gap-y-6 md:gap-y-8 lg:grid-cols-4">
                  {products.map((product) => {
                    const { publicURL: imageURL } = supabase.storage
                      .from("general")
                      .getPublicUrl(`products/${product.thumbnail}`);

                    return (
                      <Product
                        key={product.id}
                        image={imageURL || ""}
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
          <div className="w-full border-t border-gray-200 pt-6 md:border-0 md:pt-0 md:w-64">
            <Filter />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProductsPage;
