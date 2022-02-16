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

type Data = {
  data?: Product | null;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const { slug } = req.query as {
    [key: string]: string;
  };

  const { data: product } = await (() => {
    const query = supabase
      .from("products")
      .select("*, product_categories(*), product_images(*)")
      .eq("slug", slug)
      .limit(1)
      .single();

    return query;
  })();

  res.status(200).json({ data: product });
};

export default handler;
