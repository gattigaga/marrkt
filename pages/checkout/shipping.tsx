import type { NextPage } from "next";
import React, { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";

import Menu from "../../components/Menu";
import Button from "../../components/Button";
import Steps from "../../components/Steps";
import Input from "../../components/Input";
import CartItem from "../../components/CartItem";
import { numberToCurrency } from "../../helpers/formatter";
import { getSubtotal } from "../../helpers/math";
import CartInfo from "../../components/CartInfo";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  subdistrict: Yup.string().required("Subdistrict is required"),
  district: Yup.string().required("District is required"),
  province: Yup.string().required("Province is required"),
  phone: Yup.string().required("Phone is required"),
});

const CheckoutShippingPage: NextPage = () => {
  const items = useMemo(
    () => [
      {
        id: 1,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
      {
        id: 2,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
      {
        id: 3,
        name: "LT 01 Alloy",
        price: 2456,
        quantity: 2,
        image: "https://via.placeholder.com/128x128",
      },
    ],
    []
  );

  const subtotal = useMemo(() => getSubtotal(items), [items]);

  return (
    <div>
      <Head>
        <title>Marrkt | The World #1 Marketplace</title>
      </Head>

      <Menu />
      <main className="px-4 min-h-screen flex md:px-32">
        <div className="flex-1 pt-28 pb-24 mr-16">
          <Steps
            items={["Shipping", "Payment", "Information"]}
            activeIndex={0}
          />
          <h1 className="text-md font-medium text-black mt-4 mb-8">Shipping</h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              address: "",
              country: "",
              postalCode: "",
              subdistrict: "",
              district: "",
              province: "",
              phone: "",
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
                  <div className="flex-1 mr-6">
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
                <div className="mb-6">
                  <Input
                    name="address"
                    id="address"
                    label="Address*"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    disabled={isSubmitting}
                    hasError={!!(errors.address && touched.address)}
                    errorText={errors.address}
                  />
                </div>
                <div className="mb-6">
                  <Input
                    name="country"
                    id="country"
                    label="Country*"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    disabled={isSubmitting}
                    hasError={!!(errors.country && touched.country)}
                    errorText={errors.country}
                  />
                </div>
                <div className="flex mb-6">
                  <div className="flex-1 mr-6">
                    <Input
                      name="postalCode"
                      id="postalCode"
                      label="Postal Code*"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.postalCode}
                      disabled={isSubmitting}
                      hasError={!!(errors.postalCode && touched.postalCode)}
                      errorText={errors.postalCode}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      name="subdistrict"
                      id="subdistrict"
                      label="Subdistrict*"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subdistrict}
                      disabled={isSubmitting}
                      hasError={!!(errors.subdistrict && touched.subdistrict)}
                      errorText={errors.subdistrict}
                    />
                  </div>
                </div>
                <div className="flex mb-6">
                  <div className="flex-1 mr-6">
                    <Input
                      name="district"
                      id="district"
                      label="District*"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.district}
                      disabled={isSubmitting}
                      hasError={!!(errors.district && touched.district)}
                      errorText={errors.district}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      name="province"
                      id="province"
                      label="Province*"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.province}
                      disabled={isSubmitting}
                      hasError={!!(errors.province && touched.province)}
                      errorText={errors.province}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <Input
                    name="phone"
                    id="phone"
                    label="Phone*"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    disabled={isSubmitting}
                    hasError={!!(errors.phone && touched.phone)}
                    errorText={errors.phone}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Link href="#">
                    <a>
                      <span className="text-sm mr-1">&lt;</span>
                      <span className="text-xs underline">Return to cart</span>
                    </a>
                  </Link>
                  <Button
                    type="submit"
                    label="Continue"
                    isLoading={isSubmitting}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="w-1/3 pt-28 pb-24">
          <div>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <div key={item.id}>
                  <CartItem
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    image={item.image}
                  />
                  {!isLast && (
                    <div className="w-full border-t border-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
          <CartInfo label="Subtotal" value={numberToCurrency(subtotal)} />
          <div className="border-b border-gray-200" />
        </div>
      </main>
    </div>
  );
};

export default CheckoutShippingPage;
