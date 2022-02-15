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
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { data: categories } = await supabase
    .from("product_categories")
    .select("*");

  res.status(200).json({ data: categories });
};

export default handler;
