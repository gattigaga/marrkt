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

type Order = {
  user_id: string;
  invoice_code: string;
  items_count: number;
  total: number;
  created_at: string;
  cart_items: CartItem[];
};

type Data = {
  data?: Order[] | null;
  message?: string;
  metadata?: {
    page: number;
    totalPages: number;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { user_id, page = "1" } = req.query as {
      [key: string]: string;
    };

    const totalItemsPerPage = 5;

    const { data: orders, error: ordersError } = await (() => {
      const query = supabase
        .from("orders")
        .select("*, cart_items(*, product:products(*))")
        .order("created_at", { ascending: false })
        .eq("user_id", user_id);

      const min = totalItemsPerPage * (Number(page) - 1);
      const max = totalItemsPerPage * Number(page) - 1;

      query.range(min, max);

      return query;
    })();

    if (ordersError) {
      throw ordersError;
    }

    const { data: totalPages, error: totalPagesError } = await (async () => {
      const query = supabase
        .from("orders")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user_id);

      const { count, error } = await query;

      return {
        data: Math.ceil(Number(count) / totalItemsPerPage) || 1,
        error,
      };
    })();

    if (totalPagesError) {
      throw totalPagesError;
    }

    res.status(200).json({
      data: orders || [],
      metadata: {
        page: Number(page),
        totalPages,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
