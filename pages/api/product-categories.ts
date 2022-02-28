import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../helpers/supabase";
import { ProductCategory } from "../../types/models";

type Item = ProductCategory;

type Data = {
  data?: Item[] | null;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { data: categories, error } = await supabase
      .from<Item>("product_categories")
      .select("*");

    if (error) {
      throw error;
    }

    res.status(200).json({ data: categories });
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
