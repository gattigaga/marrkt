import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { gsap, Power2 } from "gsap";
import Cookies from "js-cookie";
import { addDays } from "date-fns";
import { useInView } from "react-intersection-observer";

import Button from "../components/Button";
import Layout from "../components/Layout";
import ShopValue, {
  Exposed as ShopValueExposed,
} from "../components/ShopValue";
import Product from "../components/Product";
import imgFashion from "../public/images/fashion.jpg";
import imgClothes from "../public/images/clothes.jpg";
import imgTextile from "../public/images/textile.jpg";
import * as models from "../types/models";
import supabase from "../helpers/supabase";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await (async () => {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, category:product_categories!inner(*)")
      .order("name")
      .range(0, 3);

    if (error) {
      throw error;
    }

    return products;
  })();

  return {
    props: {
      products,
    },
  };
};

type Props = {
  products: (models.Product & {
    category: models.ProductCategory;
  })[];
};

const HomePage: NextPage<Props> = ({ products }) => {
  const router = useRouter();
  const refVideo = useRef(null);
  const refVideoText = useRef(null);
  const refQuoteText = useRef(null);
  const refQuoteLine = useRef(null);
  const refShopValue1 = useRef<ShopValueExposed>(null);
  const refShopValue2 = useRef<ShopValueExposed>(null);
  const refShopValue3 = useRef<ShopValueExposed>(null);
  const refParallaxImage = useRef(null);
  const refHashtag = useRef(null);

  const [refVideoSection, isVideoSectionInView] = useInView({
    triggerOnce: true,
  });

  const [refQuoteSection, isQuoteSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.95,
  });

  const [refShopValue1Section, isShopValue1SectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [refShopValue2Section, isShopValue2SectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [refShopValue3Section, isShopValue3SectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [refParallaxSection, isParallaxSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Listen to recovery link to open reset password page
  // and listen to sign in link to sign in with password.
  useEffect(() => {
    const rawParams = router.asPath.replace("/#", "");
    const params = new URLSearchParams(rawParams);
    const accessToken = params.get("access_token");
    const type = params.get("type");

    if (accessToken) {
      Cookies.set("access_token", accessToken, {
        expires: addDays(new Date(), 7),
        path: "/",
      });

      if (type === "signup") {
        router.replace("/account/profile");
      }

      if (type === "recovery") {
        router.replace("/auth/reset-password");
      }
    }
  }, []);

  useEffect(() => {
    const runVideoAnimation = () => {
      gsap.fromTo(
        refVideo.current,
        {
          scale: 2,
        },
        {
          scale: 1,
          duration: 1.5,
          delay: 1,
          ease: Power2.easeOut,
        }
      );

      gsap.fromTo(
        refVideoText.current,
        {
          opacity: 0,
          scale: 1.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 1.3,
          ease: Power2.easeOut,
        }
      );
    };

    if (isVideoSectionInView) {
      runVideoAnimation();
    }
  }, [isVideoSectionInView]);

  useEffect(() => {
    const runQuoteAnimation = () => {
      gsap.fromTo(
        refQuoteText.current,
        {
          opacity: 0,
          y: 64,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: Power2.easeOut,
        }
      );

      gsap.fromTo(
        refQuoteLine.current,
        {
          width: 0,
        },
        {
          width: "6rem",
          duration: 1,
          delay: 0.5,
          ease: Power2.easeOut,
        }
      );
    };

    if (isQuoteSectionInView) {
      runQuoteAnimation();
    }
  }, [isQuoteSectionInView]);

  useEffect(() => {
    if (isShopValue1SectionInView) {
      refShopValue1.current?.runShowUpAnimation();
    }
  }, [isShopValue1SectionInView]);

  useEffect(() => {
    if (isShopValue2SectionInView) {
      refShopValue2.current?.runShowUpAnimation();
    }
  }, [isShopValue2SectionInView]);

  useEffect(() => {
    if (isShopValue3SectionInView) {
      refShopValue3.current?.runShowUpAnimation();
    }
  }, [isShopValue3SectionInView]);

  useEffect(() => {
    const runHashtagAnimation = () => {
      gsap.fromTo(
        refHashtag.current,
        {
          opacity: 0,
          y: 128,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: Power2.easeOut,
        }
      );
    };

    if (isParallaxSectionInView) {
      runHashtagAnimation();
    }
  }, [isParallaxSectionInView]);

  useEffect(() => {
    if (typeof window !== undefined && refParallaxImage.current) {
      const SimpleParallax = require("simple-parallax-js");

      new SimpleParallax(refParallaxImage.current, {
        scale: 1.3,
      });
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Marrkt | The World #1 Fashion Marketplace</title>
      </Head>

      <main className="min-h-screen pb-40">
        <div
          ref={refVideoSection}
          className="w-full h-screen relative overflow-hidden mb-24 sm:mb-48"
        >
          <video
            ref={refVideo}
            className="object-cover w-full h-full scale-[2]"
            autoPlay
            muted
            loop
          >
            <source src="/videos/jumbotron.mp4" type="video/mp4" />
          </video>
          <div
            ref={refVideoText}
            className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center p-4 opacity-0 md:p-8"
          >
            <div className="w-full flex flex-col items-center sm:w-3/4 lg:w-8/12 xl:w-1/2">
              <p className="font-bold text-5xl text-white tracking-tighter text-center mb-4 sm:text-7xl md:text-8xl">
                HANDSOME AND BRAVE
              </p>
              <p className="text-sm font-medium text-white text-center mb-8 sm:text-xl md:text-2xl">
                EMBRACE YOUR APPEARANCE
              </p>
              <Button
                label="Shop now"
                color="white"
                onClick={() => router.push("/products")}
              />
            </div>
          </div>
        </div>

        {/* Quote */}
        <div
          ref={refQuoteSection}
          className="flex flex-col items-center mx-auto mb-24 px-6 sm:w-2/3 sm:mb-48 lg:w-1/2"
        >
          <p
            ref={refQuoteText}
            className="text-center text-md mb-16 opacity-0 sm:text-lg md:mb-20 md:text-2xl"
          >
            We only sell best quality of fashion clothes and has modern styles
            &mdash; make you confident when you meet up with your friends
            &mdash; and make you looks standout.
          </p>
          <div ref={refQuoteLine} className="w-0 border-t border-black" />
        </div>

        {/* Shop value list */}
        <div className="mb-24 sm:mb-48">
          <div ref={refShopValue1Section}>
            <ShopValue
              ref={refShopValue1}
              index={0}
              title="WELL DESIGNED"
              description="All clothes are designed by experienced fashion designer. So this means the clothes makes you looks fashionable and standout in your meet up."
              image={imgClothes}
              eventName={"shopValueImage1"}
            />
          </div>
          <div className="h-20 md:h-32" />
          <div ref={refShopValue2Section}>
            <ShopValue
              ref={refShopValue2}
              index={1}
              title="HIGH QUALITY MATERIALS"
              description="Built with high quality materials. So it will have good durability, even in the extreme weather."
              image={imgTextile}
              align="right"
              eventName={"shopValueImage2"}
            />
          </div>
          <div className="h-20 md:h-32" />
          <div ref={refShopValue3Section}>
            <ShopValue
              ref={refShopValue3}
              index={2}
              title="AFFORDABLE PRICE"
              description="Even if the clothes built with high quality materials and designed by experienced fashion designer, the price is still affordable."
              image={imgFashion}
              eventName={"shopValueImage3"}
            />
          </div>
        </div>

        {/* Fixed image */}
        <div
          ref={refParallaxSection}
          className="mb-12 h-[80vh] border relative overflow-hidden"
        >
          <div ref={refParallaxImage} className="w-full h-full">
            <Image
              className="w-full h-full object-cover"
              src="/images/fashion-2.jpg"
              alt="Well-Fashioned Man"
              width={1366}
              height={768}
            />
          </div>
          <div className="w-full h-full absolute top-0 left-0 flex z-20">
            <p
              ref={refHashtag}
              className="m-auto font-bold text-4xl text-white opacity-0 sm:text-6xl md:text-7xl"
            >
              #BeFashionable
            </p>
          </div>
        </div>

        {/* Some products */}
        <div className="px-6 mb-24 md:px-8 md:mb-48">
          <h2 className="mb-5 text-black text-lg font-medium md:mb-10 md:text-2xl">
            Our Products
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-y-6 md:grid-cols-4 md:gap-y-8">
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
        </div>

        {/* Ask for shopping */}
        <div className="mx-auto px-6 sm:w-2/3">
          <p className="text-center font-bold text-5xl tracking-tighter mb-8 sm:text-6xl sm:mb-16 md:text-7xl lg:text-8xl xl:text-9xl xl:mb-20">
            WHAT ARE YOU WAITING FOR?
          </p>
          <div className="flex justify-center">
            <Button label="Shop now" onClick={() => router.push("/products")} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
