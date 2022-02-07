import type { NextPage } from "next";
import Head from "next/head";
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
        <div className="flex-1 flex flex-col justify-center pl-24">
          <h1 className="text-8xl font-bold mb-2">marrkt.</h1>
          <p className="text-sm mb-10">
            Fashion that fit your style and up to date.
          </p>
          <Button label="Shop now" onClick={() => router.push("/products")} />
        </div>
        <img className="w-2/4 h-screen object-cover" src="/images/person.jpg" />
      </main>
    </div>
  );
};

export default HomePage;
