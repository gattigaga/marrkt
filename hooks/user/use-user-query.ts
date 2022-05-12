import axios from "axios";
import { useQuery } from "react-query";

type Response = any;

const getMe = async (): Promise<Response> => {
  const res = await axios.get("/api/auth/me");
  const data = res.data.data;

  return {
    first_name: data.user_metadata.first_name,
    last_name: data.user_metadata.last_name,
    email: data.email,
    is_confirmed: !!data.email_confirmed_at,
  };
};

const useUserQuery = () => useQuery("me", getMe);

export default useUserQuery;
