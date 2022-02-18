import type { NextPage } from "next";
import Head from "next/head";
import queryString from "query-string";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";

import Menu from "../../components/Menu";
import Product from "../../components/Product";
import Button from "../../components/Button";
import { numberToCurrency } from "../../helpers/formatter";
import { supabase } from "../../helpers/supabase";
import { apiURL } from "../../config/app";
import { useStore } from "../../store/store";
import { useRef } from "react";

export const getServerSideProps = async ({ query: urlQuery }) => {
  const product = await (async () => {
    const { slug } = urlQuery;
    const res = await fetch(`${apiURL}/products/${slug}`);
    const { data } = await res.json();

    return data;
  })();

  const { relatedProducts } = await (async () => {
    const query = queryString.stringify({
      categories: product.product_categories.slug,
      page: 1,
    });

    const res = await fetch(`${apiURL}/products?${query}`);
    const { data: products } = await res.json();

    return { relatedProducts: products.slice(0, 4) };
  })();

  return {
    props: {
      product,
      relatedProducts,
    },
  };
};

const ProductDetailPage: NextPage = ({ product, relatedProducts }) => {
  const router = useRouter();
  const refMenu = useRef();
  const addToCart = useStore((state) => state.addToCart);

  const user = supabase.auth.user();

  const { publicURL: thumbnailURL } = supabase.storage
    .from("general")
    .getPublicUrl(`products/${product.thumbnail}`);

  const add = () => {
    if (!user) {
      router.push("/account/login");
      return;
    }

    const item = {
      id: uuid(),
      quantity: 1,
      product,
    };

    refMenu.current?.runTotalItemsAnimation(() => addToCart(item));
  };

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu ref={refMenu} />
      <main className="pb-24">
        <div className="flex mb-24">
          {/* Left side */}
          <div className="flex-1 grid grid-cols-2 gap-2">
            <div>
              <img
                className="w-full h-full object-cover"
                src={thumbnailURL as string}
                alt={`${product.name} Thumbnail`}
              />
            </div>
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
            <Button label="Add to cart" onClick={add} />
          </div>
        </div>
        <div className="px-8">
          <h2 className="mb-10 text-2xl text-black">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-y-6 md:grid-cols-4 md:gap-y-8">
            {relatedProducts.map((product) => {
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
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
