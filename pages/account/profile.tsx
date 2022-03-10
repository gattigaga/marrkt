import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Formik } from "formik";
import BeatLoader from "react-spinners/BeatLoader";
import * as Yup from "yup";
import { toast } from "react-toastify";

import AccountMenu from "../../components/AccountMenu";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
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
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

type Props = {};

const ProfilePage: NextPage<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  const user = supabase.auth.user();

  return (
    <Layout>
      <Head>
        <title>Profile | Marrkt</title>
      </Head>

      <main className="min-h-screen">
        {!isLoading && (
          <div
            className="flex flex-col-reverse px-4 pt-28 pb-24 md:flex-row md:px-8"
            data-scroll-section
          >
            <div className="flex-1 mt-16 md:mt-0 md:mr-16">
              <AccountMenu
                onLogoutStart={() => setIsLoading(true)}
                onLogoutEnd={() => setIsLoading(false)}
              />
            </div>
            <div className="md:w-3/4">
              <h1 className="text-md font-medium text-black mb-8">Profile</h1>
              <div>
                <Formik
                  initialValues={{
                    firstName: user?.user_metadata.first_name || "",
                    lastName: user?.user_metadata.last_name || "",
                    email: user?.email || "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      setSubmitting(true);

                      const { firstName, lastName, email } = values;

                      const { error } = await supabase.auth.update({
                        email,
                        data: {
                          first_name: firstName,
                          last_name: lastName,
                        },
                      });

                      if (error) throw error;

                      toast("Profile successfully update.");
                    } catch (error: any) {
                      console.log(error);
                      toast(error.message || "Failed to update profile.");
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
                      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                        <div>
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
                            errorText={errors.firstName as string}
                          />
                        </div>
                        <div>
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
                            errorText={errors.lastName as string}
                          />
                        </div>
                        <div className="md:col-span-2">
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
                      </div>

                      <div className="flex justify-between items-center">
                        <Button
                          type="submit"
                          label="Update"
                          isLoading={isSubmitting}
                        />
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div
            className="w-full mt-40 flex flex-col items-center"
            data-scroll-section
          >
            <BeatLoader color="black" size={24} loading />
            <p className="mt-6 text-md text-black text-center">
              Signing out...
            </p>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ProfilePage;
