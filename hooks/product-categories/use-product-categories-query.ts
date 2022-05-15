import axios from "axios";
import { useQuery } from "react-query";

type Response = any[];

export const getProductCategories = async (): Promise<Response> => {
  const res = await axios.get("/api/product-categories");
  const data = res.data.data;

  return data;
};

const useProductCategoriesQuery = () => {
  return useQuery("products-categories", getProductCategories, {
    initialData: [],
  });
};

export default useProductCategoriesQuery;
