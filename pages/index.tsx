import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "../components/Button";
import Layout from "../components/Layout";
import ShopValue from "../components/ShopValue";
import imgFashion from "../public/images/fashion.jpg";
import imgFashion1 from "../public/images/fashion-1.jpg";
import imgClothes from "../public/images/clothes.jpg";
import imgTextile from "../public/images/textile.jpg";

type Props = {};

const HomePage: NextPage<Props> = ({}) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Layout>
        <main className="min-h-screen">
          <div className="pb-40">
            <div className="w-full h-screen relative mb-24 sm:mb-48">
              <Image
                className="object-cover"
                src={imgFashion1}
                alt="Person"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center p-4 md:p-8">
                <div className="w-full sm:w-3/4 lg:w-8/12 xl:w-1/2">
                  <p className="font-bold text-5xl text-white tracking-tighter text-center mb-4 sm:text-7xl md:text-8xl">
                    HANDSOME AND BRAVE
                  </p>
                  <p className="text-sm font-medium text-white text-center sm:text-xl md:text-2xl">
                    EMBRACE YOUR APPEARANCE
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="flex flex-col items-center mx-auto mb-24 px-6 sm:w-2/3 sm:mb-48 lg:w-1/2">
              <p className="text-center text-md mb-16 sm:text-lg md:mb-20 md:text-2xl">
                We only sell best quality of fashion clothes and has modern
                styles &mdash; make you confident when you meet up with your
                friends &mdash; and make you looks standout.
              </p>
              <div className="w-16 border-t border-black" />
            </div>

            {/* Shop value list */}
            <div className="mb-24 md:mb-48">
              <ShopValue
                index={0}
                title="WELL DESIGNED"
                description="All clothes are designed by experienced fashion designer. So this means the clothes makes you looks fashionable and standout in your meet up."
                image={imgClothes}
              />
              <div className="h-20 md:h-32" />
              <ShopValue
                index={1}
                title="HIGH QUALITY MATERIALS"
                description="Built with high quality materials. So it will have good durability, even in the extreme weather."
                image={imgTextile}
                align="right"
              />
              <div className="h-20 md:h-32" />
              <ShopValue
                index={2}
                title="AFFORDABLE PRICE"
                description="Even if the clothes built with high quality materials and designed by experienced fashion designer, the price is still affordable."
                image={imgFashion}
              />
            </div>

            {/* Ask for shopping */}
            <div className="mx-auto px-6 sm:w-2/3">
              <p className="text-center font-bold text-5xl tracking-tighter mb-8 sm:text-6xl sm:mb-16 md:text-7xl lg:text-8xl xl:text-9xl xl:mb-20">
                WHAT ARE YOU WAITING FOR?
              </p>
              <div className="flex justify-center">
                <Button
                  label="Shop now"
                  onClick={() => router.push("/products")}
                />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default HomePage;
