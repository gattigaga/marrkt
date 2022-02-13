import type { NextPage } from "next";
import Head from "next/head";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAt,
  endAt,
} from "firebase/firestore";

import Filter from "../../components/Filter";
import Menu from "../../components/Menu";
import Product from "../../components/Product";
import { firebaseDB } from "../../helpers/firebase";

export const getServerSideProps = async ({ query: urlQuery }) => {
  const categories = await (async () => {
    const categoriesRef = collection(firebaseDB, "categories");
    const querySnapshot = await getDocs(query(categoriesRef, orderBy("name")));

    const result: {
      id: string;
      name: string;
      slug: string;
    }[] = [];

    querySnapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        ...(doc.data() as {
          name: string;
          slug: string;
        }),
      });
    });

    return result;
  })();

  const products = await (async () => {
    const { keyword } = urlQuery;
    const productsRef = collection(firebaseDB, "products");
    const queryParams = [orderBy("name")];

    if (keyword) {
      queryParams.push(startAt(keyword));
      queryParams.push(endAt(`${keyword}\uf8ff`));
    }

    const querySnapshot = await getDocs(query(productsRef, ...queryParams));

    const result: {
      id: string;
      name: string;
      slug: string;
      images: string[];
      price: number;
      description: string;
      categoryId: string;
    }[] = [];

    querySnapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        ...(doc.data() as {
          name: string;
          slug: string;
          images: string[];
          price: number;
          description: string;
          categoryId: string;
        }),
      });
    });

    return result;
  })();

  return {
    props: {
      categories,
      products,
    },
  };
};

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
