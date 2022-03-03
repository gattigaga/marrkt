import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";

import Filter from "../../components/Filter";
import Menu from "../../components/Menu";
import Pagination from "../../components/Pagination";
import Product from "../../components/Product";
import { supabase } from "../../helpers/supabase";
import axios from "../../helpers/axios";
import * as models from "../../types/models";

export const getServerSideProps: GetServerSideProps = async ({
  query: urlQuery,
}) => {
  const categories = await (async () => {
    const res = await axios.get("/product-categories");
    const result = res.data.data;

    return result;
  })();

  const { products, totalPages } = await (async () => {
    const params = {
      ...urlQuery,
      page: urlQuery?.page || 1,
    };

    const res = await axios.get("/products", { params });
    const { data: products, metadata } = res.data;

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

type Props = {
  categories: models.ProductCategory[];
  products: (models.Product & {
    category: models.ProductCategory;
  })[];
  totalPages: number;
};

const ProductsPage: NextPage<Props> = ({
  categories,
  products,
  totalPages,
}) => {
  const router = useRouter();

  const currentPage = Number(router.query.page as string) || 1;

  return (
    <div>
      <Head>
        <title>Products | Marrkt</title>
      </Head>

      <Menu />
      <main className="px-4 pt-28 pb-24 md:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mb-16 md:mr-12">
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
            <Filter categories={categories} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
