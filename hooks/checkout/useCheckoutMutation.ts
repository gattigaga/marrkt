import axios from "axios";
import { useMutation } from "react-query";

type Response = any;

type Body = {
  invoice_code: string;
  shipping: {
    person_name: string;
    address_1?: string;
    address_2?: string;
    admin_area_1?: string;
    admin_area_2?: string;
    postal_code?: string;
    country_code: string;
  };
  items: {
    product_id: number;
    quantity: number;
  }[];
};

export const checkout = async (body: Body): Promise<Response> => {
  const res = await axios.post(`/api/checkout`, body);
  const data = res.data.data;

  return data;
};

const useCheckoutMutation = () => useMutation(checkout);

export default useCheckoutMutation;
