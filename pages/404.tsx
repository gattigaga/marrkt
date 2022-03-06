import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Button from "../components/Button";
import Layout from "../components/Layout";

type Props = {};

const NotFoundPage: NextPage<Props> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      const luxy = require("luxy.js");

      luxy.init();
    }
  }, []);

  return (
    <div id="luxy">
      <Head>
        <title>404 | Marrkt</title>
      </Head>

      <Layout>
        <main className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="font-bold text-black text-8xl mb-4">404</h1>
          <p className="text-center text-black">
            There&lsquo;s no content found here.
          </p>
        </main>
      </Layout>
    </div>
  );
};

export default NotFoundPage;
