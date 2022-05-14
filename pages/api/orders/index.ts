import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../helpers/supabase";
import { CartItem, Order, Product } from "../../../types/models";

type Item = Order & {
  items: (CartItem & { product: Product })[];
};

type Content = {
  data?: Item[] | null;
  message?: string;
  metadata?: {
    page: number;
    totalPages: number;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Content>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const token = req.cookies.access_token;

    const { user, error } = await supabase.auth.api.getUser(token);

    if (error || !user) {
      throw error;
    }

    const { page = "1" } = req.query as {
      [key: string]: string;
    };

    const totalItemsPerPage = 5;

    const { data: orders, error: ordersError } = await (() => {
      const query = supabase
        .from<Item>("orders")
        .select("*, items:cart_items(*, product:products(*))")
        .order("created_at", { ascending: false })
        .eq("user_id", user.id);

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
        .from<Item>("orders")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

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
  } catch (error: any) {
    res.status(error.status).json({ message: error.message });
  }
};

export default handler;
