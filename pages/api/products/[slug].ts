import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../helpers/supabase";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Image = {
  id: number;
  product_id: number;
  image: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  product_category_id: number;
  thumbnail: string;
  category: Category;
  images: Image[];
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

  try {
    const { slug } = req.query as {
      [key: string]: string;
    };

    const { data: product, error } = await (() => {
      const query = supabase
        .from("products")
        .select("*, category:product_categories(*), images:product_images(*)")
        .eq("slug", slug)
        .limit(1)
        .single();

      return query;
    })();

    if (error) {
      throw error;
    }

    res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
