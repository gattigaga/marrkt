import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../helpers/supabase";

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
  data?: Product[] | null;
  message?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const { keyword, categories, min_price, max_price, page } = req.query as {
    [key: string]: string;
  };

  const query = supabase
    .from("products")
    .select("*, product_categories!inner(*)")
    .order("name");

  if (keyword) {
    query.ilike("name", `%${keyword}%`);
  }

  if (categories) {
    query.in("product_categories.slug", categories.split(","));
  }

  if (min_price) {
    query.gte("price", min_price);
  }

  if (max_price) {
    query.lte("price", max_price);
  }

  if (page) {
    const totalItemsPerPage = 12;

    query.range(Number(page) - 1, totalItemsPerPage * Number(page));
  }

  const { data: products } = await query;

  res.status(200).json({ data: products });
};

export default handler;
