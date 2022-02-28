import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../helpers/supabase";
import { Product, ProductCategory, ProductImage } from "../../../types/models";

type Item = Product & {
  category: ProductCategory;
  images: ProductImage[];
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
    const { slug } = req.query as {
      [key: string]: string;
    };

    const { data: product, error } = await (() => {
      const query = supabase
        .from<Item>("products")
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
