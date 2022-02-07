import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

import Menu from "../../components/Menu";
import Button from "../../components/Button";
import Input from "../../components/Input";

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
                  <div className="flex-1">
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
                </div>
                <div className="flex mb-8">
                  <div className="mr-6 flex-1">
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
                  <div className="flex-1">
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
    </div>
  );
};

export default RegisterPage;
