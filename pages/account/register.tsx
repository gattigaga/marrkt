import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";

import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { supabase } from "../../helpers/supabase";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name should have at least 3 characters")
    .max(20, "First name should not more than 20 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name should have at least 3 characters")
    .max(20, "Last name should not more than 20 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should have at least 8 characters")
    .max(50, "Password should not more than 50 characters")
    .required("Password is required"),
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return {
      redirect: {
        destination: "/account/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

type Props = {};

const RegisterPage: NextPage<Props> = ({}) => {
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
        <title>Register | Marrkt</title>
      </Head>

      <Layout>
        <main className="min-h-screen flex flex-col items-center">
          <div className="w-full pt-28 pb-24 px-6 md:px-0 md:w-96">
            <h1 className="text-md font-medium text-black mb-16">Register</h1>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true);

                  const { firstName, lastName, email, password } = values;

                  const { error } = await supabase.auth.signUp(
                    {
                      email,
                      password,
                    },
                    {
                      data: {
                        first_name: firstName,
                        last_name: lastName,
                      },
                    }
                  );

                  if (error) throw error;

                  toast("You are successfully registered.");
                  router.push("/account/login");
                } catch (error: any) {
                  console.log(error);
                  toast(error.message || "Failed to register your account.");
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
                      name="firstName"
                      id="firstName"
                      label="First Name*"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      disabled={isSubmitting}
                      hasError={!!(errors.firstName && touched.firstName)}
                      errorText={errors.firstName}
                    />
                  </div>
                  <div className="mb-6">
                    <Input
                      name="lastName"
                      id="lastName"
                      label="Last Name*"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      disabled={isSubmitting}
                      hasError={!!(errors.lastName && touched.lastName)}
                      errorText={errors.lastName}
                    />
                  </div>
                  <div className="mb-6">
                    <Input
                      name="email"
                      id="email"
                      label="Email Address*"
                      type="text"
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
                    <Link href="/account/login">
                      <a>
                        <p className="text-xs underline">
                          Already have an account ?
                        </p>
                      </a>
                    </Link>
                    <Button
                      type="submit"
                      label="Register"
                      isLoading={isSubmitting}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default RegisterPage;
