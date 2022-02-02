import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

import Menu from "../../components/Menu";
import Button from "../../components/Button";

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

const RegisterPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="min-h-screen flex flex-col items-center">
        <div className="w-2/3 pt-28 pb-24">
          <h1 className="text-md font-medium text-black mb-16">Register</h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
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
                <div className="flex mb-6">
                  <div className="mr-6 flex-1">
                    <label
                      className="text-xs text-black mb-2 block"
                      htmlFor="firstName"
                    >
                      First Name*
                    </label>
                    <input
                      className="border border-gray-200 px-4 py-3 text-xs w-full"
                      id="firstName"
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      disabled={isSubmitting}
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      className="text-xs text-black mb-2 block"
                      htmlFor="lastName"
                    >
                      Last Name*
                    </label>
                    <input
                      className="border border-gray-200 px-4 py-3 text-xs w-full"
                      id="lastName"
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      disabled={isSubmitting}
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex mb-8">
                  <div className="mr-6 flex-1">
                    <label
                      className="text-xs text-black mb-2 block"
                      htmlFor="email"
                    >
                      Email Address*
                    </label>
                    <input
                      className="border border-gray-200 px-4 py-3 text-xs w-full"
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      disabled={isSubmitting}
                    />
                    {errors.email && touched.email && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      className="text-xs text-black mb-2 block"
                      htmlFor="password"
                    >
                      Password*
                    </label>
                    <input
                      className="border border-gray-200 px-4 py-3 text-xs w-full"
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

export default RegisterPage;
