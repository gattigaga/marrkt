import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../helpers/supabase";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Data = {
  data?: Category[] | null;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { data: categories, error } = await supabase
      .from("product_categories")
      .select("*");

    if (error) {
      throw error;
    }

    res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
