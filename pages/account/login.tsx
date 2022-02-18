import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Menu from "../../components/Menu";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { supabase } from "../../helpers/supabase";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: NextPage = () => {
  const router = useRouter();

  const user = supabase.auth.user();

  useEffect(() => {
    if (user) {
      router.replace("/account/profile");
    }
  }, []);

  if (user) return null;

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="min-h-screen flex flex-col items-center">
        <div className="w-96 pt-28 pb-24">
          <h1 className="text-md font-medium text-black mb-16">Login</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);

                const { email, password } = values;

                const { error } = await supabase.auth.signIn({
                  email,
                  password,
                });

                if (error) throw error;

                router.push("/account/profile");
              } catch (error) {
                console.log(error);
                toast(error?.message || "Failed to login into your account.");
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
                  <Link href="/account/register">
                    <a>
                      <p className="text-xs underline">
                        Don&lsquo;t have an account ?
                      </p>
                    </a>
                  </Link>
                  <Button
                    type="submit"
                    label="Login"
                    isLoading={isSubmitting}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
