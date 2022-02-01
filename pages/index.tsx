import type { NextPage } from "next";
import Head from "next/head";
import Menu from "../components/Menu";

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="px-4 pt-28 pb-24 md:px-8"></main>
    </div>
  );
};

export default HomePage;
