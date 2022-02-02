import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

import Menu from "../../components/Menu";
import Button from "../../components/Button";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: NextPage = () => {
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
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 5000);
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
                  <label
                    className="text-xs text-black mb-2 block"
                    htmlFor="email"
                  >
                    Email Address*
                  </label>
                  <input
                    className="border border-gray-200 px-4 py-3 text-xs w-96"
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.email && (
                    <p className="text-xs text-red-600 mt-2">{errors.email}</p>
                  )}
                </div>
                <div className="mb-8">
                  <label
                    className="text-xs text-black mb-2 block"
                    htmlFor="password"
                  >
                    Password*
                  </label>
                  <input
                    className="border border-gray-200 px-4 py-3 text-xs w-96"
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    disabled={isSubmitting}
                  />
                  {errors.password && touched.password && (
                    <p className="text-xs text-red-600 mt-2">
                      {errors.password}
                    </p>
                  )}
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
