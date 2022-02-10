import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import AccountMenu from "../../components/AccountMenu";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
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
});

const AccountPage: NextPage = () => {
  const items = useMemo(() => {
    return [...Array(5)].map((_, index) => {
      return {
        id: index + 1,
        thumbnail: "/images/person.jpg",
        code: "INV/230895",
        totalItems: 3,
        amount: 5000,
        date: "2021-05-21 08:30:00",
        url: "/",
      };
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="min-h-screen flex px-4 pt-28 pb-24 md:px-8">
        <div className="flex-1 mr-16">
          <AccountMenu />
        </div>
        <div className="w-3/4 ml-auto">
          <h1 className="text-md font-medium text-black mb-8">Profile</h1>
          <div>
            <Formik
              initialValues={{
                firstName: "Gattigaga",
                lastName: "Hayyuta",
                email: "gattigaga@gmail.com",
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
                  <div className="mb-8">
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
      </main>
    </div>
  );
};

export default AccountPage;