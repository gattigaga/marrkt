import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../helpers/supabase";

type Content = {
  data?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Content>) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const token = req.cookies.access_token;

    const { user, error } = await supabase.auth.api.getUser(token);

    if (error || !user) {
      throw error;
    }

    const body = req.body as {
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

    const { data: products, error: productsError } = await (() => {
      const productIds = body.items.map((item) => item.product_id);
      const query = supabase.from("products").select("*").in("id", productIds);

      return query;
    })();

    if (productsError) {
      throw productsError;
    }

    const { data: shipping, error: shippingError } = await supabase
      .from("shipping_items")
      .insert([
        {
          person_name: body.shipping.person_name,
          address_1: body.shipping.address_1,
          address_2: body.shipping.address_2,
          admin_area_1: body.shipping.admin_area_1,
          admin_area_2: body.shipping.admin_area_2,
          postal_code: body.shipping.postal_code,
          country_code: body.shipping.country_code,
        },
      ])
      .limit(1)
      .single();

    if (shippingError) {
      throw shippingError;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          shipping_item_id: shipping.id,
          invoice_code: body.invoice_code,
          items_count: body.items.length,
          total: body.items.reduce((acc, item) => {
            const product = products?.find(
              (product) => product.id === item.product_id
            );

            return acc + Number(product?.price) * item.quantity;
          }, 0),
        },
      ])
      .limit(1)
      .single();

    if (orderError) {
      throw orderError;
    }

    const { error: cartItemsError } = await (() => {
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

    if (cartItemsError) {
      throw cartItemsError;
    }

    const { data: result, error: resultError } = await supabase
      .from("orders")
      .select(
        "*, items:cart_items(*, product:products(*)), shipping:shipping_items(*)"
      )
      .eq("id", order.id)
      .limit(1)
      .single();

    if (resultError) {
      throw resultError;
    }

    res.status(200).json({
      data: result,
      message: "Checkout successful.",
    });
  } catch (error: any) {
    res.status(error.status).json({ message: error.message });
  }
};

export default handler;
