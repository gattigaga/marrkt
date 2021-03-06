import type { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../../helpers/supabase";

type Content = {
  data?: any;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Content>) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body as {
        [key: string]: string;
      };

    if (password !== confirm_password) {
      res
        .status(400)
        .json({ message: "Password and Confirm Password is mismatch." });
      return;
    }

    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: {
          first_name,
          last_name,
        },
      }
    );

    if (error) {
      throw error;
    }

    res.status(200).json({
      data: user,
      message: "User successfully signed up.",
    });
  } catch (error: any) {
    res.status(error.status).json({ message: error.message });
  }
};

export default handler;
