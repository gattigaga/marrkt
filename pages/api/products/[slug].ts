import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../helpers/supabase";
import { Product, ProductCategory, ProductImage } from "../../../types/models";

type Item = Product & {
  category: ProductCategory;
  images: ProductImage[];
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
    const { slug } = req.query as {
      [key: string]: string;
    };

    const { data: product, error } = await supabase
      .from<Item>("products")
      .select("*, category:product_categories(*), images:product_images(*)")
      .eq("slug", slug)
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({ data: product });
  } catch (error: any) {
    res.status(error.status).json({ message: error.message });
  }
};

export default handler;
