import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "../components/Button";
import Menu from "../components/Menu";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="min-h-screen flex">
        <div className="w-2/4 h-screen overflow-hidden">
          <Image
            className="object-cover"
            src="/images/person.jpg"
            alt="Person"
            width={1366 / 2}
            height={768}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-7xl text-center font-bold mb-2">marrkt.</h1>
          <p className="text-xs text-center mb-10">
            Fashion that fit your style and up to date.
          </p>
          <Button label="Shop now" onClick={() => router.push("/products")} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
