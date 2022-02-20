import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../helpers/supabase";

type Shipping = {
  id: number;
  order_id: string;
  person_name: string;
  address_1: string;
  address_2: string;
  admin_area_1: string;
  admin_area_2: string;
  postal_code: string;
  country_code: string;
};

type CartItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  total: number;
};

type Order = {
  user_id: string;
  invoice_code: string;
  items_count: number;
  total: number;
  created_at: string;
  shipping_items: Shipping;
  cart_items: CartItem;
};

type Data = {
  data?: Order | null;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const body = JSON.parse(req.body) as {
    user_id: string;
    invoice_code: string;
    shipping: {
      person_name: string;
      address_1: string;
      address_2: string;
      admin_area_1: string;
      admin_area_2: string;
      postal_code: string;
      country_code: string;
    };
    items: {
      product_id: number;
      quantity: number;
    }[];
  };

  const { data: products } = await (() => {
    const productIds = body.items.map((item) => item.product_id);
    const query = supabase.from("products").select("*").in("id", productIds);

    return query;
  })();

  const { data: order } = await (() => {
    const query = supabase
      .from("orders")
      .insert({
        user_id: body.user_id,
        invoice_code: body.invoice_code,
        items_count: body.items.length,
        total: body.items.reduce((acc, item) => {
          const product = products?.find(
            (product) => product.id === item.product_id
          );

          return acc + Number(product?.price) * item.quantity;
        }, 0),
      })
      .limit(1)
      .single();

    return query;
  })();

  await (() => {
    const query = supabase
      .from("shipping_items")
      .insert({
        order_id: order.id,
        person_name: body.shipping.person_name,
        address_1: body.shipping.address_1,
        address_2: body.shipping.address_2,
        admin_area_1: body.shipping.admin_area_1,
        admin_area_2: body.shipping.admin_area_2,
        postal_code: body.shipping.postal_code,
        country_code: body.shipping.country_code,
      })
      .limit(1)
      .single();

    return query;
  })();

  await (() => {
    const cartItems = body.items.map((item) => {
      const product = products?.find(
        (product) => product.id === item.product_id
      );

      return {
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        total: Number(product?.price) * item.quantity,
      };
    });

    const query = supabase.from("cart_items").insert(cartItems);

    return query;
  })();

  const { data: result } = await (() => {
    const query = supabase
      .from("orders")
      .select("*, cart_items(*, product(*)), shipping_items(*)")
      .eq("id", order.id)
      .limit(1)
      .single();

    return query;
  })();

  res.status(200).json({ data: result });
};

export default handler;
