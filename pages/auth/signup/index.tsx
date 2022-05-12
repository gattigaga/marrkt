import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useSignUpMutation from "../../../hooks/auth/use-sign-up-mutation";

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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm Password is mismatch")
    .required("Confirm Password is required"),
});

type Props = {};

const SignUpPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();

  return (
    <Layout>
      <Head>
        <title>Sign Up | Marrkt</title>
      </Head>

      <main className="min-h-screen flex flex-col items-center">
        <div
          className="w-full pt-28 pb-24 px-6 md:px-0 md:w-96"
          data-scroll-section
        >
          <h1 className="text-md font-medium text-black mb-16">Sign Up</h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);

                const {
                  firstName,
                  lastName,
                  email,
                  password,
                  confirmPassword,
                } = values;

                await signUpMutation.mutateAsync({
                  first_name: firstName,
                  last_name: lastName,
                  email,
                  password,
                  confirm_password: confirmPassword,
                });

                sessionStorage.setItem("signupEmail", email);

                await router.push("/auth/signup/email-sent");
              } catch (error) {
                console.error(error);
                toast.error("Failed to sign up.");
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
                <div className="mb-8">
                  <Input
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirm Password*"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    disabled={isSubmitting}
                    hasError={
                      !!(errors.confirmPassword && touched.confirmPassword)
                    }
                    errorText={errors.confirmPassword}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Link href="/auth/signin">
                    <a>
                      <p className="text-xs underline">
                        Already have an account ?
                      </p>
                    </a>
                  </Link>
                  <Button
                    type="submit"
                    label="Sign Up"
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

export default SignUpPage;
