import React from "react";
import { Formik } from "formik";

type FilterProps = {};

const Filter: React.FC<FilterProps> = ({}) => {
  return (
    <Formik
      initialValues={{
        keyword: "",
        price: {
          min: "",
          max: "",
        },
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 5000);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => {
        const minPrice = (() => {
          if (typeof values.price.min === "number") {
            return new Intl.NumberFormat().format(values.price.min);
          }

          return "";
        })();

        const maxPrice = (() => {
          if (typeof values.price.max === "number") {
            return new Intl.NumberFormat().format(values.price.max);
          }

          return "";
        })();

        return (
          <div>
            <div className="mb-10">
              <p className="text-xs text-black font-medium mb-4">Search</p>
              <input
                className="border border-gray-200 px-4 py-3 text-xs w-full focus:ring-black focus:border-black"
                type="text"
                name="keyword"
                placeholder="Search"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
                value={values.keyword}
              />
            </div>
            <div>
              <p className="text-xs text-black font-medium mb-4">Price Range</p>
              <input
                className="border border-gray-200 px-4 py-3 text-xs w-full mb-2 focus:ring-black focus:border-black"
                type="text"
                name="price.min"
                placeholder="Min Price ($)"
                onChange={(event) => {
                  const value = event.target.value.replace(/,/g, "");
                  const pattern = /^\d+$/g;

                  if (value === "" || pattern.test(value)) {
                    const validValue = value === "" ? "" : Number(value);

                    setFieldValue("price.min", validValue);
                  }
                }}
                onBlur={handleBlur}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
                value={minPrice}
              />
              <input
                className="border border-gray-200 px-4 py-3 text-xs w-full focus:ring-black focus:border-black"
                type="text"
                name="price.max"
                placeholder="Max Price ($)"
                onChange={(event) => {
                  const value = event.target.value.replace(/,/g, "");
                  const pattern = /^\d+$/g;

                  if (value === "" || pattern.test(value)) {
                    const validValue = value === "" ? "" : Number(value);

                    setFieldValue("price.max", validValue);
                  }
                }}
                onBlur={handleBlur}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
                value={maxPrice}
              />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Filter;
