import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "../components/Button";
import Menu from "../components/Menu";
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

      <Menu />
      <main className="min-h-screen">
        <div className="pt-24 pb-48 px-6 md:px-8">
          <Image className="object-cover" src={imgFashion1} alt="Person" />
          <p className="font-bold text-3xl text-black tracking-tighter md:text-8xl">
            #BEFASHIONABLE
          </p>
          <p className="text-md font-medium mb-24 md:mb-48 md:text-2xl">
            EMBRACE YOUR APPEARANCE
          </p>
          <div className="mx-auto mb-24 md:w-2/3 md:mb-48">
            <p className="text-center text-md md:text-2xl">
              We only sell best quality of fashion clothes and has modern styles
              &mdash; make you confident when you meet up with your friends
              &mdash; and make you looks standout.
            </p>
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

          <p className="text-center font-bold text-5xl tracking-tighter mb-8 md:mb-16 md:text-9xl">
            WHAT ARE YOU WAITING FOR?
          </p>
          <div className="flex justify-center">
            <Button label="Shop now" onClick={() => router.push("/products")} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
