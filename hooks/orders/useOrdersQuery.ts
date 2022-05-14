import axios from "axios";
import { useQuery } from "react-query";

type Response = {
  data: any[];
  metadata: {
    page: number;
    totalPages: number;
  };
};

export const getOrders = async (page: number): Promise<Response> => {
  const res = await axios.get("/api/orders", {
    params: {
      page,
    },
  });

  const data = res.data;

  return data;
};

const useOrdersQuery = (page: number) => {
  return useQuery(["orders", { page }], () => getOrders(page));
};

export default useOrdersQuery;
