import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../helpers/supabase";
import { CartItem, Order, Product, ShippingItem } from "../../../types/models";

type Item = Order & {
  items: CartItem & { product: Product }[];
  shipping: ShippingItem;
};

type Data = {
  data?: Item | null;
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
        .from<Item>("orders")
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
  } catch (error: any) {
    console.log(error);

    if ("code" in error) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export default handler;
