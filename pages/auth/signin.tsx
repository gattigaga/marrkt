import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useSignInMutation from "../../hooks/auth/use-sign-in-mutation";
import { addDays } from "date-fns";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type Props = {};

const SignInPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const signInMutation = useSignInMutation();

  return (
    <Layout>
      <Head>
        <title>Sign In | Marrkt</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center">
        <div className="w-full pt-28 pb-24 px-6 md:px-0 md:w-96">
          <h1 className="text-md font-medium text-black mb-16">Sign In</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);

                const response = await signInMutation.mutateAsync(values);
                const accessToken = response.session.access_token;

                Cookies.set("access_token", accessToken, {
                  expires: addDays(new Date(), 7),
                  path: "/",
                });

                router.push("/account/profile");
              } catch (error: any) {
                console.error(error);
                toast(error.message || "Failed to sign in into your account.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Input
                    name="email"
                    id="email"
                    label="Email Address*"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    disabled={isSubmitting}
                    hasError={!!(errors.email && touched.email)}
                    errorText={errors.email}
                  />
                </div>
                <div className="mb-8">
                  <Input
                    name="password"
                    id="password"
                    label="Password*"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    disabled={isSubmitting}
                    hasError={!!(errors.password && touched.password)}
                    errorText={errors.password}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/auth/signup">
                    <a>
                      <p className="text-xs underline">
                        Don&lsquo;t have an account ?
                      </p>
                    </a>
                  </Link>
                  <Button
                    type="submit"
                    label="Sign In"
                    isLoading={isSubmitting}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </Layout>
  );
};

export default SignInPage;
