import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../helpers/supabase";
import { CartItem, Order, Product, ShippingItem } from "../../../types/models";

type Item = Order & {
  items: (CartItem & { product: Product })[];
  shipping: ShippingItem;
};

type Content = {
  data?: Item | null;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Content>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { invoice } = req.query as {
      [key: string]: string;
    };

    const { data: order, error } = await supabase
      .from<Item>("orders")
      .select(
        "*, items:cart_items(*, product:products(*)), shipping:shipping_items(*)"
      )
      .eq("invoice_code", invoice)
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({ data: order });
  } catch (error: any) {
    res.status(error.status).json({ message: error.message });
  }
};

export default handler;
