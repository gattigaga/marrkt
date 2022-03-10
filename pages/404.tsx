import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../components/Layout";

type Props = {};

const NotFoundPage: NextPage<Props> = ({}) => {
  return (
    <Layout>
      <Head>
        <title>404 | Marrkt</title>
      </Head>

      <main className="min-h-screen">
        <div
          className="w-full h-screen flex flex-col items-center justify-center"
          data-scroll-section
        >
          <h1 className="font-bold text-black text-8xl mb-4">404</h1>
          <p className="text-center text-black">
            There&lsquo;s no content found here.
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default NotFoundPage;
