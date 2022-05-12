import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";

type Props = {};

const EmailSentPage: NextPage<Props> = ({}) => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newEmail = sessionStorage.getItem("signupEmail") || "";

      if (!newEmail) {
        router.replace("/auth/signup");
        return;
      }

      setEmail(newEmail);
      return;
    }
  }, []);

  if (!email) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Verify your email | Marrkt</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center">
        <div
          className="w-full pt-28 pb-24 px-6 md:px-0 md:w-96"
          data-scroll-section
        >
          <h1 className="text-md font-medium text-black mb-16">
            Check your inbox to log in
          </h1>
          <p className="text-xs text-black leading-normal mb-2">
            To complete setup and log in, click the verification link in the
            email we&lsquo;ve sent to
          </p>
          <p className="text-sm font-semibold text-black leading-normal mb-12">
            {email}
          </p>
          <Link href="/auth/signin">
            <a>
              <p className="text-xs underline">Return to sign in</p>
            </a>
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default EmailSentPage;
