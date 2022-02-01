import type { NextPage } from "next";
import Head from "next/head";

import Menu from "../../components/Menu";
import Product from "../../components/Product";

const ProductsPage: NextPage = () => {
  const products = [...Array(10)].map((_, index) => ({
    id: index,
    image: "https://via.placeholder.com/320x320",
    name: "CB 01 Black",
    price: 189,
    url: "https://google.com",
  }));

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="px-4 pt-28 pb-24 md:px-8">
        <h2 className="text-sm font-medium mb-4">All Products (50)</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-y-6 md:grid-cols-4 md:gap-y-8">
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
      </main>
    </div>
  );
};

export default ProductsPage;
