import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../helpers/supabase";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  product_category_id: number;
  thumbnail: string;
};

type CartItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  total: number;
  product: Product;
};

type Shipping = {
  id: number;
  person_name: string;
  address_1: string;
  address_2: string;
  admin_area_1: string;
  admin_area_2: string;
  postal_code: string;
  country_code: string;
};

type Order = {
  id: number;
  user_id: string;
  shipping_item_id: number;
  invoice_code: string;
  items_count: number;
  total: number;
  created_at: string;
  items: CartItem[];
  shipping: Shipping;
};

type Data = {
  data?: Order | null;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { invoice } = req.query as {
      [key: string]: string;
    };

    const { data: order, error } = await (() => {
      const query = supabase
        .from("orders")
        .select(
          "*, items:cart_items(*, product:products(*)), shipping:shipping_items(*)"
        )
        .eq("invoice_code", invoice)
        .limit(1)
        .single();

      return query;
    })();

    if (error) {
      throw error;
    }

    res.status(200).json({ data: order });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
