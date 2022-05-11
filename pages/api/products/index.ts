import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../helpers/supabase";
import { Product, ProductCategory } from "../../../types/models";

type Item = Product & {
  category: ProductCategory;
};

type Content = {
  data?: Item[] | null;
  message?: string;
  metadata?: {
    page: number;
    totalPages: number;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Content>) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
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

    const { data: products, error: productsError } = await (() => {
      const query = supabase
        .from<Item>("products")
        .select("*, category:product_categories!inner(*)")
        .order("name");

      if (keyword) {
        query.ilike("name", `%${keyword}%`);
      }

      if (categories) {
        // @ts-ignore
        query.in("category.slug", categories.split(","));
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

    if (productsError) {
      throw productsError;
    }

    const { data: totalPages, error: totalPagesError } = await (async () => {
      const query = supabase
        .from<Item>("products")
        .select("*, category:product_categories!inner(*)", {
          count: "exact",
          head: true,
        });

      if (keyword) {
        query.ilike("name", `%${keyword}%`);
      }

      if (categories) {
        // @ts-ignore
        query.in("category.slug", categories.split(","));
      }

      if (min_price) {
        query.gte("price", min_price);
      }

      if (max_price) {
        query.lte("price", max_price);
      }

      const { count, error } = await query;

      return {
        data: Math.ceil(Number(count) / totalItemsPerPage) || 1,
        error,
      };
    })();

    if (totalPagesError) {
      throw totalPagesError;
    }

    res.status(200).json({
      data: products,
      metadata: {
        page: Number(page),
        totalPages,
      },
    });
  } catch (error: any) {
    res.status(error.status).json({ message: error.message });
  }
};

export default handler;
