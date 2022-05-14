import React from "react";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Formik } from "formik";

import CheckBox from "./CheckBox";
import useProductCategoriesQuery from "../hooks/product-categories/useProductCategoriesQuery";

type Props = {};

const Filter: React.FC<Props> = () => {
  const router = useRouter();
  const { data: categories } = useProductCategoriesQuery();

  const query = router.query as { [key: string]: string };

  return (
    <Formik
      initialValues={{
        keyword: query?.keyword || "",
        categories: query?.categories ? query?.categories?.split(",") : [],
        price: {
          min: query?.min_price || "",
          max: query?.max_price || "",
        },
      }}
      onSubmit={(values) => {
        const params = {
          keyword: values.keyword,
          categories: values.categories.join(","),
          min_price: values.price.min,
          max_price: values.price.max,
        };

        const stringifiedParams = queryString.stringify(params);

        router.push(`/products?${stringifiedParams}`);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
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
                placeholder="What do you want to find ?"
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
            <div className="mb-10">
              <p className="text-xs text-black font-medium mb-4">Categories</p>
              {categories?.map((category, index) => {
                const isLast = index === categories.length - 1;
                const isChecked = values.categories.includes(category.slug);

                return (
                  <div key={category.slug} className={isLast ? "" : "mb-3"}>
                    <CheckBox
                      id={`category-${category.slug}`}
                      label={category.name}
                      name={category.slug}
                      value={category.slug}
                      onChange={(event) => {
                        const value = (() => {
                          const isChecked = event.target.checked;
                          const value = event.target.value;

                          if (isChecked) {
                            return [...values.categories, event.target.value];
                          }

                          return values.categories.filter(
                            (category) => category !== value
                          );
                        })();

                        setFieldValue("categories", value);
                        handleSubmit();
                      }}
                      isChecked={isChecked}
                    />
                  </div>
                );
              })}
              {!categories?.length && (
                <p className="text-xs text-black">
                  There&lsquo;s no categories found.
                </p>
              )}
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
