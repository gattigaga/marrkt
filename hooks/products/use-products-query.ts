import axios from "axios";
import { useQuery } from "react-query";

type Response = {
  data: any[];
  metadata: {
    page: number;
    totalPages: number;
  };
};

export const getProducts = async ({
  keyword,
  categories,
  min_price,
  max_price,
  page,
}: {
  [key: string]: string;
}): Promise<Response> => {
  const res = await axios.get("/api/products", {
    params: {
      keyword,
      categories,
      min_price,
      max_price,
      page,
    },
  });

  const data = res.data;

  return data;
};

const useProductsQuery = ({
  keyword,
  categories,
  min_price,
  max_price,
  page,
}: {
  [key: string]: string;
}) => {
  return useQuery(
    ["products", { keyword, categories, min_price, max_price, page }],
    () => {
      return getProducts({
        keyword,
        categories,
        min_price,
        max_price,
        page,
      });
    },
    {
      keepPreviousData: true,
    }
  );
};

export default useProductsQuery;
