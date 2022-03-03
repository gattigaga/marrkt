import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "../components/Button";
import Menu from "../components/Menu";
import ShopValue from "../components/ShopValue";

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
        <div className="pt-24 pb-48 px-8">
          <Image
            className="object-cover"
            src="/images/fashion.jpg"
            alt="Person"
            width={1366}
            height={480}
          />
          <p className="font-bold text-8xl text-black tracking-tighter">
            #BEFASHIONABLE
          </p>
          <p className="text-2xl font-medium mb-48">EMBRACE YOUR APPEARANCE</p>
          <div className="w-2/3 mx-auto mb-48">
            <p className="text-center text-2xl">
              We only sell best quality of fashion clothes and has modern styles
              &mdash; make you confident when you meet up with your friends
              &mdash; and make you looks standout.
            </p>
          </div>

          {/* Shop value list */}
          <div className="mb-48">
            <ShopValue
              index={0}
              title="WELL DESIGNED"
              description="All clothes are designed by experienced fashion designer. So this means the clothes makes you looks fashionable and standout in your meet up."
              image="/images/clothes.jpg"
            />
            <div className="h-32" />
            <ShopValue
              index={1}
              title="HIGH QUALITY MATERIALS"
              description="Built with high quality materials. So it will have good durability, even in the extreme weather."
              image="/images/textile.jpg"
              align="right"
            />
            <div className="h-32" />
            <ShopValue
              index={2}
              title="AFFORDABLE PRICE"
              description="Even if the clothes built with high quality materials and designed by experienced fashion designer, the price is still affordable."
              image="/images/fashion.jpg"
            />
          </div>

          <p className="text-center font-bold text-9xl tracking-tighter leading-[0.8] mb-16">
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
