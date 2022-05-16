import type { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../../helpers/supabase";

type Content = {
  data?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Content>) => {
  if (!["GET", "PUT"].includes(req.method || "")) {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const token = req.cookies.access_token;

  if (req.method === "GET") {
    try {
      const { user, error } = await supabase.auth.api.getUser(token);

      if (error) {
        throw error;
      }

      res.status(200).json({
        data: user,
        message: "User data successfully found.",
      });
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { first_name, last_name, password, confirm_password } =
        req.body as {
          [key: string]: string;
        };

      if (password && password !== confirm_password) {
        res
          .status(400)
          .json({ message: "Password and Confirm Password is mismatch." });
        return;
      }

      const { user, error } = await supabase.auth.api.updateUser(token, {
        password,
        data: {
          first_name,
          last_name,
        },
      });

      if (error) {
        throw error;
      }

      res.status(200).json({
        data: user,
        message: "User data successfully updated.",
      });
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  }
};

export default handler;
