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
  data?: Product[] | null;
  message?: string;
  metadata?: {
    page: number;
    totalPages: number;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const {
    keyword,
    categories,
    min_price,
    max_price,
    page = "1",
  } = req.query as {
    [key: string]: string;
  };

  const totalItemsPerPage = 12;

  const { data: products } = await (() => {
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

    const min = totalItemsPerPage * (Number(page) - 1);
    const max = totalItemsPerPage * Number(page) - 1;

    query.range(min, max);

    return query;
  })();

  const totalPages = await (async () => {
    const query = supabase
      .from("products")
      .select("*", { count: "exact", head: true });

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

    const { count } = await query;

    return Math.ceil(Number(count) / totalItemsPerPage);
  })();

  res.status(200).json({
    data: products,
    metadata: {
      page: Number(page),
      totalPages,
    },
  });
};

export default handler;
