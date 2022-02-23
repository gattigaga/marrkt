import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../helpers/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
