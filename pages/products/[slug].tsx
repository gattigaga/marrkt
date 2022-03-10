import type { GetServerSideProps, NextPage } from "next";
import { useRef } from "react";
import Head from "next/head";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout, { Exposed as LayoutExposed } from "../../components/Layout";
import Product from "../../components/Product";
import Button from "../../components/Button";
import { numberToCurrency } from "../../helpers/formatter";
import { supabase } from "../../helpers/supabase";
import { useStore } from "../../store/store";
import axios from "../../helpers/axios";
import * as models from "../../types/models";

export const getServerSideProps: GetServerSideProps = async ({
  query: urlQuery,
}) => {
  const product = await (async () => {
    const { slug } = urlQuery;
    const res = await axios.get(`/products/${slug}`);
    const result = await res.data.data;

    return result;
  })();

  const { relatedProducts } = await (async () => {
    const params = {
      categories: product.category.slug,
      page: 1,
    };

    const res = await axios.get(`/products`, { params });
    const result = res.data.data;

    return { relatedProducts: result.slice(0, 4) };
  })();

  return {
    props: {
      product,
      relatedProducts,
    },
  };
};

type Props = {
  product: models.Product & {
    category: models.ProductCategory;
    images: models.ProductImage[];
  };
  relatedProducts: (models.Product & {
    category: models.ProductCategory;
  })[];
};

const ProductDetailPage: NextPage<Props> = ({ product, relatedProducts }) => {
  const router = useRouter();
  const refLayout = useRef<LayoutExposed>(null);
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

    refLayout.current?.runCartItemCountAnimation(() => addToCart(item));
  };

  return (
    <Layout ref={refLayout}>
      <Head>
        <title>{product.name} | Marrkt</title>
      </Head>

      <main className="pb-24">
        <div className="flex flex-col mb-24 md:flex-row" data-scroll-section>
          {/* Left side */}
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Image
              className="w-full h-full object-cover"
              src={thumbnailURL || ""}
              alt={`${product.name} Thumbnail`}
              width={480}
              height={480}
            />
            {product.images.map((image, index) => {
              const { publicURL: imageURL } = supabase.storage
                .from("general")
                .getPublicUrl(`products/${product.thumbnail}`);

              return (
                <Image
                  key={image.id}
                  className="w-full h-full object-cover"
                  src={imageURL || ""}
                  alt={`${product.name} ${index + 1}`}
                  width={480}
                  height={480}
                />
              );
            })}
          </div>

          {/* Right side */}
          <div className="w-full px-6 pt-16 md:w-1/3 md:pt-32 md:px-12">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-md mb-8">{numberToCurrency(product.price)}</p>
            <p className="text-xs leading-5 mb-8">{product.description}</p>
            <Button label="Add to cart" onClick={add} />
          </div>
        </div>
        <div className="px-6 md:px-8" data-scroll-section>
          <h2 className="mb-5 text-black text-lg font-medium md:mb-10 md:text-2xl">
            You might also like
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-y-6 md:grid-cols-4 md:gap-y-8">
            {relatedProducts.map((product) => {
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
        </div>
      </main>
    </Layout>
  );
};

export default ProductDetailPage;
