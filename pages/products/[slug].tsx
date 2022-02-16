import type { NextPage } from "next";
import Head from "next/head";
import Button from "../../components/Button";

import Menu from "../../components/Menu";
import Product from "../../components/Product";
import { numberToCurrency } from "../../helpers/formatter";
import { supabase } from "../../helpers/supabase";

export const getServerSideProps = async ({ query: urlQuery }) => {
  const product = await (async () => {
    const { slug } = urlQuery;
    const res = await fetch(`http://localhost:3000/api/products/${slug}`);
    const { data } = await res.json();

    return data;
  })();

  return {
    props: {
      product,
    },
  };
};

const ProductDetailPage: NextPage = ({ product }) => {
  const relatedProducts = [...Array(4)].map((_, index) => ({
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
      <main className="pb-24">
        <div className="flex mb-24">
          {/* Left side */}
          <div className="flex-1 grid grid-cols-2 gap-2">
            {product.product_images.map((image, index) => {
              const { publicURL: imageURL } = supabase.storage
                .from("general")
                .getPublicUrl(`products/${product.thumbnail}`);

              return (
                <div key={image.id}>
                  <img
                    className="w-full h-full object-cover"
                    src={imageURL as string}
                    alt={`${product.name} ${index + 1}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right side */}
          <div className="w-1/3 pl-14 pr-10 pt-32">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-md mb-8">{numberToCurrency(product.price)}</p>
            <p className="text-xs mb-8">{product.description}</p>
            <Button label="Add to cart" />
          </div>
        </div>
        <div className="px-8">
          <h2 className="mb-10 text-2xl text-black">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-y-6 md:grid-cols-4 md:gap-y-8">
            {relatedProducts.map((product) => {
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
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
