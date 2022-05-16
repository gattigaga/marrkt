import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type Response = any;

type Body = {
  first_name?: string;
  last_name?: string;
  password?: string;
  confirm_password?: string;
};

export const updateUser = async (body: Body): Promise<Response> => {
  const res = await axios.put(`/api/auth/me`, body);
  const data = res.data.data;

  return data;
};

const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onMutate: async (payload) => {
      const key = "me";

      await queryClient.cancelQueries(key);

      const previousUser = queryClient.getQueryData(key);

      queryClient.setQueryData(key, {
        ...previousUser,
        first_name: payload.first_name || previousUser.first_name,
        last_name: payload.last_name || previousUser.last_name,
      });

      return { previousUser };
    },
    onError: (error, payload, context) => {
      queryClient.setQueryData("me", context.previousUser);
    },
    onSettled: (data, error, payload) => {
      queryClient.invalidateQueries("me");
    },
  });
};

export default useUpdateUserMutation;
